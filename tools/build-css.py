#!/usr/bin/env python3
"""Regenerate assets/site.css from the inline <style> block in index.html.
The homepage keeps its CSS inline (fast first paint); the service pages link
the extracted copy. Run this after editing index.html's styles."""
import html
import os
import re
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
source = open('index.html', encoding='utf-8').read()
lines = source.split('\n')
s = next(i for i, l in enumerate(lines) if l.strip() == '<style>')
e = next(i for i, l in enumerate(lines) if l.strip() == '</style>')
font_match = re.search(r'<link\s+href="([^"]*fonts\.googleapis\.com/css2[^"]*)"\s+rel="stylesheet">', source)
if not font_match:
    raise RuntimeError('Google Fonts css2 stylesheet link not found in index.html')
font_url = html.unescape(font_match.group(1))
hdr = ("/* GENERATED from the <style> block in index.html. Do not hand-edit. */\n"
       "/* Regenerate: python3 tools/build-css.py */\n")
open('assets/site.css', 'w', encoding='utf-8').write(hdr + "@import url('%s');\n" % font_url + '\n'.join(lines[s+1:e]) + '\n')
print("assets/site.css regenerated from index.html (%d lines)" % (e - s - 1))
