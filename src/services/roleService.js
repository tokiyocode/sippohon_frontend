import http from "./httpService";
import config from "../config.json";

const {apiUrl} = config;
const apiEndpoint = apiUrl + "/roles";

export function getRoles() {
    return http.get(apiEndpoint);
}