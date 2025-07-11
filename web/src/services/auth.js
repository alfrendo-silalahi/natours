import axios from "../config/axios";

export async function login({ email, password }) {
  try {
    console.log({ email, password });
    const response = await axios.post("/api/v1/auth/login", {
      email,
      password,
    });
    console.log("login response", response);
    return response;
  } catch (error) {
    console.log("TERJADI ERROR KETIKA LOGIN");
    console.error(error.message);
    throw error;
  }
}
