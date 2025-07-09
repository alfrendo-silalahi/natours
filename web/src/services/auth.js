import axios from "../config/axios";

export async function login({ email, password }) {
  try {
    const response = await axios.post("/api/v1/auth/login", {
      email,
      password,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
