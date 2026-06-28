
const WHATSAPP_NUMBER = "5493415907913";
const SHIPPING_PRICE = 4000;
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTW9DKie_iYz__7nl0ASAo_P3Z_xyfyuM4mbNb6FOu0sjynehhCDoMRZ___K2ZpPo/exec";
const PAYMENT_ALIAS = "fluxstoree";
const PAYMENT_HOLDER = "Constanza Malvina Pompei";
const PAYMENT_CVU = "3840200500000015731294";

const products = [
  {
    id: "luffbar-55k",
    name: "Luffbar Flare 55K",
    puffs: "55k",
    price: 26990,
    image: "assets/luffbar-55k.png",
    flavors: "Fruity Cool Dragonfruit, Alaska Ice, Straw Nana, Grape Menthol, Grape Slushy",
    flavorOptions: [
      { name: "Fruity Cool Dragonfruit", image: "assets/luffbar-fruity-cool-dragonfruit.jpeg",  stock: false },
      { name: "Alaska Ice", image: "assets/luffbar-alaska-ice.jpeg",  stock: true },
      { name: "Straw Nana", image: "assets/luffbar-straw-nana.jpeg",  stock: true},
      { name: "Grape Menthol", image: "assets/luffbar-fruity-cool-grape-menthol.jpeg",  stock: true},
      { name: "Grape Slushy", image: "assets/luffbar-grape-slushy.jpeg",  stock: true}
    ]
  },
  {
    id: "rabbeats-50k",
    name: "Elfbar RabBeats 50K",
    puffs: "50k",
    price: 24990,
    image: "assets/rabbeats-50k.png",
    flavors: "Icy Mint, Blueberry Lemon, Strawberry Ice, Pineapple Ice, Fanta Strawberry, Banana Ice, Menthol, Sakura Grape",
    flavorOptions: [
      { name: "Icy Mint", image: "assets/rabbeats-icy-mint.jpeg",  stock: false},
      { name: "Blueberry Lemon", image: "assets/rabbeats-blueberry-lemon.jpeg",  stock: false},
      { name: "Strawberry Ice", image: "assets/rabbeats-strawberry-ice.jpeg",  stock: false},
      { name: "Pineapple Ice", image: "assets/rabbeats-pineapple-ice.jpeg",  stock: true},
      { name: "Fanta Strawberry", image: "assets/rabbeats-fanta-strawberry.jpeg",  stock: false},
      { name: "Banana Ice", image: "assets/rabbeats-banana-ice.jpeg",  stock: true},
      { name: "Menthol", image: "assets/rabbeats-menthol.jpeg",  stock: false},
      { name: "Sakura Grape", image: "assets/rabbeats-sakura-grape.jpeg",  stock: false},
    ]
  },
  {
    id: "elfbar-ice-40k",
    name: "Elfbar Ice King 40K",
    puffs: "40k",
    price: 24990,
    image: "assets/elfbar-ice-40k.png",
    flavors: "Baja Splash, Peach Blue Slush, Strawberry Watermelon, Hawaiian Slush, Black Mint, Cherry Fuse, Miami Mint",
    flavorOptions: [
      { name: "Baja Splash", image: "assets/elfbar-baja-splash.jpeg",  stock: true},
      { name: "Peach Blue Slush", image: "assets/elfbar-peach-blue-slush.jpeg",  stock: true},
      { name: "Strawberry Watermelon", image: "assets/elfbar-strawberry-watermelon.jpeg",  stock: true},
      { name: "Hawaiian Slush", image: "assets/elfbar-hawaiian-slush.jpeg",  stock: true},
      { name: "Black Mint", image: "assets/elfbar-black-mint.jpeg",  stock: true},
      { name: "Cherry Fuse", image: "assets/elfbar-cherry-fuse.jpeg",  stock: true},
      { name: "Miami Mint", image: "assets/elfbar-miami-mint.jpeg",  stock: true}
    ]
  },
  {
    id: "ignite-ice-40k",
    name: "Ignite Ice 40K",
    puffs: "40k",
    price: 29990,
    /*oldPrice: 30000,
    discount: "15% OFF",*/
    image: "assets/ignite-ice-40k.png",
    flavors: "Strawberry, Mint, Grape, Peach Berry Ice, Strawberry Watermelon, Banana Cherry, Watermelon Ice",
    flavorOptions: [
      { name: "Strawberry", image: "assets/ignite-strawberry.jpeg",  stock: false},
      { name: "Mint", image: "assets/ignite-ice-mint.jpeg",  stock: true},
      { name: "Grape", image: "assets/ignite-grape.jpeg",  stock: false},
      { name: "Peach Berry Ice", image: "assets/ignite-peach-berry-ice.jpeg",  stock: true},
      { name: "Strawberry Watermelon", image: "assets/ignite-strawberry-watermelon.jpeg",  stock: true},
      { name: "Banana Cherry", image: "assets/ignite-banana-cherry.jpeg",  stock: true},
      { name: "Watermelon Ice", image: "assets/ignite-watermelon-ice.jpeg",  stock: true}
    ]
  },

  {
    id: "wefume-30k",
    name: "Wefume 30k",
    puffs: "30k",
    price: 23990,
    promoQty: 2,
    promoPrice: 41990,
    promoText: "Llevando 2: $41.990",
    image: "assets/wefume-30k.png",
    flavors: "Strawberry Kiwi, Lush Ice, Apple Pineapple, Miami Mix, Ice Mint",
    flavorOptions: [
      { name: "Strawberry Kiwi", image: "assets/wefume-strawberry-kiwi.jpeg",  stock: false},
      { name: "Lush Ice", image: "assets/wefume-lush-ice.jpeg",  stock: true},
      { name: "Apple Pineapple", image: "assets/wefume-apple-pineapple.jpeg",  stock: true},
      { name: "Miami Mix", image: "assets/wefume-miami-mix.jpeg",  stock: true},
      { name: "Ice Mint", image: "assets/wefume-ice-mint.jpeg",  stock: true}
    ]
  },

  {
    id: "lost-mary-20k",
    name: "Lost Mary MO20000 Pro",
    puffs: "20k",
    price: 17990,
    image: "assets/lost-mary-20k.png",
    flavors: "Ice Mint",
    flavorOptions: [
      { name: "Ice Mint", image: "assets/lostmary-ice-mint.jpeg"}
    ],
    soldOut: true
  }
];

