const BASE_URL = "https://674987708680202966317792.mockapi.io/products";

const productList = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
  }
};



const createProduct = async (name, price, image) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, image }),
    });

    const data = await response.json();
    console.log("Solicitud POST exitosa:", data);
    return data;
  } catch (error) {
    console.error("Error en la solicitud POST:", error);
  }
};

const deleteProduct = async (id) => {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`Producto con id ${id} eliminado exitosamente`);
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
  }
};

export const conexionAPI = {
  productList,
  createProduct,
  deleteProduct,
};