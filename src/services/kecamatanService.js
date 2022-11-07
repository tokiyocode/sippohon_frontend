import http from "./httpService";
import config from "../config.json";

const {apiUrl} = config;
const apiEndPoint = apiUrl + "/kecamatan";

export function getAllKecamatan() {
    return http.get(apiEndPoint);
}