let cart = JSON.parse(localStorage.getItem("fluxstoreCart") || "[]");
const money = value => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);

const waLink = text => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

function getItemSubtotal(item) {
  if (item.promoQty && item.promoPrice && item.qty >= item.promoQty) {
    const promoGroups = Math.floor(item.qty / item.promoQty);
    const remainingUnits = item.qty % item.promoQty;

    return promoGroups * item.promoPrice + remainingUnits * item.price;
  }

  return item.price * item.qty;
}

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
        ${p.promoText ? `<span class="promo-badge">${p.promoText}</span>` : ""}
        <p class="flavors">${p.flavors}</p>

        <div class="product-actions">
          ${p.soldOut
         ? `<button class="btn disabled" disabled>Agotado</button>`
        : `<button class="btn" onclick="openFlavorsModal('${p.id}')">Ver sabores</button>`
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

function addToCart(id, flavor = "") {
  const item = products.find(p => p.id === id);
  if (!item || item.soldOut) return;

  const cartId = flavor ? `${id}-${flavor}` : id;
  const found = cart.find(p => p.cartId === cartId);

  if (found) {
    found.qty += 1;
  } else {
    cart.push({
      ...item,
      cartId,
      selectedFlavor: flavor,
      qty: 1
    });
  }

  saveCart();
  document.querySelector("#cart").classList.add("open");
}

function removeFromCart(cartId) {
  cart = cart.filter(p => (p.cartId || p.id) !== cartId);
  saveCart();
}
function saveCart() {
  localStorage.setItem("fluxstoreCart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = getOrderTotal();

  document.querySelector("#cartCount").textContent = count;
  document.querySelector("#cartTotal").textContent = money(total);

  document.querySelector("#cartItems").innerHTML = cart.length ? cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong><br>
        ${item.selectedFlavor ? `<small>Sabor: ${item.selectedFlavor}</small><br>` : ""}
        <small>
          ${item.qty} x ${money(item.price)}
          ${item.promoQty && item.qty >= item.promoQty ? `<br>Promo aplicada: ${item.promoQty} x ${money(item.promoPrice)}` : ""}
        </small>
      </div>

      <button class="chip" onclick="removeFromCart('${item.cartId || item.id}')">×</button>
    </div>
  `).join("") : `<p class="flavors">Todavía no agregaste productos.</p>`;

  const sendOrderBtn = document.querySelector("#sendOrder");
sendOrderBtn.href = "#";
sendOrderBtn.onclick = event => {
  event.preventDefault();
  openCheckout();
};

}
function getCartTotal() {
  return cart.reduce((sum, item) => sum + getItemSubtotal(item), 0);
}

function getOrderTotal() {
  return getCartTotal() + SHIPPING_PRICE;
}

function getCartProductsText() {
  return cart.map(i => {
  const promoApplied = i.promoQty && i.qty >= i.promoQty;
  const promoText = promoApplied ? ` promo ${i.promoQty} x ${money(i.promoPrice)}` : "";
  return `${i.qty} x ${i.name}${i.selectedFlavor ? ` (${i.selectedFlavor})` : ""} - ${money(getItemSubtotal(i))}${promoText}`;
}).join(" | ");
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

${cart.map(i => {
  const promoApplied = i.promoQty && i.qty >= i.promoQty;
  const promoText = promoApplied ? ` promo aplicada (${i.promoQty} x ${money(i.promoPrice)})` : "";
  return `• ${i.qty} x ${i.name}${i.selectedFlavor ? ` (${i.selectedFlavor})` : ""} - ${money(getItemSubtotal(i))}${promoText}`;
}).join("\n")}

Total estimado: ${money(total)}

Nombre: ${customerData.nombre}
WhatsApp: ${customerData.whatsapp}
Dirección/Barrio: ${customerData.direccion}
Pago: ${customerData.pago}
Horario: ${customerData.horario || "A coordinar"}
Observaciones: ${customerData.observaciones || "Sin observaciones"}

¿Me confirmás disponibilidad, sabores y envío?`;
}


function starsText(rating) {
  const full = "★".repeat(rating);
  const empty = "☆".repeat(5 - rating);
  return full + empty;
}

async function loadReviews() {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);
    const data = await response.json();

    if (!data.ok || !Array.isArray(data.reviews)) {
      renderReviews([]);
      return;
    }

    renderReviews(data.reviews);
  } catch (error) {
    console.error("Error cargando reseñas:", error);
    renderReviews([]);
  }
}

