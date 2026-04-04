// CART STATE
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// UPDATE BADGE
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;

  const total = cart.length;
  badge.textContent = total;
  badge.classList.toggle("visible", total > 0);
}

// ADD TO CART
function addToCart(id) {
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

// FILTER BUTTONS (UI only)
function setFilter(btn) {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// LOAD CART PAGE (FIXED)
function renderCart() {
  try {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    const empty = document.getElementById("cart-empty");
    const full = document.getElementById("cart-full");
    const list = document.getElementById("cart-items-list");

    // If not on cart page, exit safely
    if (!empty && !full && !list) return;

    // EMPTY STATE
    if (cartData.length === 0) {
      if (empty) empty.style.display = "block";
      if (full) full.style.display = "none";
      return;
    }

    // FULL STATE
    if (empty) empty.style.display = "none";
    if (full) full.style.display = "grid";

    // Render items
    if (list) {
      list.innerHTML = "";

      cartData.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
          <div>${item}</div>
          <button onclick="removeFromCart(${i})">Remove</button>
        `;

        list.appendChild(div);
      });
    }

  } catch (e) {
    console.error("Cart error:", e);

    // Fail-safe: always show empty state
    const empty = document.getElementById("cart-empty");
    const full = document.getElementById("cart-full");

    if (empty) empty.style.display = "block";
    if (full) full.style.display = "none";
  }
}

// REMOVE ITEM
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderCart();
});