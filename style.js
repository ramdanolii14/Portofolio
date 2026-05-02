// Active link on scroll
const sections = ["home", "about", "portfolio", "contact"].map((id) =>
  document.getElementById(id),
);
const links = [...document.querySelectorAll(".menu a")];
const onScroll = () => {
  let active = "home";
  sections.forEach((sec) => {
    if (window.scrollY + 120 >= sec.offsetTop) active = sec.id;
  });
  links.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + active),
  );
};
document.addEventListener("scroll", onScroll);
onScroll();

// Tabs
const tabBtns = document.querySelectorAll(".tab");
tabBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const id = btn.dataset.tab;
    document.querySelectorAll(".tab-panel").forEach((p) => (p.hidden = true));
    document.getElementById("tab-" + id).hidden = false;
  }),
);

// Contact via WA
function sendWA(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const name = fd.get("name");
  const email = fd.get("email");
  const message = fd.get("message");
  const text = encodeURIComponent(
    `Halo, saya ${name} (${email})\n${message}`,
  );
  // Nomor WA Rian (sesuai data user): 0812-7538-0001 -> 6281275380001
  const url = `https://wa.me/6281265251062?text=${text}`;
  window.open(url, "_blank");
}

// Comments (LocalStorage demo)
const key = "rian-comments-v1";
const list = document.getElementById("comments");
function render() {
  const items = JSON.parse(localStorage.getItem(key) || "[]");
  list.innerHTML = "";
  items.forEach((i) => {
    const el = document.createElement("div");
    el.className = "comment-item";
    el.innerHTML = `<b>${i.name}</b><div style="color:var(--muted); margin-top:6px">${i.msg}</div>`;
    list.appendChild(el);
  });
}
function addComment(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const name = fd.get("cname");
  const msg = fd.get("cmsg");
  const items = JSON.parse(localStorage.getItem(key) || "[]");
  items.unshift({ name, msg, at: Date.now() });
  localStorage.setItem(key, JSON.stringify(items.slice(0, 50)));
  e.target.reset();
  render();
}
render();

// year
document.getElementById("y").textContent = new Date().getFullYear();