function renderReviews(reviews) {
  const grid = document.querySelector("#reviewsGrid");

  if (!reviews.length) {
    grid.innerHTML = `
      <article class="review-card">
        <div class="review-stars">★★★★★</div>
        <p>Todavía no hay reseñas. Sé la primera persona en dejar tu opinión.</p>
        <strong>Fluxstore</strong>
      </article>
    `;

    document.querySelector("#averageRating").textContent = "5.0";
    document.querySelector("#averageStars").textContent = "★★★★★";
    document.querySelector("#reviewCount").textContent = "0 reseñas";
    return;
  }

  grid.innerHTML = reviews.map(review => `
    <article class="review-card">
      <div class="review-stars">${starsText(Number(review.estrellas))}</div>
      ${review.comentario ? `<p>${review.comentario}</p>` : `<p>Dejó su calificación sin comentario.</p>`}
      <strong>${review.nombre || "Cliente Fluxstore"}</strong>
    </article>
  `).join("");

  const average = reviews.reduce((sum, review) => sum + Number(review.estrellas), 0) / reviews.length;

  document.querySelector("#averageRating").textContent = average.toFixed(1);
  document.querySelector("#averageStars").textContent = starsText(Math.round(average));
  document.querySelector("#reviewCount").textContent = `${reviews.length} reseñas`;
}

async function saveReviewToGoogleSheets(reviewData) {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "review",
        ...reviewData
      })
    });

    return true;
  } catch (error) {
    console.error("Error guardando reseña:", error);
    return false;
  }
}

