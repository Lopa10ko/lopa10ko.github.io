document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    const navLinks = document.getElementsByClassName('nav-menu-item');
    for (let i = 0; i < navLinks.length; i++) {
        const link = navLinks[i];
        const linkHref = link.getAttribute('href');
        if (linkHref.endsWith("contact") && currentPage.endsWith("contact.html")) {
            link.classList.add('active');
        }
    }
});