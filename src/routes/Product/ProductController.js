import { API_SERVICES } from "../../services/ConfigServices";

var uuid = require("uuid");

export async function save(data = {}) {
  data.idProduct = uuid.v4();
  try {
    const response = await fetch(`${API_SERVICES}/v1/product`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    return { status: response.status, body };
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getProductTypeList() {
  try {
    const response = await fetch(`${API_SERVICES}/v1/product/types`, {
      method: "GET",
    });
    const body = await response.json();
    const viewResponse = formatForSelectList(body);

    return { status: response.status, viewResponse };
  } catch (error) {
    console.log("Error: ", error);
  }
}

const formatForSelectList = (data = []) =>
  data.map((item) => ({
    value: item.idProductType,
    name: item.description,
    tag: item.description,
  }));

export async function getProductList() {
  try {
    const response = await fetch(`${API_SERVICES}/v1/product`, {
      method: "GET",
    });
    const body = await response.json();
    return { status: response.status, body };
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getProductData(idProduct = "") {
  try {
    const response = await fetch(`${API_SERVICES}/v1/product/${idProduct}`, {
      method: "GET",
    });
    const body = await response.json();
    return { status: response.status, body };
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function update(data = {}) {
  try {
    const response = await fetch(`${API_SERVICES}/v1/product`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    return { status: response.status, body };
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function deleteProduct(idProduct = "") {
  try {
    const response = await fetch(`${API_SERVICES}/v1/product/${idProduct}`, {
      method: "DELETE",
    });
    return { status: response.status };
  } catch (error) {
    console.log("Error: ", error);
  }
}
