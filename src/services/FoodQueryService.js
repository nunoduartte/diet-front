import axios from "axios";

export default {
  query(description){
    return axios.get("http://localhost:9000/food",{params:{description}});
  }
}