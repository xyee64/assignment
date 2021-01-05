import axios from "axios";
import authHeader from './auth-header';
const API_URL = "http://localhost:8080/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(details) {
    return axios.post(API_URL + "register", details, { headers: authHeader() });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  forgot(email){
    let formData = new FormData()
    formData.append("email",email)
    return axios.post("http://localhost:8080/forgot_password", formData)
  }

  changePass(username,password){
    let formData = new FormData()
    formData.append("username",username)
    formData.append("password",password)
    return axios.post("http://localhost:8080/change_password", formData, { headers: authHeader()})
  }
}

export default new AuthService();
