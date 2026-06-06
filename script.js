// Cambiá este número por el WhatsApp real de Fluxstore.
// Formato recomendado: código país + característica + número, sin espacios ni símbolos.
const WHATSAPP_NUMBER = "5493415907913";

const products = [
  {
    id: "luffbar-55k",
    name: "Luffbar Flare 55K",
    puffs: "55k",
    price: 25990,
    image: "assets/luffbar-55k.jpeg",
    flavors: "Fruity Cool Dragonfruit, Alaska Ice, Straw Nana, Grape Menthol, Grape Slushy"
  },
  {
    id: "rabbeats-50k",
    name: "Elfbar RabBeats 50K",
    puffs: "50k",
    price: 23990,
    image: "assets/rabbeats-50k.jpeg",
    flavors: "Icy Mint, Blueberry Lemon, Strawberry Ice"
  },
  {
    id: "elfbar-ice-40k",
    name: "Elfbar Ice King 40K",
    puffs: "40k",
    price: 23990,
    image: "assets/elfbar-ice-40k.jpeg",
    flavors: "Baja Splash, Peach Blue Slush, Strawberry Watermelon, Hawaiian Slush"
  },
  {
    id: "ignite-ice-40k",
    name: "Ignite Ice 40K",
    puffs: "40k",
    price: 25500,
    image: "assets/ignite-ice-40k.jpeg",
    flavors: "Strawberry, Mint, Grape"
  },
  {
    id: "lost-mary-20k",
    name: "Lost Mary MO20000 Pro",
    puffs: "20k",
    price: 17990,
    image: "assets/lost-mary-20k.jpeg",
    flavors: "Ice Mint y consultar sabores disponibles"
  }
];

let cart = JSON.parse(localStorage.getItem("fluxstoreCart") || "[]");
const money = value => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
const waLink = text => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

function renderProducts(filter = "all") {
  const grid = document.querySelector("#productGrid");
  const list = filter === "all" ? products : products.filter(p => p.puffs === filter);
  grid.innerHTML = list.map(p => `
    <article class="product-card" data-puffs="${p.puffs}">
      <img src="${p.image}" alt="${p.name}">
      <div class="product-body">
        <div class="product-top">
          <h3 class="product-title">${p.name}</h3>
          <span class="product-price">${money(p.price)}</span>
        </div>
        <span class="puffs">${p.puffs.toUpperCase()} puffs</span>
        <p class="flavors">${p.flavors}</p>
        <button class="btn" onclick="addToCart('${p.id}')">Agregar</button>
      </div>
    </article>
  `).join("");
}

function renderPrices() {
  document.querySelector("#priceTable").innerHTML = products.map(p => `
    <div class="price-row">
      <strong>${p.name}</strong>
      <span>${money(p.price)}</span>
    </div>
  `).join("");
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  const found = cart.find(p => p.id === id);
  if (found) found.qty += 1;
  else cart.push({ ...item, qty: 1 });
  saveCart();
  document.querySelector("#cart").classList.add("open");
}

function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
}

function saveCart() {
  localStorage.setItem("fluxstoreCart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.querySelector("#cartCount").textContent = count;
  document.querySelector("#cartTotal").textContent = money(total);
  document.querySelector("#cartItems").innerHTML = cart.length ? cart.map(item => `
    <div class="cart-item">
      <div><strong>${item.name}</strong><br><small>${item.qty} x ${money(item.price)}</small></div>
      <button class="chip" onclick="removeFromCart('${item.id}')">×</button>
    </div>
  `).join("") : `<p class="flavors">Todavía no agregaste productos.</p>`;

  const message = cart.length
    ? `Hola Fluxstore, quiero hacer este pedido:%0A${cart.map(i => `• ${i.qty} x ${i.name} - ${money(i.price)}`).join("%0A")}%0A%0ATotal estimado: ${money(total)}%0A¿Me confirmás disponibilidad, sabores y envío?`
    : "Hola Fluxstore, quiero consultar disponibilidad y precios.";
  document.querySelector("#sendOrder").href = waLink(decodeURIComponent(message));
}

function setup() {
  renderProducts();
  renderPrices();
  renderCart();

  document.querySelectorAll(".chip[data-filter]").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip[data-filter]").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderProducts(chip.dataset.filter);
    });
  });

  document.querySelector("#cartToggle").addEventListener("click", () => document.querySelector("#cart").classList.toggle("open"));
  document.querySelector("#clearCart").addEventListener("click", () => { cart = []; saveCart(); });
  document.querySelector("#menuBtn").addEventListener("click", () => document.querySelector("#navLinks").classList.toggle("open"));

  const genericText = "Hola Fluxstore, quiero consultar por vapers disponibles.";
  document.querySelector("#heroWhatsapp").href = waLink(genericText);
  document.querySelector("#contactWhatsapp").href = waLink(genericText);

  const ageGate = document.querySelector("#ageGate");
  if (localStorage.getItem("fluxstoreAdult") === "yes") ageGate.classList.add("hidden");
  document.querySelector("#enterSite").addEventListener("click", () => {
    localStorage.setItem("fluxstoreAdult", "yes");
    ageGate.classList.add("hidden");
  });
}

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
document.addEventListener("DOMContentLoaded", setup);
