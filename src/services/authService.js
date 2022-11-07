import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const {apiUrl} = config;
const apiEndpoint = apiUrl + '/auth';

export function login(username, password) {
    return http.post(apiEndpoint, {username, password});
}

export function getJwt() {
    return localStorage.getItem("token");
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem("token");
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}