import { API_SERVICES } from "../../services/ConfigServices";

var uuid = require("uuid");

export async function save(data = {}) {
  data.offerId = uuid.v4();
  try {
    const response = await fetch(`${API_SERVICES}/v1/offer`, {
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

export async function getProductList() {
  try {
    const response = await fetch(`${API_SERVICES}/v1/offer/products`, {
      method: "GET",
    });
    const body = await response.json();
    const viewResponse = formatProductListForSelectList(body);

    return { status: response.status, viewResponse };
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getCostumerList() {
  try {
    const response = await fetch(`${API_SERVICES}/v1/offer/costumers`, {
      method: "GET",
    });
    const body = await response.json();
    const viewResponse = formatCostumerListForSelectList(body);

    return { status: response.status, viewResponse };
  } catch (error) {
    console.log("Error: ", error);
  }
}

const formatProductListForSelectList = (data = []) =>
  data.map((item) => ({
    value: item.productId,
    name: item.codeFolio,
    tag: item.codeFolio,
  }));

const formatCostumerListForSelectList = (data = []) =>
  data.map((item) => ({
    value: item.costumerId,
    name: item.name,
    tag: item.name,
  }));

export async function getAllProductList() {
  try {
    const response = await fetch(`${API_SERVICES}/v1/offer`, {
      method: "GET",
    });
    const body = await response.json();
    return { status: response.status, body };
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getOfferData(offerId = "") {
  try {
    const response = await fetch(`${API_SERVICES}/v1/offer/${offerId}`, {
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
    const response = await fetch(`${API_SERVICES}/v1/offer`, {
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
