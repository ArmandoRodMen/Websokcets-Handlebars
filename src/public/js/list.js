document.addEventListener("DOMContentLoaded", function () {
  const socketClient = io();

  const form = document.getElementById("listForm");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();

      const newProduct = {
        name: document.getElementById("productName").value,
        price: document.getElementById("productPrice").value,
      };

      socketClient.emit("message", newProduct);
    };
  }

  const realTimeForm = document.getElementById("realTimeListForm");
  if (realTimeForm) {
    realTimeForm.onsubmit = (e) => {
      e.preventDefault();

      const newRealTimeProduct = {
        name: document.getElementById("realTimeProductName").value,
        price: document.getElementById("realTimeProductPrice").value,
      };

      socketClient.emit("message", newRealTimeProduct);
    };
  }

  socketClient.on("updateProducts", (updatedProductList) => {
    const listContainer = document.getElementById("list");

    listContainer.innerHTML = "<h3>Updated Product List</h3>";
    updatedProductList.forEach((product) => {
      listContainer.innerHTML += `<p>${product.name}: $${product.price} <button class="delete-button" data-product-id="${product.id}">Delete</button></p>`;
    });

    listContainer.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("delete-button")) {
        const productId = target.dataset.productId;
        socketClient.emit("deleteProduct", productId);
      }
    });
  });

  socketClient.on("message", (data) => {
    const messageContainer = document.getElementById("message");
    messageContainer.innerHTML = `<h2>New Product: ${data.name} - $${data.price}</h2>`;
  });
});
