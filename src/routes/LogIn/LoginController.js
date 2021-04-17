import { API_SERVICES } from "../../services/ConfigServices";

export async function loginController(data = {}) {
  try {
    const response = await fetch(`${API_SERVICES}/v1/auth`, {
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
