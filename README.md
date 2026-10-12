# Personal Portfolio Website

Responsive portfolio website built with plain HTML, CSS and JavaScript.
Created as Task 1 of the Auspify Technologies Full Stack Development internship.

**Live site:** https://mykytapilec.github.io/portfolio/

## Features

- Four pages: Home, About, Projects, Contact
- Responsive, mobile-first layout with a burger menu
- Dark and light theme with a toggle (saved in the browser)
- Project showcase with category filters
- Contact form with client-side validation and Formspree delivery
- Accessible markup: semantic tags, skip link, keyboard focus styles, reduced motion support

## Project structure

```
portfolio/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── css/style.css
├── js/main.js
└── assets/
    ├── favicon.svg
    └── images/
```

## Run locally

No build step is required. Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Configure the contact form

1. Create a free form at https://formspree.io.
2. In `contact.html`, replace `YOUR_FORM_ID` in the form `action` with your form ID.

## Customize the content

- Replace placeholder texts, project cards and skill levels with your own.
- Replace `your.email@example.com` and `YOUR_LINKEDIN` in all pages.
- Put your CV at `assets/resume.pdf` (the "Download CV" button on the About page points to it).

## Deployment (GitHub Pages)

1. Push the code to the `main` branch.
2. Open the repository on GitHub: Settings, Pages.
3. Source: Deploy from a branch, branch `main`, folder `/ (root)`.
4. After a minute the site is available at the live URL above.

## Tech stack

HTML5, CSS3 (custom properties, grid, flexbox), vanilla JavaScript (ES6+).
