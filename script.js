const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-list li");

function updateActiveNav() {
    let current = "home";
    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.id;
        }
    });
    navItems.forEach((item) => {
        const link = item.querySelector("a");
        item.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();
