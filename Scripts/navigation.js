// Navigation Links
const pages = [
    { href: 'home.html', text: 'Home' },
    { href: 'colors.html', text: 'Colors' },
    { href: 'shortcuts.html', text: 'Shortcuts' },
    { href: 'programs.html#Linux', text: 'Programming' },
    { href: 'css_grids.html', text: 'Grids' },
    { href: 'editor.html', text: 'Text Editor' },
    //{ href: 'progs.html', text: 'PROG' },
    //{ href: 'docs.html', text: 'Docs' },
    //{ href: 'playground.html', text: 'Playground' },
    { href: 'bootstrap.html', text: 'Bootstrap' },
    //{ href: 'todo.html', text: 'To Do' },
    { href: 'finddiff.html', text: 'FindDiff' },
    { href: 'make_data.html', text: 'Make Data' },
];

document.addEventListener('DOMContentLoaded', function() {
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