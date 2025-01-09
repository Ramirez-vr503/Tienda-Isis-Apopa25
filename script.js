let cart = [];

// Datos de productos y sus variantes
const productVariants = {
  'arroz-diana': {
    name: 'Arroz Diana',
    variants: [
      { id: 1, name: 'Arroz Diana Precocido', price: 2.50, image: '/api/placeholder/60/60' },
      { id: 2, name: 'Arroz Diana Premium', price: 1.75, image: '/api/placeholder/60/60' },
      { id: 3, name: 'Arroz Diana Integral', price: 2.00, image: '/api/placeholder/60/60' }
    ]
  },
  'arroz-san-francisco': {
    name: 'Arroz San Francisco',
    variants: [
      { id: 4, name: 'Arroz San Francisco Regular', price: 1.25, image: '/api/placeholder/60/60' },
      { id: 5, name: 'Arroz San Francisco Premium', price: 1.50, image: '/api/placeholder/60/60' }
    ]
  },
  'azistin': {
    name: 'Azistín',
    variants: [
      { id: 6, name: 'Azistín Azul', price: 2.30, image: '/api/placeholder/60/60' },
      { id: 7, name: 'Azistín Verde', price: 2.30, image: '/api/placeholder/60/60' },
      { id: 8, name: 'Azistín Morado', price: 2.30, image: '/api/placeholder/60/60' }
    ]
  }
};

function showVariants(productId) {
  const modal = document.getElementById('variants-modal');
  const container = document.getElementById('variants-container');
  const product = productVariants[productId];
  
  document.getElementById('variant-title').textContent = `Variantes de ${product.name}`;
  
  container.innerHTML = product.variants.map(variant => `
    <div class="variant-item">
      <img src="${variant.image}" alt="${variant.name}">
      <div class="variant-info">
        <h4>${variant.name}</h4>
        <p>$${variant.price.toFixed(2)}</p>
      </div>
      <button class="add-to-cart-btn" onclick="addToCart('${variant.name}', ${variant.price})">
        Agregar
      </button>
    </div>
  `).join('');
  
  modal.style.display = 'block';
}

function closeVariants() {
  document.getElementById('variants-modal').style.display = 'none';
}

function addToCart(product, price) {
  cart.push({ product, price });
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;
  
  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.product}</span>
        <span>$${item.price.toFixed(2)}</span>
        <button onclick="removeFromCart(${index})">Eliminar</button>
      </div>
    `;
  });
  
  cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function sendToWhatsApp() {
  const storeName = document.getElementById("store-name").value.trim();
  const ownerName = document.getElementById("owner-name").value.trim();
  const zone = document.getElementById("zone").value;

  if (!storeName || !ownerName || cart.length === 0) {
    alert("Por favor completa todos los campos y agrega productos al carrito.");
    return;
  }

  let message = `Pedido de: ${storeName}\nDueño: ${ownerName}\nZona: ${zone}\n\nProductos:\n`;
  cart.forEach(item => {
    message += `- ${item.product}: $${item.price.toFixed(2)}\n`;
  });
  message += `\nTotal: $${document.getElementById("cart-total").textContent}`;

  const phone = "50371709876";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
  const modal = document.getElementById('variants-modal');
  if (event.target == modal) {
    closeVariants();
  }
}
