// Manejo del evento de envío del formulario
form.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;
  
    if (name === "" || price === "" || image === "") {
      alert("Por favor, complete todos los campos");
    } else {
      try {
        const newProduct = await servicesProducts.createProduct(
          name,
          price,
          image
        );
        console.log("Producto creado:", newProduct);
        const newCard = createCard(newProduct);
        productsContainer.appendChild(newCard);
      } catch (error) {
        console.error("Error al crear el producto:", error);
      }
  
      form.reset(); // Reinicia el formulario
    }
  });
  
  // Ejecuta la función de renderizado inicial
  renderProducts();