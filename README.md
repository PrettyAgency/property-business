# Property Business - static site

Static HTML/CSS/JS copy of https://www.propertybusiness.com.au (scanned 19 Nov 2026).

## Step 1 - pull the images, fonts and downloads

The HTML, CSS and JS are all in this zip. The binary files (143 images, fonts and
PDF/Word downloads, about 56 MB) are fetched from the live site by a script:

- Windows: `powershell -ExecutionPolicy Bypass -File .\download-assets.ps1`
- Mac/Linux: `bash download-assets.sh`

Run it once from this folder while the live site is still up. It saves every file
into `assets/` (and `favicon.png`) at the exact paths the pages already use.

## Step 2 - host it

Links are root-relative (`/contact`, `/assets/...`), exactly like the live site, so
serve the folder from a web root rather than opening files with `file://`.
For a quick local preview run `npx serve .` (or `python -m http.server`) in this folder.

- IIS: `web.config` is included (index.html default document, 404 page, woff/woff2
  MIME types, 301s from the old `/getattachment/...` download URLs and `/home`).
- Apache: `.htaccess` equivalent included.
- Netlify / Cloudflare Pages: `_redirects` included.

## What's in here

| | Count |
|---|---|
| Home page (`index.html`) | 1 |
| Other pages (services, sub-pages, contact, privacy, downloads, thank-you, blog index) | 16 |
| Blog posts | 238 |
| Blog listing pages (`/sunshine-coast-property-blog/page/2-24/`) | 23 |
| Blog archive pages (`/calendar/yyyy/m`) | 6 |
| **Total HTML pages** | **284** (+ `404.html`) |

Every URL is kept: `/buyers-services` is `buyers-services/index.html`, and a post like
`/sunshine-coast-property-blog/Spotlight-on-Buderim-Property` is
`sunshine-coast-property-blog/Spotlight-on-Buderim-Property/index.html`.

```
index.html                    home
<page-url>/index.html         every other page and post
assets/css/                   normalize, foundation, fontawesome, slick, styles (theme) + site.css
assets/js/                    jquery 1.11.1, modernizr, foundation, placeholder, slick, custom, scripts, gtm
assets/fonts/                 FontAwesome, slick, Lato webfonts      (from download script)
assets/img/                   theme sprites/icons                    (from download script)
assets/images/                banners, page and blog images          (from download script)
assets/downloads/             the 20 media downloads (PDF/DOC/PNG)   (from download script)
sitemap.xml, robots.txt, 404.html, web.config, .htaccess, _redirects
```

## Changes made

- **Header search removed** (markup and its CSS rules).
- **CSS and JS taken out of the HTML.** Inline `<script>` blocks are now files (Google Tag Manager is in `assets/js/gtm.js`).
  The contact page `<style>` block and every `style=""` attribute are now classes in `assets/css/site.css`.
- **Third-party scripts kept.** jQuery, Foundation, Slick, Modernizr and the placeholder plugin are stored locally.
  Google Tag Manager (GTM-57Q3FXQ), Google Fonts and the JotForm contact form still load from their own services.
- **Brand, colours and layout** are the existing theme CSS, unchanged apart from the fixes below.
- **Meta tags.** The existing charset, viewport and titles are kept (no page had a meta description before). Missing titles were filled in, and each page now has
  a meta description, a canonical URL and `lang="en-AU"`.

### Errors fixed
- 8 pages had an empty `<title>` (the 7 service sub-pages and Thank You). The 24 blog listing pages and 6 archive pages
  all shared the title "Media"; they now carry page numbers and months.
- Footer "Market News" titles had no link, or on posts linked back to the current page with `?BlogAlias=`.
- Footer previews showed raw `&mdash;` / `&rsquo;` text (double-escaped).
- Blog listings printed the post's URL alias as visible text under every "Read More".
- 13 posts showed the placeholder date "January 01, 0001".
- Blog images used `~/` paths that resolve wrongly in the browser.
- 4 images that 404 on the live site were removed, and 2 dead `LiteratureRetrieve.aspx` links were unlinked.
- The contact email link went to info@ while displaying ann@ (now ann@).
- A hidden contact modal and a second reCAPTCHA loaded on every page but were never used. It posted to a
  Kentico server endpoint that won't exist on a static host, so it was removed.
- Foundation was started twice per page. A script error on pages without the quick-nav button was fixed.
- Slick font and loader paths were broken, and CSS pointed at 7 images that don't exist. Both fixed.
- Slider headline overflowed on tablet and mobile (a fixed 50px size); responsive sizes added.
- Missing or typo image alt text fixed. External `target=_blank` links got `rel="noopener"`.
- The old `sitemap.xml` listed 300 mostly dead URLs; it was rebuilt from the 284 live pages.

### Notes
- The contact page form is JotForm (an embedded script), so it keeps working on a static host.
- The live blog has 3 titles used twice: "Building Approvals" (3 URLs), "Maroochydore CBD" (3) and
  "Sunshine Coast Property Statistics" (2). All URLs are kept, as on the live site.
