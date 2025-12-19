# File Layout Structure
```text
personal-website/
├── 📁 public/                    # Static assets
│   ├── 📁 icons/
│   │   └── 📄 pinned.png
│   └── 📁 images/               # Add if you have more images
│
├── 📁 src/
│   ├── 📁 pages/               # HTML files
│   │   ├── 📄 index.html       # Rename home.html to index.html
│   │   ├── 📄 bootstrap.html
│   │   ├── 📄 colors.html
│   │   ├── 📄 tools/           # Group tool pages
│   │   │   ├── 📄 diff-finder.html
│   │   │   ├── 📄 data-maker.html
│   │   │   └── 📄 editor.html
│   │   ├── 📄 notes/           # Group note pages
│   │   │   └── 📄 top-kp.html
│   │   └── 📄 playground.html
│   │
│   ├── 📁 scripts/             # JavaScript
│   │   ├── 📁 core/            # Core functionality
│   │   │   ├── 📄 navigation.js
│   │   │   └── 📄 shortcuts.js
│   │   ├── 📁 tools/           # Tool-specific scripts
│   │   │   ├── 📄 diff-finder.js
│   │   │   ├── 📄 data-maker.js
│   │   │   └── 📄 color.js
│   │   └── 📁 utils/           # Utility functions
│   │       └── 📄 helpers.js
│   │
│   ├── 📁 styles/              # CSS
│   │   ├── 📁 base/            # Base styles
│   │   │   ├── 📄 reset.css
│   │   │   ├── 📄 variables.css # CSS custom properties
│   │   │   └── 📄 typography.css
│   │   ├── 📁 components/      # Reusable components
│   │   │   ├── 📄 buttons.css
│   │   │   ├── 📄 navbar.css
│   │   │   ├── 📄 tooltip.css
│   │   │   └── 📄 cards.css
│   │   ├── 📁 layouts/         # Layout styles
│   │   │   ├── 📄 grid.css
│   │   │   └── 📄 flex.css
│   │   └── 📁 pages/           # Page-specific styles
│   │       ├── 📄 home.css
│   │       ├── 📄 tools.css
│   │       └── 📄 notes.css
│   │
│   └── 📁 api/                 # Backend/API functions
│       └── 📁 netlify-functions/
│           └── 📁 finddiff/
│               ├── 📄 finddiff.go
│               └── 📄 ... other go files
│
├── 📄 netlify.toml
├── 📄 .gitignore
├── 📄 package.json             # Add if using npm packages
├── 📄 README.md                # Documentation
└── 📄 robots.txt
```