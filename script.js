window.addEventListener("load", () => {
    const intro = document.getElementById("intro");
    const realSite = document.getElementById("real-site");
    const introStatus = document.getElementById("intro-status");

    if (introStatus) {
        introStatus.textContent = "OPEN TO INTERNSHIPS | RESEARCH | TA ROLES";
    }

    setTimeout(() => {
        intro.classList.add("intro-exit");

        setTimeout(() => {
            intro.style.display = "none";
            realSite.style.display = "block";
            initScrollReveal();
            initActiveNav();
            updateLiveTime();
            setInterval(updateLiveTime, 60000);
        }, 980);
    }, 3000);
});

function initScrollReveal() {
    const revealItems = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    revealItems.forEach((item) => observer.observe(item));
}

function initActiveNav() {
    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-list li");

    window.addEventListener("scroll", () => {
        let current = "home";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach((item) => {
            const link = item.querySelector("a");
            item.classList.remove("active");
            if (link && link.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetSelector = anchor.getAttribute("href");
            if (!targetSelector || targetSelector === "#") {
                return;
            }

            const target = document.querySelector(targetSelector);
            if (!target) {
                return;
            }

            event.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth"
            });
        });
    });
}

function updateLiveTime() {
    const footer = document.querySelector("footer p");
    if (!footer) {
        return;
    }

    const now = new Date();
    const localTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    footer.textContent = `Marjia Islam | Final-Year CSE Student | Interested in SQA | AI & Bioinformatics Enthusiast | Dhaka Time ${localTime}`;
}