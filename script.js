// Dark Mode Toggle
const toggle = document.getElementById("mode-toggle");
toggle.addEventListener("click", () => {
document.body.classList.toggle("dark-mode");
});

// Cursor Glow
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
cursor.style.top = e.clientY + "px";
cursor.style.left = e.clientX + "px";
});

// 3D Tilt
VanillaTilt.init(document.querySelectorAll(".project-card"), {
max: 15,
speed: 400,
glare: true,
"max-glare": 0.3,
});

// GSAP Hero Animation
gsap.from(".hero-left h1", {
opacity: 0,
y: -50,
duration: 1
});

gsap.from(".hero-right img", {
opacity: 0,
x: 50,
duration: 1,
delay: 0.3
});