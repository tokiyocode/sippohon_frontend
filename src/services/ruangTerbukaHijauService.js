import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/ruangTerbukaHijau";

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
        return http.put(`${apiEndpoint}/${rth._id}`, data, config.service);
    }

    return http.post(apiEndpoint, rth, config.service);
}

export function deleteRTH(id) {
    return http.delete(`${apiEndpoint}/${id}`);
}