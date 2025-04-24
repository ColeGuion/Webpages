// Navigation Links
const pages = [
    { href: 'home.html', text: 'Home' },
    { href: 'shortcuts.html', text: 'Shortcuts' },
    { href: 'programs.html#Linux', text: 'Programming' },
    { href: 'docs.html', text: 'Docs' },
    { href: 'playground.html', text: 'Playground' },
    { href: 'bootstrap.html', text: 'Bootstrap' },
    { href: 'todo.html', text: 'To Do List' }
];

document.addEventListener('DOMContentLoaded', function() {
    // Get the current page's filename
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    console.log(`Current Page: "${currentPage}"`);
    AddNavBar(currentPage); 
});

function AddNavBar(currentPage) {
    const nav = document.createElement('nav');

    // Create links and add them to the nav element
    pages.forEach(page => {
        const a = document.createElement('a');
        a.href = page.href;
        a.textContent = page.text;
        
        // Add 'active' class if the link matches the current page
        if (page.href === currentPage || (page.href.startsWith('programs.html') && currentPage.startsWith('programs.html'))) {
            a.classList.add('active');
        }
        
        nav.appendChild(a);
    });
    
    // Insert the nav at the beginning of the body
    document.body.insertBefore(nav, document.body.firstChild);
}