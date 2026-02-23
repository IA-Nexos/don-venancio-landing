const pages = document.getElementById("pages");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

navLinks.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    scrollToSection(target);
  });
});

// También habilita los botones dentro de la página (CTA)
document.querySelectorAll("[data-target]:not(.nav-link)").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    scrollToSection(target);
  });
});

// Resaltar item activo según sección visible
const sections = Array.from(document.querySelectorAll(".page"));
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(b => b.classList.toggle("is-active", b.dataset.target === id));
  });
}, { root: pages, threshold: 0.6 });

sections.forEach(s => io.observe(s));

// Form -> WhatsApp (sin backend)
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);

  const nombre = data.get("nombre");
  const telefono = data.get("telefono");
  const localidad = data.get("localidad");
  const negocio = data.get("negocio") || "";
  const mensaje = data.get("mensaje"); // <-- FALTABA ESTO

  const text =
`Hola! Soy ${nombre}.
Tel/WhatsApp: ${telefono}
Localidad: ${localidad}
Negocio: ${negocio}
Mensaje: ${mensaje}`;

  // IMPORTANTE: número en formato internacional, sin + ni espacios
  const TU_NUMERO = "5493388501086"; // <-- TU NÚMERO REAL
  const url = `https://wa.me/${TU_NUMERO}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});