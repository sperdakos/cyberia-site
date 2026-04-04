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

// LOAD CART PAGE
function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div>${item}</div>
      <button onclick="removeFromCart(${i})">Remove</button>
    `;
    container.appendChild(div);
  });
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