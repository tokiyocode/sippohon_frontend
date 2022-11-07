import http from "./httpService";
import config from "../config.json";

const {apiUrl} = config;
const apiEndPoint = apiUrl + "/utils";

export function getNumOfDocuments() {
    return http.get(`${apiEndPoint}/numOfDocuments`);
}