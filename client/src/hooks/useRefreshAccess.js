import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import ROUTES from '../routes/routes';

// Function to check if the token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

// Function to renew the token
const renewToken = async () => {
  try {
    const response = await axios.post(`${ROUTES.BE}/auth/refresh`, {}, { withCredentials: true });
    
    if (response.status === 200) {
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      return accessToken;
    } else {
      throw new Error("Failed to renew token");
    }
  } catch (error) {
    console.error("Error renewing token:", error);
    return null;
  }
};

// Function to get the valid access token
const getAccessToken = async () => {
  let accessToken = localStorage.getItem("accessToken");

  if (isTokenExpired(accessToken)) {
    localStorage.removeItem("accessToken");
    accessToken = await renewToken();
  } 

  return accessToken;
};

export default getAccessToken;
