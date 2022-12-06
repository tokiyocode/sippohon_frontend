import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiUrl + '/tempatPembuanganSampah';

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
        return http.put(`${apiEndpoint}/${tps._id}`, data, config.service);
    }

    return http.post(apiEndpoint, tps, config.service);
}

export function deleteTPS(id) {
    return http.delete(`${apiEndpoint}/${id}`);
}