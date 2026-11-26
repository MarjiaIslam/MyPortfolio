// Floating stars in the side margins
const COLORS = ["#1f7a6e", "#2f5d9e", "#6b7a2f", "#b8891a", "#c8692a", "#a8522a"];
const SPOTS = [
    [2, 8], [6, 30], [3, 52], [7, 74], [2, 90],
    [93, 6], [96, 28], [92, 50], [95, 70], [91, 88]
];

function starPoints(R, r, n = 5) {
    const pts = [];
    for (let i = 0; i < n * 2; i++) {
        const angle = (-90 + (i * 180) / n) * (Math.PI / 180);
        const rad = i % 2 === 0 ? R : r;
        pts.push(`${(20 + rad * Math.cos(angle)).toFixed(1)},${(20 + rad * Math.sin(angle)).toFixed(1)}`);
    }
    return pts.join(" ");
}

const layer = document.querySelector(".stars");
if (layer) {
    SPOTS.forEach(([x, y], i) => {
        const size = 26 + ((i * 7) % 4) * 6;
        const color = COLORS[i % COLORS.length];
        const ns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(ns, "svg");
        svg.setAttribute("viewBox", "0 0 40 40");
        svg.setAttribute("width", size);
        svg.setAttribute("height", size);
        svg.style.left = x + "%";
        svg.style.top = y + "%";
        svg.style.transform = `rotate(${(i * 37) % 60 - 30}deg)`;
        svg.style.animationDelay = (i * 0.6) + "s";
        const poly = document.createElementNS(ns, "polygon");
        poly.setAttribute("points", starPoints(17, 8));
        poly.setAttribute("fill", color);
        poly.setAttribute("stroke", color);
        poly.setAttribute("stroke-width", "3");
        poly.setAttribute("stroke-linejoin", "round");
        svg.appendChild(poly);
        layer.appendChild(svg);
    });
}

// Highlight current section in the nav
const links = document.querySelectorAll(".topbar nav a");
const sections = [...links].map((a) => document.querySelector(a.getAttribute("href")));

function updateActive() {
    let current = null;
    sections.forEach((sec) => {
        if (sec && window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", updateActive, { passive: true });
updateActive();
