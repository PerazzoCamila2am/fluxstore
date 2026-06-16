
const WHATSAPP_NUMBER = "5493415907913";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTW9DKie_iYz__7nl0ASAo_P3Z_xyfyuM4mbNb6FOu0sjynehhCDoMRZ___K2ZpPo/exec";

const products = [
  {
    id: "luffbar-55k",
    name: "Luffbar Flare 55K",
    puffs: "55k",
    price: 25990,
    image: "assets/luffbar-55k.png",
    flavors: "Fruity Cool Dragonfruit, Alaska Ice, Straw Nana, Grape Menthol, Grape Slushy"
  },
  {
    id: "rabbeats-50k",
    name: "Elfbar RabBeats 50K",
    puffs: "50k",
    price: 22990,
    image: "assets/rabbeats-50k.png",
    flavors: "Icy Mint, Blueberry Lemon, Strawberry Ice"
  },
  {
    id: "elfbar-ice-40k",
    name: "Elfbar Ice King 40K",
    puffs: "40k",
    price: 23990,
    image: "assets/elfbar-ice-40k.png",
    flavors: "Baja Splash, Peach Blue Slush, Strawberry Watermelon, Hawaiian Slush"
  },
  {
    id: "ignite-ice-40k",
    name: "Ignite Ice 40K",
    puffs: "40k",
    price: 25500,
    oldPrice: 30000,
    discount: "15% OFF",
    image: "assets/ignite-ice-40k.png",
    flavors: "Strawberry, Mint, Grape, Peach Berry Ice, Strawberry Watermelon"
  },

  {
    id: "wefume-30k",
    name: "Wefume 30k",
    puffs: "30k",
    price: 24000,
    image: "assets/wefume-30k.png",
    flavors: "Strawberry Kiwi, Lush Ice"
  },

  {
    id: "lost-mary-20k",
    name: "Lost Mary MO20000 Pro",
    puffs: "20k",
    price: 17990,
    image: "assets/lost-mary-20k.png",
    flavors: "Ice Mint y consultar sabores disponibles",
    soldOut: true
  }
];

let cart = JSON.parse(localStorage.getItem("fluxstoreCart") || "[]");
const money = value => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);

const waLink = text => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

function renderProducts(filter = "all") {
  const grid = document.querySelector("#productGrid");
  const list = filter === "all" ? products : products.filter(p => p.puffs === filter);
  grid.innerHTML = list.map(p => `
    <article class="product-card ${p.soldOut ? "sold-out" : ""}" data-puffs="${p.puffs}">
  <div class="product-image-wrap">
    <img src="${p.image}" alt="${p.name}">
    ${p.soldOut ? `<span class="sold-out-badge">Agotado</span>` : ""}
  </div>
      <div class="product-body">
        <div class="product-top">
          <h3 class="product-title">${p.name}</h3>
          <span class="product-price">
          ${p.oldPrice ? `<small class="old-price">${money(p.oldPrice)}</small>` : ""}
           ${money(p.price)}
          </span>
        </div>
        <span class="puffs">${p.puffs.toUpperCase()} puffs</span>
        ${p.discount ? `<span class="discount-badge">${p.discount}</span>` : ""}
        <p class="flavors">${p.flavors}</p>

        <div class="product-actions">
          ${p.soldOut
  ? `<button class="btn disabled" disabled>Agotado</button>`
  : `<button class="btn" onclick="addToCart('${p.id}')">Agregar</button>`
}
           <a 
            class="btn ghost" 
            href="${waLink(`Hola Fluxstore, quiero consultar por ${p.name}. ¿Qué sabores tenés disponibles?`)}" 
           target="_blank"
          onclick="trackClick('Consultar producto', '${p.name}')"
            >
              Consultar
          </a>
        </div>
        
      </div>
    </article>
  `).join("");
}

