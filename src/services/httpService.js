import axios from 'axios';
import {getJwt} from "./authService";

axios.defaults.headers.common["x-auth-token"] = getJwt();

export default {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete
}