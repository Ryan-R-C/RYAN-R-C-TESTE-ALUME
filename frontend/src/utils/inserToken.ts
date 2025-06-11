import api from "../services/api";

export const inserToken = (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}