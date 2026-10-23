# Personal Portfolio Website

Responsive portfolio website of Mikita Pilets, built with plain HTML, CSS and JavaScript (no frameworks, no build step).
Created as Task 1 of the Auspify Technologies Full Stack Development internship.

**Live site:** https://mykytapilec.github.io/portfolio/

## Pages

| Page | File | Content |
| --- | --- | --- |
| Home | `index.html` | Introduction, areas of expertise, featured projects (`/portfolio/`) |
| About | `about/index.html` | Bio, skills, work experience, education, CV download (`/portfolio/about/`) |
| Projects | `projects/index.html` | Project cards: click opens the GitHub repository, optional Live demo button (`/portfolio/projects/`) |
| Contact | `contact/index.html` | Contact details and a working contact form (`/portfolio/contact/`) |

## Features

- Responsive, mobile-first layout with a burger menu on small screens
- Dark and light theme with a toggle (follows the system setting by default, choice is saved in the browser)
- Project showcase: the whole card is a link to the repository, a separate button opens the live demo where one exists
- Contact form with client-side validation, honeypot spam protection and delivery through [Formspree](https://formspree.io)
- Downloadable CV (`assets/Mikita_Pilets_CV.pdf`)
- Accessibility: semantic markup, skip link, visible keyboard focus, `aria-*` attributes for the menu and form, reduced motion support

## Tech stack

HTML5, CSS3 (custom properties, grid, flexbox), vanilla JavaScript (ES6+), Formspree for form delivery, GitHub Pages for hosting.

## Project structure

```
portfolio/
├── index.html
├── about/
│   └── index.html
├── projects/
│   └── index.html
├── contact/
│   └── index.html
├── about.html          # Redirects to /about/
├── projects.html       # Redirects to /projects/
├── contact.html        # Redirects to /contact/
├── css/
│   └── style.css        # design tokens, layout, components, responsive rules
├── js/
│   └── main.js          # theme, navigation, scroll reveal, contact form
└── assets/
    ├── favicon.svg
    ├── Mikita_Pilets_CV.pdf
    └── images/
        └── mikita.jpg
```

## Run locally

No build step is required. Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Contact form

The form posts to a Formspree endpoint set in the `action` attribute of the form in `contact/index.html`.
To use your own form, create one at https://formspree.io and replace the ID at the end of the URL:

```html
<form id="contact-form" action="https://formspree.io/f/<your-form-id>" method="POST" novalidate>
```

## Editing content

**Add a project.** Copy an existing card in `projects/index.html` and change the repository link, title, description and tags.
Remove the `Live demo` link if the project has no live version:

```html
<article class="card project">
  <div class="project__thumb" aria-hidden="true">&#128203;</div>
  <div class="project__body">
    <h3>
      <a class="project__title-link" href="https://github.com/<user>/<repo>" target="_blank" rel="noopener noreferrer">Project name<span class="sr-only"> (GitHub repository)</span></a>
    </h3>
    <p class="muted">Short description taken from the project README.</p>
    <ul class="tags"><li class="tag">React</li><li class="tag">TypeScript</li></ul>
    <div class="project__footer">
      <span class="project__cta" aria-hidden="true">View on GitHub &#8599;</span>
      <a class="btn btn--ghost btn--sm project__demo" href="https://example.com" target="_blank" rel="noopener noreferrer">Live demo</a>
    </div>
  </div>
</article>
```

**Update the CV.** Replace `assets/Mikita_Pilets_CV.pdf` with the new file under the same name.

**Change colors.** Edit the design tokens at the top of `css/style.css` (`:root` for the dark theme, `:root[data-theme="light"]` for the light theme).

## Deployment (GitHub Pages)

1. Open the repository on GitHub: Settings, Pages.
2. Source: Deploy from a branch, branch `main`, folder `/ (root)`.
3. After a minute the site is available at the live URL above.

All paths in the project are relative, so the site works from the `/portfolio/` subpath.

## Git workflow

- `main`: production, deployed to GitHub Pages
- `dev`: integration branch
- `feature/*`, `fix/*`: work branches created from `dev` and merged back into `dev` through pull requests
- Release: pull request from `dev` into `main`
- Commit messages follow the Conventional Commits format (for example `feat: add projects page`, `fix: correct card links`)
