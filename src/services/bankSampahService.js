import http from "./httpService";
import config from "../config.json";

const {apiUrl} = config;
const apiEndPoint = apiUrl + '/bankSampah';

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
        return http.put(`${apiEndPoint}/${bankSampah._id}`, data);
    }

    return http.post(apiEndPoint, bankSampah);
}

export function deleteBankSampah(id) {
    return http.delete(`${apiEndPoint}/${id}`);
}