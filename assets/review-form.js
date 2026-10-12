/* Free video review form (Web3Forms). Used on every page: any <form data-review-form>. */
(() => {
  const MAIL = 'hello@triples.agency';
  const CAL = 'https://calendly.com/triples-agency/30min';
  const PLACEHOLDER_KEY = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';

  document.querySelectorAll('form[data-review-form]').forEach((form) => {
    const website = form.querySelector('[name="website"]');
    const email = form.querySelector('[name="email"]');
    const spend = form.querySelector('[name="ad_spend"]');
    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');
    const buttonLabel = button ? button.textContent : '';
    const keyField = form.querySelector('[name="access_key"]');

    const say = (message, tone) => {
      if (!status) return;
      status.innerHTML = message;
      status.className = tone ? `form-status form-status--${tone}` : 'form-status';
      status.hidden = false;
    };

    const mailtoFallback = (site, address, budget) => {
      const subject = encodeURIComponent(form.dataset.mailSubject || 'Free video review request');
      const lines = [
        site ? `Website: ${site}` : '',
        address ? `Email: ${address}` : '',
        budget ? `Monthly ad spend: ${budget}` : ''
      ].filter(Boolean);
      const body = lines.length ? `&body=${encodeURIComponent(lines.join('\n'))}` : '';
      window.location.href = `mailto:${MAIL}?subject=${subject}${body}`;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const site = website ? website.value.trim() : '';
      const address = email ? email.value.trim() : '';
      const budget = spend ? spend.value : '';

      if (!site) {
        say('Add your website so I know what to look at.', 'err');
        if (website) website.focus();
        return;
      }
      if (!address || !/^\S+@\S+\.\S+$/.test(address)) {
        say('Add an email I can send the video to.', 'err');
        if (email) email.focus();
        return;
      }
      if (spend && !budget) {
        say('Pick your monthly ad spend.', 'err');
        spend.focus();
        return;
      }

      const key = keyField ? keyField.value.trim() : '';
      if (!key || key === PLACEHOLDER_KEY) {
        mailtoFallback(site, address, budget);
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
          body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || 'Submission failed');
        form.reset();
        say(form.dataset.success || 'Got it. I’ll reply with a personal Loom video within 24 hours.', 'ok');
      } catch (error) {
        const subject = encodeURIComponent(form.dataset.mailSubject || 'Free video review request');
        const body = encodeURIComponent(`Website: ${site}\nEmail: ${address}${budget ? `\nMonthly ad spend: ${budget}` : ''}`);
        say(`Couldn’t send that. Email <a href="mailto:${MAIL}?subject=${subject}&body=${body}">${MAIL}</a> with your website and monthly ad spend instead, or <a href="${CAL}" target="_blank" rel="noreferrer">book a call</a>.`, 'err');
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = buttonLabel;
        }
      }
    });
  });
})();
