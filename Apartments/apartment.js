document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    console.log('menuToggle:', menuToggle, 'mainNav:', mainNav);
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            console.log('Menu button clicked');
            const before = mainNav.classList.contains('active');
            mainNav.classList.toggle('active');
            const after = mainNav.classList.contains('active');
            console.log('mainNav active before:', before, 'after:', after);
        });
    } else {
        if (!menuToggle) console.error('menuToggle button not found');
        if (!mainNav) console.error('mainNav not found');
    }
    // Show menu-toggle button on mobile
    function handleResize() {
        if (window.innerWidth <= 990) {
            menuToggle.style.display = 'block';
        } else {
            menuToggle.style.display = 'none';
            if (mainNav) mainNav.classList.remove('active');
        }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
}); 