function setReviewRating(rating) {
  document.querySelector("#reviewRating").value = rating;

  document.querySelectorAll(".star-btn").forEach(star => {
    const starValue = Number(star.dataset.rating);
    star.classList.toggle("active", starValue <= rating);
  });
}

function setupStarPicker() {
  document.querySelectorAll(".star-btn").forEach(star => {
    star.addEventListener("click", () => {
      setReviewRating(Number(star.dataset.rating));
    });
  });

  setReviewRating(5);
}

async function handleReviewSubmit(event) {
  event.preventDefault();

  const submitBtn = event.target.querySelector("button[type='submit']");

  const reviewData = {
  nombre: document.querySelector("#reviewName").value.trim() || "Cliente Fluxstore",
  estrellas: Number(document.querySelector("#reviewRating").value),
  comentario: document.querySelector("#reviewComment").value.trim()
  };

  if (!reviewData.estrellas || reviewData.estrellas < 1 || reviewData.estrellas > 5) {
    alert("Elegí una calificación válida.");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Publicando...";

  await saveReviewToGoogleSheets(reviewData);

  document.querySelector("#reviewForm").reset();

  setTimeout(() => {
    loadReviews();
    submitBtn.disabled = false;
    submitBtn.textContent = "Publicar reseña";
    alert("Gracias por dejar tu reseña.");
  }, 1200);
  }

  function getProductFlavors(product) {
  if (product.flavorOptions && product.flavorOptions.length) {
    return product.flavorOptions.map(flavor => ({
      ...flavor,
      stock: flavor.stock !== false
    }));
  }

  return product.flavors.split(",").map(flavor => ({
    name: flavor.trim(),
    image: product.image,
    stock: true
  }));
  }
function openFlavorsModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const flavors = getProductFlavors(product).sort((a, b) => {
  return Number(b.stock) - Number(a.stock);
  });

  document.querySelector("#flavorsDetail").innerHTML = `
    <div class="flavors-detail-head">
      <span class="puffs">${product.puffs.toUpperCase()} PUFFS</span>
      <h2>${product.name}</h2>

      <div class="detail-price">
        ${product.oldPrice ? `<small>${money(product.oldPrice)}</small>` : ""}
        <strong>${money(product.price)}</strong>
      </div>

      ${product.promoText ? `<div class="promo-badge">${product.promoText}</div>` : ""}
    </div>

    <div class="flavor-gallery">
      ${flavors.map(flavor => `
  <article class="flavor-card ${flavor.stock ? "" : "flavor-out"}">
    <div class="flavor-card-img">
      ${flavor.stock ? "" : `<span class="flavor-stock-badge">Sin stock</span>`}
      <img src="${flavor.image}" alt="${product.name} ${flavor.name}">
    </div>

    <div class="flavor-card-body">
      <h3>${flavor.name}</h3>
      <p>${product.name}</p>

      ${flavor.stock
        ? `<button class="btn full" onclick="addFlavorToCart('${product.id}', '${flavor.name.replace(/'/g, "\\'")}')">
            Agregar
          </button>`
        : `<button class="btn full disabled" disabled>Sin stock</button>`
      }

      <a 
        class="btn ghost full"
        href="${waLink(`Hola Fluxstore, quiero consultar por ${product.name} sabor ${flavor.name}. ¿Vuelve a ingresar stock?`)}"
        target="_blank"
        onclick="trackClick('Consultar sabor sin stock', '${product.name} - ${flavor.name}')"
      >
        Consultar
      </a>
    </div>
  </article>
  `).join("")}
    </div>
  `;

  document.querySelector("#flavorsModal").classList.add("open");
  document.body.classList.add("modal-open");
}

function closeFlavorsModal() {
  document.querySelector("#flavorsModal").classList.remove("open");
  document.body.classList.remove("modal-open");
}

function addFlavorToCart(productId, flavorName) {
  addToCart(productId, flavorName);
  closeFlavorsModal();
}

let currentCheckoutOrder = null;

