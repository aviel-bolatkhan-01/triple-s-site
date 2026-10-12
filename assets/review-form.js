/* Site forms (Web3Forms). Used on every page: any <form data-review-form>. */
(() => {
  const MAIL = 'hello@triples.agency';
  const PLACEHOLDER_KEY = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';
  const LABELS = { website: 'Website', email: 'Email', ad_spend: 'Monthly ad spend', agency: 'Agency', client_accounts: 'Client accounts', note: 'Note' };

  document.querySelectorAll('form[data-review-form]').forEach((form) => {
    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');
    const buttonLabel = button ? button.textContent : '';
    const keyField = form.querySelector('[name="access_key"]');
    const subjectText = form.dataset.mailSubject || 'Free video review request';

    const say = (message, tone) => {
      if (!status) return;
      status.innerHTML = message;
      status.className = tone ? `form-status form-status--${tone}` : 'form-status';
      status.hidden = false;
    };

    // Visible fields only (no access key, subject, honeypot). Optional ad spend is sent as "Not provided".
    const collect = () => {
      const data = Object.fromEntries(new FormData(form));
      if ('ad_spend' in data || form.querySelector('[name="ad_spend"]')) {
        data.ad_spend = (data.ad_spend || '').trim() || 'Not provided';
      }
      return data;
    };
    const summary = (data) => Object.keys(LABELS)
      .filter((k) => k in data && String(data[k]).trim())
      .map((k) => `${LABELS[k]}: ${String(data[k]).trim()}`)
      .join('\n');
    const mailHref = (data) => `mailto:${MAIL}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(summary(data))}`;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const missing = [...form.querySelectorAll('[required]')].find((el) => !String(el.value || '').trim());
      if (missing) {
        say('Please fill in the required fields.', 'err');
        missing.focus();
        return;
      }
      const email = form.querySelector('[name="email"]');
      if (email && !/^\S+@\S+\.\S+$/.test(email.value.trim())) {
        say('Add an email we can reply to.', 'err');
        email.focus();
        return;
      }

      const data = collect();
      const key = keyField ? keyField.value.trim() : '';
      if (!key || key === PLACEHOLDER_KEY) {
        window.location.href = mailHref(data);
        return;
      }

      if (button) {
        button.disabled = true;
        button.textContent = 'Sending…';
      }
      say('Sending…');

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || 'Submission failed');
        form.reset();
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'form_success', form_id: form.id });
        say(form.dataset.success || 'Got it. We’ll reply with a short Loom video within 24 hours.', 'ok');
      } catch (error) {
        say(`Couldn’t send that. Email <a href="${mailHref(data)}">${MAIL}</a> instead.`, 'err');
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = buttonLabel;
        }
      }
    });
  });
})();
