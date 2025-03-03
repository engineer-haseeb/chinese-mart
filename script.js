document.addEventListener("DOMContentLoaded", function() {
    alert("Welcome to Chinese Mart!");

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    let total = 0;

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            const product = this.parentElement;
            const productName = product.querySelector("h3").innerText;
            const productPrice = parseFloat(product.querySelector("p").innerText.replace("$", ""));
            
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${productName}</strong> - <span style='color: #ff4b2b;'>$${productPrice.toFixed(2)}</span>`;
            cartItems.appendChild(listItem);
            
            total += productPrice;
            cartTotal.innerHTML = `<strong>Total:</strong> <span style='color: #ff4b2b; font-size: 1.2em;'>$${total.toFixed(2)}</span>`;
        });
    });
});