function openCheckout() {
  if (!cart.length) {
    window.open(waLink("Hola Fluxstore, quiero consultar disponibilidad y precios."), "_blank");
    return;
  }

  document.querySelector("#checkoutProductsTotal").textContent = money(getCartTotal());
  document.querySelector("#checkoutResumeTotal").textContent = money(getOrderTotal());

  document.querySelector("#checkoutDataScreen").classList.add("active");
  document.querySelector("#checkoutPaymentScreen").classList.remove("active");

  document.querySelector("#stepCart").classList.add("done");
  document.querySelector("#stepCart").classList.remove("active");
  document.querySelector("#stepData").classList.add("active");
  document.querySelector("#stepData").classList.remove("done");
  document.querySelector("#stepPayment").classList.remove("active", "done");

  document.querySelector("#checkoutModal").classList.add("open");
  document.body.classList.add("modal-open");
}

function closeCheckout() {
  document.querySelector("#checkoutModal").classList.remove("open");
  document.body.classList.remove("modal-open");
}

function validateCheckoutData(customerData) {
  if (customerData.nombre.length < 2) {
    alert("Ingresá tu nombre.");
    return false;
  }

  if (customerData.whatsapp.replace(/\D/g, "").length < 8) {
    alert("Ingresá un WhatsApp válido.");
    return false;
  }

  if (!customerData.ciudad) {
    alert("Elegí tu ciudad.");
    return false;
  }

  if (customerData.direccion.length < 3) {
    alert("Ingresá tu dirección.");
    return false;
  }

  if (!customerData.pago) {
    alert("Elegí una forma de pago.");
    return false;
  }

  return true;
}

async function handleCheckoutSubmit(event) {
  event.preventDefault();

  const submitBtn = event.target.querySelector("button[type='submit']");

  const customerData = {
  nombre: document.querySelector("#checkoutName").value.trim(),
  whatsapp: document.querySelector("#checkoutWhatsapp").value.trim(),
  ciudad: document.querySelector("#checkoutCity").value,
  direccion: document.querySelector("#checkoutAddress").value.trim(),
  horario: document.querySelector("#checkoutTime").value.trim(),
  observaciones: document.querySelector("#checkoutNotes").value.trim(),
  pago: document.querySelector("#checkoutPayment").value
  };

  if (!validateCheckoutData(customerData)) return;

  const orderId = createOrderId();

  const paymentStatus = customerData.pago === "Transferencia"
  ? "Pendiente de transferencia"
  : "Pago en efectivo al recibir";

  const orderData = {
  pedidoId: orderId,
  nombre: customerData.nombre,
  whatsapp: customerData.whatsapp,
  direccion: `${customerData.ciudad} - ${customerData.direccion}`,
  pago: customerData.pago,
  horario: customerData.horario,
  productos: `${getCartProductsText()} | Envío: ${money(SHIPPING_PRICE)}`,
  total: money(getOrderTotal()),
  observaciones: `${customerData.observaciones || ""} | Estado de pago: ${paymentStatus}`
  };

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = "Registrando pedido...";

    await saveOrderToGoogleSheets(orderData);

    currentCheckoutOrder = {
      orderData,
      customerData
    };

  document.querySelector("#checkoutOrderId").textContent = orderData.pedidoId;
document.querySelector("#checkoutPaymentTotal").textContent = orderData.total;
document.querySelector("#checkoutAlias").textContent = PAYMENT_ALIAS;
document.querySelector("#checkoutHolder").textContent = PAYMENT_HOLDER;
document.querySelector("#checkoutCvu").textContent = PAYMENT_CVU || "Consultar";

let whatsappMessage = "";

if (customerData.pago === "Transferencia") {
  whatsappMessage = `Hola Fluxstore, ya realicé la transferencia del pedido ${orderData.pedidoId}.

Total transferido: ${orderData.total}
Nombre: ${customerData.nombre}
WhatsApp: ${customerData.whatsapp}
Ciudad: ${customerData.ciudad}
Dirección: ${customerData.direccion}

Adjunto comprobante.`;

  document.querySelector("#checkoutPaymentScreen h2").textContent = "Transferencia";
  document.querySelector("#checkoutPaymentHelp").textContent = "Transferí el total exacto y luego enviá el comprobante por WhatsApp.";
  document.querySelector(".bank-box").style.display = "block";
  document.querySelector(".payment-warning p").textContent = "El pedido queda pendiente hasta recibir el comprobante. Una vez confirmado, coordinamos la entrega.";
  document.querySelector("#checkoutWhatsappReceipt").textContent = "Enviar comprobante por WhatsApp";
} else {
  whatsappMessage = `Hola Fluxstore, quiero confirmar el pedido ${orderData.pedidoId}.

Forma de pago: Efectivo
Total: ${orderData.total}
Nombre: ${customerData.nombre}
WhatsApp: ${customerData.whatsapp}
Ciudad: ${customerData.ciudad}
Dirección: ${customerData.direccion}

Quedo a la espera para coordinar la entrega.`;

  document.querySelector("#checkoutPaymentScreen h2").textContent = "Pedido registrado";
  document.querySelector("#checkoutPaymentHelp").textContent = "Tu pedido quedó registrado. Coordinamos la entrega y abonás en efectivo al recibir.";
  document.querySelector(".bank-box").style.display = "none";
  document.querySelector(".payment-warning p").textContent = "No necesitás transferir. Contactanos por WhatsApp para coordinar la entrega y el pago en efectivo.";
  document.querySelector("#checkoutWhatsappReceipt").textContent = "Coordinar por WhatsApp";
}

  document.querySelector("#checkoutWhatsappReceipt").href = waLink(whatsappMessage);

  document.querySelector("#checkoutDataScreen").classList.remove("active");
  document.querySelector("#checkoutPaymentScreen").classList.add("active");

  document.querySelector("#stepData").classList.remove("active");
  document.querySelector("#stepData").classList.add("done");
  document.querySelector("#stepPayment").classList.add("active");

cart = [];
saveCart();
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Continuar al pago";
  }
}

