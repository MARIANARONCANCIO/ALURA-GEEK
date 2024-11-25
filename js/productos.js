import { conexionAPI } from "./conexionAPI.js";

const productsContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

if (productsContainer && form) {
  function createCard({ name, price, image, id }) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card">
        <img src="${image}" alt="${name}">
      </div>
      <div class="card-container--info">
        <p>${name}</p>
        <div class="card-container--value">
          <p>$ ${price}</p>
          <button class="delete-button" data-id="${id}">
            <img src="./Imagenes/BASURA.png" alt="Eliminar">
          </button>
        </div>
      </div>
    `;

    // Asigna el evento de eliminación
    addDeleteEvent(card, id);

    return card;
  }
  

  // CREAR CARD
  function addDeleteEvent(card, id) {
    const deleteButton = card.querySelector(".delete-button");
    if (deleteButton) {
      deleteButton.addEventListener("click", async () => {
        try {
          await conexionAPI.deleteProduct(id);
          card.remove();
          console.log(`Producto con id ${id} eliminado`);
        } catch (error) {
          console.error(`Error al eliminar el producto con id ${id}:`, error);
        }
      });
    } else {
      console.error("Error: El botón de eliminación no se encontró en la tarjeta.");
    }
  }

  // PRODUCTOS
  const renderProducts = async () => {
    try {
      const listProducts = await conexionAPI.productList();
      listProducts.forEach((product) => {
        const productCard = createCard(product);
        productsContainer.appendChild(productCard);
      });
    } catch (err) {
      console.error("Error al renderizar productos:", err);
    }
  };

  

  // FORMULARIO
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    if (name === "" || price === "" || image === "") {
      alert("Por favor, complete todos los campos");
    } else {
      try {
        const newProduct = await conexionAPI.createProduct(name, price, image);
        console.log("Producto creado:", newProduct);
        const newCard = createCard(newProduct);
        productsContainer.appendChild(newCard);
      } catch (error) {
        console.error("Error al crear el producto:", error);
      }

      form.reset(); // Reinicia el formulario
    }
  });

  // EJECUTA FUNCION INICIAL
  document.addEventListener("DOMContentLoaded", renderProducts);
} else {
  console.error("Error: El contenedor de productos o el formulario no se encontraron.");
}
