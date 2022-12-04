import http from "./httpService";
import config from "../config.json";

const {apiUrl} = config;
const apiEndpoint = apiUrl + "/users";

export function getUsers() {
    return http.get(apiEndpoint);
}

export function getUser(id) {
    return http.get(`${apiEndpoint}/${id}`);
}

export function saveUser(user) {
    if (user._id) {
        const data = {...user};
        delete data._id;
        return http.put(`${apiEndpoint}/${user._id}`, data);
    }

    return http.post(apiEndpoint, user);
}

export function deleteUser(id) {
    return http.delete(`${apiEndpoint}/${id}`);
} 