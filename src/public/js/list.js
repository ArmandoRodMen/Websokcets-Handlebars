document.addEventListener("DOMContentLoaded", function () {
  const socketClient = io();
  const listContainer = document.getElementById("list");

  const addProductForm = document.getElementById("listForm");
  if (addProductForm) {
    addProductForm.onsubmit = (e) => {
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

  const renderProductList = (products) => {
    listContainer.innerHTML = "<h3>Lista de Productos Actualizada</h3>";
    products.forEach((product) => {
      const productElement = document.createElement("p");
      productElement.innerHTML = `${product.name}: $${product.price} <button class="delete-button" data-product-id="${product.id}">Eliminar</button>`;
      listContainer.appendChild(productElement);
    });
  };

  listContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("delete-button")) {
      const productId = target.dataset.productId;
      socketClient.emit("deleteProduct", productId);
    }
  });

  socketClient.on("updateProducts", renderProductList);

  socketClient.on("message", (data) => {
    const messageContainer = document.getElementById("message");
    messageContainer.innerHTML = `<h2>Nuevo Producto: ${data.name} - $${data.price}</h2>`;
  });
});
