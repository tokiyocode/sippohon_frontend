import http from "./httpService";
import config from "../config.json";

const {apiUrl} = config;
const apiEndpoint = apiUrl + "/ruangTerbukaHijau";

export function getAllRTH() {
    return http.get(apiEndpoint);
}

export function getRTH(id) {
    return http.get(`${apiEndpoint}/${id}`);
}

export function saveRTH(rth) {
    if (rth._id) {
        const data = {...rth};
        delete data._id;
        return http.put(`${apiEndpoint}/${rth._id}`, data);
    }

    return http.post(apiEndpoint, rth);
}

export function deleteRTH(id) {
    return http.delete(`${apiEndpoint}/${id}`);
}