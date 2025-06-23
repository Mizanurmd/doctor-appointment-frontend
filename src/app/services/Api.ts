import axios from "axios";
import type { LoginUserDTO, OurUser, RegisterUserDTO } from "../../pages/interface/OurUser";

const BASE_URL = "http://localhost:8081/api/v1/auth";

const Api = {
     
  //======================== For Register API =======================
    registerUser: async (data: RegisterUserDTO): Promise<OurUser> => {
        const res = await axios.post(`${BASE_URL}/register`, data);
          localStorage.setItem('ourUser', JSON.stringify(res.data));
        return res.data.user;
    },

     //======================== For Login API =======================
   loginUser: async (data: LoginUserDTO): Promise<OurUser> => {
  const res = await axios.post(`${BASE_URL}/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("API response:", res.data);
  const user = res.data?.user || res.data;
  if(user){
 localStorage.setItem("ourUser", JSON.stringify(res.data));
  }
 

  return user;
}


}
export default Api;