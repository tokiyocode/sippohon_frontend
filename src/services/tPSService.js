import http from './httpService';
import config from '../config.json';

const {apiUrl} = config;
const apiEndpoint = apiUrl + '/tempatPembuanganSampah';

export function getAllTPS() {
    return http.get(apiEndpoint);
}

export function getTPS(id) {
    return http.get(`${apiEndpoint}/${id}`);
}

export function saveTPS(tps) {
    if (tps._id) {
        const data = {...tps};
        delete data._id;
        return http.put(`${apiEndpoint}/${tps._id}`, data);
    }

    return http.post(apiEndpoint, tps);
}

export function deleteTPS(id) {
    return http.delete(`${apiEndpoint}/${id}`);
}