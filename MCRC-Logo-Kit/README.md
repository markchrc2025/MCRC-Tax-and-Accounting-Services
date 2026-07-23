# MCRC Tax & Accounting — Logo Kit

Everything you need to use the MCRC brand mark across print, web, and social.
See **MCRC Moodboard.pdf** — a 2-page landscape brand moodboard (the mark,
typeface, voice, palette, lockups, clear space, and full color system).

---

## What's inside

### /vector-svg — master files (infinitely scalable)
Use for print, signage, embroidery, and Canva.

| File | Use |
|------|-----|
| `MCRC-lockup-horizontal.svg` | Primary logo — mark + wordmark side by side |
| `MCRC-lockup-stacked.svg` | Stacked logo for square/narrow spaces |
| `MCRC-mark-color.svg` | Shield mark, full color |
| `MCRC-mark-light.svg` | Shield mark, cream — for dark backgrounds |
| `MCRC-mark-mono-navy.svg` | One-color navy |
| `MCRC-mark-mono-white.svg` | One-color white (reverse) |
| `MCRC-app-icon.svg` | Mark on rounded navy tile — apps & social avatars |

### /png — raster files (transparent background)
For anywhere SVG isn't accepted (email, Word, PowerPoint, quick sharing).

- **Lockups:** `MCRC-lockup-horizontal`, `-horizontal-white`, `-stacked`
- **Marks:** `MCRC-mark-color` (1024/512/256/128/64), `-light`, `-navy`, `-white` (1024/512/256)
- **App icon:** `MCRC-app-icon` (1024/512/192/180)

### /web — drop straight into your website
- `logo-horizontal.png` — header logo, light backgrounds
- `logo-horizontal-white.png` — header/footer logo, dark backgrounds
- `favicon-16/32/48/192.png` — browser tab icons
- `apple-touch-icon-180.png` — iOS home-screen icon

---

## Website setup

**Header logo**
```html
<img src="/web/logo-horizontal.png" alt="MCRC Tax & Accounting" height="48">
```

**Favicons** (inside `<head>`)
```html
<link rel="icon" type="image/png" sizes="32x32" href="/web/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/web/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/web/apple-touch-icon-180.png">
```

> The PNG lockups have the brand type baked in, so they look identical on
> every device. Prefer the SVG lockups only if the brand fonts (Archivo)
> are installed on your site.

---

## Brand colors

| | Hex |
|---|---|
| Navy | `#0E2A45` |
| Navy Deep | `#0A2138` |
| Ink | `#16212C` |
| Gold | `#C0902F` |
| Gold Light | `#E6C87C` |
| Cream | `#F6F2EA` |

**Typeface:** Archivo (headings & wordmark)

---

## Clear space & minimum size
Keep clear space around the logo equal to the height of the shield's chevrons.
Don't place the logo smaller than 24px tall (digital) or 0.5in (print).
Never recolor, stretch, rotate, or add effects to the mark.

© 2026 MCRC Tax and Accounting Services
