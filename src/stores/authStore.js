import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: {},
    isLoggedIn: false,
    token: null,
    administrasi: null
  }),
  actions: {
    async register(data){
      try {
        const resp = await axios.post("/api/register", data);
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async login(data){
      try {
        const resp = await axios.post("/api/login", data);
        this.token = resp.data.data.token;
        this.token = resp.data.data.token;
        axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
        await this.me();
        await this.checkAdministrasiVerify();
        // await this.me();
        return resp;
      } catch (error) {
        throw error;
      }
    },

    async me () {
      try {
        const resp = await axios.get("/api/user");
        this.setUser(resp.data);
        return resp;
      } catch (error) {
        throw error;
      }
    },

    setUser(data){
      this.user = data;
      this.isLoggedIn = true;
    },

    refreshToken() {
      console.log("refreshing token");
      
      axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
    },
    async verifyEmail(data) {
      try {
        const resp = await axios.post("/api/verify-email", data);
        return resp;
      } catch (error) {
        throw error;
      }
    },
   
    async forgotPassword(data) {
      try {
        const resp = await axios.post("/api/forgot-password", data);
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async resetPassword(data) {
      try {
        const resp = await axios.post("/api/reset-password", data);
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async logout() {
      try {
        // await axios.post("/api/logout");
        this.token = null;
        axios.defaults.headers.common["Authorization"] = null;
        this.user = {};
        this.isLoggedIn = false;
        this.$reset();
        router.push("/login");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
    clearState() {
      this.token = null;
      axios.defaults.headers.common["Authorization"] = null;
      this.user = {};
      this.isLoggedIn = false;
      this.$reset();
      router.push("/");
    },
    async requestEmailVerify() {
      try {
        const resp = await axios.post("/api/email/request-verification");
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async emailVerify(token){
      localStorage.setItem("token", token);
      try {
        const resp = await axios.post("/api/email/verify", { token });
        this.setUser(resp.data.data);
        this.token = token;
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async updateProfile(user_id, data) {
      try {
        const resp = await axios.post("/api/users/"+ user_id, data);
        await this.me();
        return resp;
      } catch (error) {
        throw error;
      }
    },
  },
  persist: true,
});