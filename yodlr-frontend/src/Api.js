import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const BASE_URL = "http://localhost:3001";

class YodlrApi {

  static async request(endpoint, data={}, method="get") {
    // console.debug("API call");
    const url = `${BASE_URL}/${endpoint}`;
    // const headers = token ? {Authorization: `Bearer ${token}`} : {};
    // if data arg is passed in, use it, if not, set it as empty object
    const params = (method === "get")
        ? data
        : {};
    try {
      console.debug("url, method, data, params", url, method, data, params);
      return (await axios({ url, method, data, params }));
    } catch (err) {
      console.error("API Error:", err);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  };

  static defaultToken(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  static clearToken() {
    delete axios.defaults.headers.common["Authorization"];
  }

  // individual API routes
  static async getUsers() {
    let res = await this.request(`users`);
    return res.data;
  };

  static async signup(data) {
    let res = await this.request(`users`, data, "post") ;
    return res.data.token;
  };
  
  static async getUser(id) {
    let res = await this.request(`users/${id}`);
    return res.data;
  };

  static async updateUser(id, data) {
    let res = await this.request(`users/${id}`, data, "put");
    return res.data;
  };

  static async deleteUser(id) {
    let res = await this.request(`users/${id}`, {}, "delete");
    return res;
  };

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.data.token;
  }

};

export default YodlrApi;