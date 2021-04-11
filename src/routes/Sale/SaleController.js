import { API_SERVICES } from "../../services/ConfigServices";

var uuid = require("uuid");

export async function save(data = {}) {
  data.saleId = uuid.v4();
  try {
    const response = await fetch(`${API_SERVICES}/v1/sale`, {
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

export async function getProductsAvailableToOffer() {
  try {
    const response = await fetch(`${API_SERVICES}/v1/sale/products`, {
      method: "GET",
    });
    const body = await response.json();

    return { status: response.status, body };
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getAgentList() {
  try {
    const response = await fetch(`${API_SERVICES}/v1/sale/agents`, {
      method: "GET",
    });
    const body = await response.json();
    const viewResponse = formatAgentListForSelectList(body);

    return { status: response.status, viewResponse };
  } catch (error) {
    console.log("Error: ", error);
  }
}

const formatAgentListForSelectList = (data = []) =>
  data.map((item) => ({
    value: item.userId,
    name: item.agentName,
    tag: item.agentName,
  }));

export async function getAllSalesList() {
  try {
    const response = await fetch(`${API_SERVICES}/v1/sale`, {
      method: "GET",
    });
    const body = await response.json();
    const responseView = formatDataReceived(body);
    return { status: response.status, responseView };
  } catch (error) {
    console.log("Error: ", error);
  }
}

const formatDataReceived = (data = []) =>
  data.map((item) => {
    item.offerDate = item.offerDate.substring(0, 10);
    item.saleDate = item.saleDate.substring(0, 10);
    return item;
  });
