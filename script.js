import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// 🔥 Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFXrrB_nSwplw6dilpbmzSuhcYGfC-vC8",
    authDomain: "chinese-mart.firebaseapp.com",
    projectId: "chinese-mart",
    storageBucket: "chinese-mart.firebasestorage.app",
    messagingSenderId: "78393991073",
    appId: "1:78393991073:web:4e913086874da72fd275e0",
    measurementId: "G-3J1YDGBTZF"
};

// Firebase Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Firestore se Products Fetch Karna
async function fetchProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    let productsList = document.getElementById("products-list");
    productsList.innerHTML = ""; // Pehle list clear karein

    querySnapshot.forEach((doc) => {
        let product = doc.data();
        let productHTML = `
            <div class="product">
                <h3>${product.name}</h3>
                <img src="${product.image}" alt="${product.name}">
                <p>Price: $${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <button onclick="addToCart('${doc.id}', '${product.name}', ${product.price})">Add to Cart</button>
            </div>
        `;
        productsList.innerHTML += productHTML;
    });
}

// ✅ Cart System
let cart = [];

window.addToCart = function (id, name, price) {
    cart.push({ id, name, price });
    updateCartUI();
};

// ✅ Cart UI Update
function updateCartUI() {
    let cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";
    cart.forEach((item, index) => {
        cartDiv.innerHTML += `<div class="cart-item">${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Remove</button></div>`;
    });
}

// ✅ Remove from Cart
window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCartUI();
};

// ✅ Checkout Function (Save Cart to Firebase)
window.checkout = async function () {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    try {
        await addDoc(collection(db, "orders"), { cart, timestamp: new Date() });
        alert("Order Placed Successfully!");
        cart = [];
        updateCartUI();
    } catch (error) {
        console.error("Error placing order:", error);
    }
};

// Call function to fetch products
fetchProducts();
