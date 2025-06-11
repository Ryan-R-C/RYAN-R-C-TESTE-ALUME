import type { AxiosResponse } from "axios";

export interface LoginData {
    email: string;
    senha: string;
}

export interface RegisterData {
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
}

export interface ProfileData {
    nome: string;
    sobrenome: string;
    email: string;
}

export interface MeResponse extends AxiosResponse<ProfileData> {
}