async function copyCheckoutAlias() {
  await navigator.clipboard.writeText(PAYMENT_ALIAS);

  const btn = document.querySelector("#copyCheckoutAlias");
  btn.textContent = "Alias copiado";
  setTimeout(() => {
    btn.textContent = "Copiar alias";
  }, 1800);
}

function setup() {
  renderProducts();
  renderPrices();
  renderCart();
  loadReviews();
  setupStarPicker();

  document.querySelectorAll(".chip[data-filter]").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip[data-filter]").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderProducts(chip.dataset.filter);
    });
  });

  document.querySelector("#cartToggle").addEventListener("click", () => {
    document.querySelector("#cart").classList.toggle("open");
  });

  document.querySelector("#clearCart").addEventListener("click", () => {
    cart = [];
    saveCart();
  });

  document.querySelector("#menuBtn").addEventListener("click", () => {
    document.querySelector("#navLinks").classList.toggle("open");
  });

  document.querySelector("#reviewForm").addEventListener("submit", handleReviewSubmit);

  document.querySelector("#closeFlavorsModal").addEventListener("click", closeFlavorsModal);

  document.querySelector("#flavorsModal").addEventListener("click", event => {
    if (event.target.id === "flavorsModal") closeFlavorsModal();
  });

  document.querySelector("#checkoutForm").addEventListener("submit", handleCheckoutSubmit);

  document.querySelector("#closeCheckout").addEventListener("click", closeCheckout);

  document.querySelector("#checkoutModal").addEventListener("click", event => {
    if (event.target.id === "checkoutModal") closeCheckout();
  });

document.querySelector("#copyCheckoutAlias").addEventListener("click", copyCheckoutAlias);

  const genericText = "Hola Fluxstore, quiero consultar por vapers disponibles.";
  document.querySelector("#heroWhatsapp").href = waLink(genericText);
  document.querySelector("#contactWhatsapp").href = waLink(genericText);

  document.querySelector("#heroWhatsapp").addEventListener("click", () => {
    trackClick("WhatsApp hero", "Consulta general");
  });

  document.querySelector("#contactWhatsapp").addEventListener("click", () => {
    trackClick("WhatsApp contacto", "Consulta general");
  });
}


window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.trackClick = trackClick;
window.openFlavorsModal = openFlavorsModal;
window.addFlavorToCart = addFlavorToCart;
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