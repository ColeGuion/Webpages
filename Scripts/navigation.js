// Navigation Links
const pages = [
    { href: 'home.html', text: 'Home' },
    { href: 'Newsletter.html', text: 'News' },
    { href: 'Key_Links.html', text: 'Key Links' },
    { href: 'ShortCuts.html', text: 'Shortcuts' },
    { href: 'programs.html#Linux', text: 'Programming' },
    { href: 'css_grids.html', text: 'Grids' },
    { href: 'editor.html', text: 'Text Editor' },
    
    //{ href: 'progs.html', text: 'PROG' },
    //{ href: 'docs.html', text: 'Docs' },
    //{ href: 'playground.html', text: 'Playground' },
    //{ href: 'bootstrap.html', text: 'Bootstrap' },
    //{ href: 'todo.html', text: 'To Do' },
    { href: 'newsletter.html', text: 'News' },
    { href: 'diffFinder.html', text: 'Diff Finder' },
    { href: 'DataMaker.html', text: 'Make Data' },
    { href: 'finddiff.html', text: 'FindDiff' },
    { href: 'colors.html', text: 'Colors' },
];

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener("load", () => {
        const timing = performance.getEntriesByType("navigation")[0];
        console.log("Page Load Time:", timing.loadEventEnd.toFixed(2), "ms");
        console.log("DOM Load:", timing.domContentLoadedEventEnd.toFixed(2), "ms");
        console.log("First Paint:", performance.getEntriesByName("first-paint")[0]?.startTime);
    });

    // Fill the <head> element with base details and page icon
    FillHead();

    // Get the current page's filename
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    console.log(`Current Page: "${currentPage}"`);
    AddNavBar(currentPage); 
});

function FillHead() {
    const hd = document.querySelector("head");
    hd.innerHTML = `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="icons/pinned.png" type="image/png">` + hd.innerHTML;
}

function AddNavBar(currentPage) {
    //* Add other nav bar if programs.html
    const nav = document.createElement('nav');
    nav.className = 'nav-design-2';

    // Create links and add them to the nav element
    pages.forEach(page => {
        const a = document.createElement('a');
        a.href = page.href;
        a.textContent = page.text;
        a.rel = "prefetch";
        
        // Add 'active' class if the link matches the current page
        if (page.href === currentPage || (page.href.startsWith('programs.html') && currentPage.startsWith('programs.html'))) {
            a.classList.add('active');
        }
        
        nav.appendChild(a);
    });
    
    // Insert the nav at the beginning of the body
    document.body.insertBefore(nav, document.body.firstChild);
}