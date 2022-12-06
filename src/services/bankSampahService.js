import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + '/bankSampah';

export function getAllBankSampah() {
    return http.get(apiEndPoint);
}

export function getBankSampah(id) {
    return http.get(`${apiEndPoint}/${id}`);
}

export function saveBankSampah(bankSampah) {
    if (bankSampah._id) {
        const data = {...bankSampah};
        delete data._id;
        return http.put(`${apiEndPoint}/${bankSampah._id}`, data, config.service);
    }

    return http.post(apiEndPoint, bankSampah, config.service);
}

export function deleteBankSampah(id) {
    return http.delete(`${apiEndPoint}/${id}`);
}