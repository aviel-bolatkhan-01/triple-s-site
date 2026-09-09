#!/usr/bin/env python3
"""Regenerate assets/site.css from the inline <style> block in index.html.
The homepage keeps its CSS inline (fast first paint); the service pages link
the extracted copy. Run this after editing index.html's styles."""
import os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
lines = open('index.html', encoding='utf-8').read().split('\n')
s = next(i for i, l in enumerate(lines) if l.strip() == '<style>')
e = next(i for i, l in enumerate(lines) if l.strip() == '</style>')
hdr = ("/* GENERATED from the <style> block in index.html. Do not hand-edit. */\n"
       "/* Regenerate: python3 tools/build-css.py */\n")
open('assets/site.css', 'w', encoding='utf-8').write(hdr + '\n'.join(lines[s+1:e]) + '\n')
print("assets/site.css regenerated from index.html (%d lines)" % (e - s - 1))
