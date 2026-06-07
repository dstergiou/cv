# CV - Data-Driven Architecture

This CV is built with a clean separation between data and presentation layers.

## Structure

```
cv/
├── index.html     # HTML template (presentation layer)
├── data.json      # CV content (data layer)
├── app.js         # JavaScript that populates the template
└── README.md      # This file
```

## Editing Your CV

To update your CV content, **edit `data.json`** only. You never need to touch the HTML.

### What You Can Edit in data.json:

- **Personal info**: name, title, bio, location, email, LinkedIn
- **Experience**: companies, roles, achievements, scope, tags
- **Speaking**: conferences and talks
- **Education**: degrees and institutions
- **Certifications**: security, privacy, and framework certifications
- **Languages**: proficiency levels
- **Memberships**: professional organizations
- **Footer**: tagline and copyright

### JSON Structure Example:

```json
{
  "personal": {
    "name": "Your Name",
    "email": "your@email.com",
    ...
  },
  "experience": [
    {
      "company": "Company Name",
      "role": "Your Role",
      "achievements": ["Achievement 1", "Achievement 2"],
      ...
    }
  ],
  ...
}
```

## Local Development

Simply open `index.html` in your browser. The JavaScript will automatically load and populate the data from `data.json`.

**Note**: Some browsers may block local file loading due to CORS policies. If you see issues:
- Use a local web server (e.g., `python -m http.server 8000`)
- Or use VS Code Live Server extension

## Publishing to GitHub Pages

1. Commit all files to your repository
2. Go to Settings → Pages
3. Select your branch (usually `main`)
4. Your site will be available at `https://dstergiou.github.io/cv/`

## Design Modifications

To change the look and feel, edit the CSS in `index.html` or the JavaScript logic in `app.js`. The data in `data.json` remains untouched.

## Benefits of This Architecture

✅ **Easy to edit**: Edit CV content in JSON without touching HTML
✅ **No build step**: Works directly on GitHub Pages
✅ **Portable data**: JSON can be used by other tools/systems
✅ **Version control friendly**: Clean diffs when editing content
✅ **Future-proof**: Can add a CMS or admin panel later
