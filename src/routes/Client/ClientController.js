import { API_SERVICES } from "../../services/ConfigServices";

var uuid = require("uuid");

export async function save(data = {}) {
  data.costumerId = uuid.v4();
  console.log("UUUWWWW", data);
  try {
    const response = await fetch(`${API_SERVICES}/v1/costumer`, {
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

export async function getCostumerList() {
  try {
    const response = await fetch(`${API_SERVICES}/v1/costumer`, {
      method: "GET",
    });
    const body = await response.json();
    return { status: response.status, body };
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getCostumerData(idCostumer = "") {
  try {
    const response = await fetch(`${API_SERVICES}/v1/costumer/${idCostumer}`, {
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
    const response = await fetch(`${API_SERVICES}/v1/costumer`, {
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

export async function deleteCostumer(idCostumer = "") {
  try {
    const response = await fetch(`${API_SERVICES}/v1/costumer/${idCostumer}`, {
      method: "DELETE",
    });
    return { status: response.status };
  } catch (error) {
    console.log("Error: ", error);
  }
}
