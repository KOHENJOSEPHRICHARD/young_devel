document.addEventListener('DOMContentLoaded', () => {
    // Load products dynamically
    fetchProducts();
    
    // Handle form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', handleFormSubmit);
});

function fetchProducts() {
    // Example products array
    const products = [
        { id: 1, name: 'Mutant T-Shirt', price: 19.99, image: 'images/tshirt.jpg' },
        { id: 2, name: 'Mutant Mug', price: 12.99, image: 'images/mug.jpg' },
        // Add more products as needed
    ];

    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button data-id="${product.id}" class="add-to-cart">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple form validation
    if (name && email && message) {
        alert('Thank you for your message!');
        document.getElementById('contact-form').reset();
    } else {
        alert('Please fill out all fields.');
    }
}

function addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    // Add product to cart (implementation in cart.js)
    addProductToCart(productId);
}
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addProductToCart(productId) {
    // Example products array
    const products = [
        { id: 1, name: 'Mutant T-Shirt', price: 19.99 },
        { id: 2, name: 'Mutant Mug', price: 12.99 },
        // Add more products as needed
    ];

    const product = products.find(p => p.id == productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }
}

function updateCartCount() {
    const cartCount = cart.length;
    document.getElementById('cart-count').textContent = cartCount;
}

function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear existing items

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Call this function to display cart items on page load
displayCartItems();
