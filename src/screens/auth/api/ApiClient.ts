import axios from "axios";

// Android emulator uses 10.0.2.2 to reach host machine
const ApiClient = axios.create({
   baseURL: "http://10.0.2.2:5000",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export default ApiClient; 
