import http from "./httpService";
import config from "../config.json";

const {apiUrl} = config;

const apiEndpoint = apiUrl + "/pohon";

export function getAllPohon() {
    return http.get(apiEndpoint);
}

export function getPohon(id) {
    return http.get(`${apiEndpoint}/${id}`);
}

export function savePohon(pohon) {
    if (pohon._id) {
        const body = {...pohon};
        delete body._id;
        return http.put(`${apiEndpoint}/${pohon._id}`, body);
    }

    return http.post(apiEndpoint, pohon);
}

export function deletePohon(id) {
    return http.delete(`${apiEndpoint}/${id}`)
}