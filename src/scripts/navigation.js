// Navigation Links
const pages = [
    { href: '../pages/index.html', text: 'Home' },
    { href: '../pages/colors.html', text: 'Colors' },
    { href: '../pages/newsletter.html', text: 'News' },
    { href: '../pages/Key_Links.html', text: 'Key Links' },
    { href: '../pages/shortcuts.html', text: 'Shortcuts' },
    { href: '../pages/programs.html#Linux', text: 'Programming' },
    { href: '../pages/css_grids.html', text: 'Grids' },
    { href: '../pages/editor.html', text: 'Text Editor' },
    
    //{ href: '../pages/progs.html', text: 'PROG' },
    //{ href: '../pages/docs.html', text: 'Docs' },
    //{ href: '../pages/playground.html', text: 'Playground' },
    //{ href: '../pages/bootstrap.html', text: 'Bootstrap' },
    //{ href: '../pages/todo.html', text: 'To Do' },
    { href: '../pages/diffFinder.html', text: 'Diff Finder' },
    { href: '../pages/DataMaker.html', text: 'Make Data' },
    { href: '../pages/finddiff.html', text: 'FindDiff' },
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
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log(`Current Page: "${currentPage}"`);
    AddNavBar(currentPage); 
});

function FillHead() {
    const hd = document.querySelector("head");
    hd.innerHTML = `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../public/icons/pinned.png" type="image/png">` + hd.innerHTML;
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