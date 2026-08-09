//Axios API
import axios from "axios";

const API = axios.create({
    baseURL: "https://patientcare-backend-ojcg.onrender.com/api"
});

export default API;