function renderPrices() {
  document.querySelector("#priceTable").innerHTML = products.map(p => `
    <div class="price-row">
      <strong>${p.name}</strong>
      <span>
      ${p.oldPrice ? `<small class="old-price">${money(p.oldPrice)}</small>` : ""}
      ${money(p.price)}
      </span>
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

  const sendOrderBtn = document.querySelector("#sendOrder");
  sendOrderBtn.href = "#";
  sendOrderBtn.onclick = openOrderForm;
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartProductsText() {
  return cart.map(i => `${i.qty} x ${i.name} - ${money(i.price)}`).join(" | ");
}

function createOrderId() {
  const now = new Date();
  const datePart = now.toISOString().slice(2, 10).replace(/-/g, "");
  const timePart = String(now.getHours()).padStart(2, "0") + String(now.getMinutes()).padStart(2, "0") + String(now.getSeconds()).padStart(2, "0");
  return `FX-${datePart}-${timePart}`;
}

function getCartWhatsappText(customerData) {
  const total = getCartTotal();

  return `Hola Fluxstore, quiero hacer este pedido ${customerData.pedidoId || ""}:

${cart.map(i => `• ${i.qty} x ${i.name} - ${money(i.price)}`).join("\n")}

Total estimado: ${money(total)}

Nombre: ${customerData.nombre}
WhatsApp: ${customerData.whatsapp}
Dirección/Barrio: ${customerData.direccion}
Pago: ${customerData.pago}
Horario: ${customerData.horario || "A coordinar"}
Observaciones: ${customerData.observaciones || "Sin observaciones"}

¿Me confirmás disponibilidad, sabores y envío?`;
}

function openOrderForm(event) {
  if (event) event.preventDefault();

  if (!cart.length) {
    window.open(waLink("Hola Fluxstore, quiero consultar disponibilidad y precios."), "_blank");
    return;
  }
  
  trackClick("Abrir formulario de pedido", "Carrito");
  document.querySelector("#orderModal").classList.add("open");
}

function closeOrderForm() {
  document.querySelector("#orderModal").classList.remove("open");
}

function openSuccessModal() {
  document.querySelector("#successModal").classList.add("open");
}

function closeSuccessModal() {
  document.querySelector("#successModal").classList.remove("open");
}

function validateOrderData(customerData) {
  const errors = [];

  if (customerData.nombre.length < 2) {
    errors.push("Ingresá tu nombre.");
  }

  const cleanWhatsapp = customerData.whatsapp.replace(/\D/g, "");
  if (cleanWhatsapp.length < 8) {
    errors.push("Ingresá un WhatsApp válido.");
  }

  if (customerData.direccion.length < 3) {
    errors.push("Ingresá tu dirección o barrio.");
  }

  if (!customerData.pago) {
    errors.push("Elegí una forma de pago.");
  }

  return errors;
}

async function handleOrderSubmit(event) {
  event.preventDefault();

  const total = getCartTotal();
  const orderId = createOrderId();

  const customerData = {
    nombre: document.querySelector("#customerName").value.trim(),
    whatsapp: document.querySelector("#customerWhatsapp").value.trim(),
    direccion: document.querySelector("#customerAddress").value.trim(),
    pago: document.querySelector("#customerPayment").value,
    horario: document.querySelector("#customerTime").value.trim(),
    observaciones: document.querySelector("#customerNotes").value.trim()
  };

  const errors = validateOrderData(customerData);

  if (errors.length) {
  alert(errors.join("\n"));
  return;
}

  const submitBtn = event.target.querySelector("button[type='submit']");
   submitBtn.disabled = true;
   submitBtn.textContent = "Enviando pedido...";
  

  const orderData = {
  pedidoId: orderId,
  ...customerData,
  productos: getCartProductsText(),
  total: money(total)
  };
  try {
  trackClick("Confirmar pedido", getCartProductsText());
  await saveOrderToGoogleSheets(orderData);

  const message = getCartWhatsappText({ ...customerData, pedidoId: orderId });
  window.open(waLink(message), "_blank");

  cart = [];
  saveCart();
  closeOrderForm();
  document.querySelector("#orderForm").reset();
  openSuccessModal();
} finally {
  submitBtn.disabled = false;
  submitBtn.textContent = "Confirmar pedido";
}
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

  document.querySelector("#orderForm").addEventListener("submit", handleOrderSubmit);
  document.querySelector("#closeOrderForm").addEventListener("click", closeOrderForm);
  document.querySelector("#orderModal").addEventListener("click", event => {
  if (event.target.id === "orderModal") closeOrderForm();
});

  document.querySelector("#closeSuccess").addEventListener("click", closeSuccessModal);
  document.querySelector("#successModal").addEventListener("click", event => {
  if (event.target.id === "successModal") closeSuccessModal();
});

  const genericText = "Hola Fluxstore, quiero consultar por vapers disponibles.";
  document.querySelector("#heroWhatsapp").href = waLink(genericText);
  document.querySelector("#contactWhatsapp").href = waLink(genericText);

  document.querySelector("#heroWhatsapp").addEventListener("click", () => {
  trackClick("WhatsApp hero", "Consulta general");
});

document.querySelector("#contactWhatsapp").addEventListener("click", () => {
  trackClick("WhatsApp contacto", "Consulta general");
});

  /*const ageGate = document.querySelector("#ageGate");
  if (localStorage.getItem("fluxstoreAdult") === "yes") ageGate.classList.add("hidden");
  document.querySelector("#enterSite").addEventListener("click", () => {
    localStorage.setItem("fluxstoreAdult", "yes");
    ageGate.classList.add("hidden");
  });*/
}

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.trackClick = trackClick;
document.addEventListener("DOMContentLoaded", setup);

async function saveOrderToGoogleSheets(orderData) {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    return true;
  } catch (error) {
    console.error("Error guardando pedido:", error);
    return false;
  }
}

async function trackClick(action, detail = "") {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "click",
        action,
        detail,
        page: window.location.href
      })
    });
  } catch (error) {
    console.error("Error registrando click:", error);
  }
}