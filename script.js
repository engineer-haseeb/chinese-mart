// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const products = [
    { id: 1, name: "Product 1", price: 100, stock: 10, image: "product1.jpg" },
    { id: 2, name: "Product 2", price: 150, stock: 5, image: "product2.jpg" },
    { id: 3, name: "Product 3", price: 200, stock: 8, image: "product3.jpg" }
];

const productContainer = document.querySelector(".product-list");
const cartItems = document.getElementById("cart-items");

let cart = [];

// Display Products
function displayProducts() {
    productContainer.innerHTML = "";
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product && product.stock > 0) {
        cart.push(product);
        product.stock--; 
        updateCart();
        displayProducts();
    } else {
        alert("Out of stock!");
    }
}

// Update Cart
function updateCart() {
    cartItems.innerHTML = "";
    cart.forEach((product, index) => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - $${product.price}`;
        cartItems.appendChild(li);
    });
}

// Checkout and Save Order to Firebase
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const orderRef = database.ref("orders").push();
    orderRef.set({
        items: cart.map(p => ({ name: p.name, price: p.price })),
        total: cart.reduce((sum, p) => sum + p.price, 0),
        timestamp: new Date().toISOString()
    });

    alert("Order placed successfully!");
    cart = [];
    updateCart();
    displayProducts();
});

// Initial Call
displayProducts();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFXrrB_nSwplw6dilpbmzSuhcYGfC-vC8",
  authDomain: "chinese-mart.firebaseapp.com",
  projectId: "chinese-mart",
  storageBucket: "chinese-mart.firebasestorage.app",
  messagingSenderId: "78393991073",
  appId: "1:78393991073:web:4e913086874da72fd275e0",
  measurementId: "G-3J1YDGBTZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
