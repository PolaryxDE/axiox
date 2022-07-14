import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import AxioxResponse from "./AxioxResponse";

type Method = "request" | "get" | "delete" | "head" | "options" | "post" | "put" | "patch" | "postForm" | "putForm" | "patchForm";

export default class AxioxClient {

    constructor (
        private readonly client: AxiosInstance
    ) {}

    public get interceptors() {
        return this.client.interceptors;
    }

    public getUri(config?: AxiosRequestConfig): string {
        return this.client.getUri(config);
    }

    public request<T = any>(config: AxiosRequestConfig): Promise<AxioxResponse<T>> {
        return new Promise<AxioxResponse<T>>((resolve, reject) => {
            this.client.request(config).then((response: AxiosResponse<T>) => {
                resolve(new AxioxResponse<T>(response));
            }).catch((error: Error|AxiosError<T>) => {
                if (axios.isAxiosError(error) && error.response) {
                    resolve(new AxioxResponse<T>(error.response, true));
                } else {
                    reject(error);
                }
            });
        });
    }

    public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxioxResponse<T>> {
        return this.callAxiosWithoutBody<T>("get", url, config);
    }

    public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxioxResponse<T>> {
        return this.callAxiosWithoutBody<T>("delete", url, config);
    }

    public head<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxioxResponse<T>> {
        return this.callAxiosWithoutBody<T>("head", url, config);
    }

    public options<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxioxResponse<T>> {
        return this.callAxiosWithoutBody<T>("options", url, config);
    }

    public post<T = any>(url: string, body?: any, config?: AxiosRequestConfig): Promise<AxioxResponse<T>> {
        return this.callAxiosWithBody<T>("post", url, body, config);
    }

    public put<T = any>(url: string, body?: any, config?: AxiosRequestConfig): Promise<AxioxResponse<T>> {
        return this.callAxiosWithBody<T>("put", url, body, config);
    }

    public patch<T = any>(url: string, body?: any, config?: AxiosRequestConfig): Promise<AxioxResponse<T>> {
        return this.callAxiosWithBody<T>("patch", url, body, config);
    }

    public postForm<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxioxResponse<T>> {
        return this.callAxiosWithBody<T>("postForm", url, data, config);
    }

    public putForm<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxioxResponse<T>> {
        return this.callAxiosWithBody<T>("putForm", url, data, config);
    }

    public patchForm<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxioxResponse<T>> {
        return this.callAxiosWithBody<T>("patchForm", url, data, config);
    }

    private callAxiosWithBody<T = any>(method: Method, url: string, body?: any, config?: AxiosRequestConfig): Promise<AxioxResponse<T>> {
        return new Promise<AxioxResponse<T>>((resolve, reject) => {
            this.client[method](url, body, config).then((response: AxiosResponse<T>) => {
                resolve(new AxioxResponse<T>(response));
            }).catch((error: Error|AxiosError<T>) => {
                if (axios.isAxiosError(error) && error.response) {
                    resolve(new AxioxResponse<T>(error.response, true));
                } else {
                    reject(error);
                }
            });
        });
    }

    private callAxiosWithoutBody<T = any>(method: Method, url: string, config?: AxiosRequestConfig): Promise<AxioxResponse<T>> {
        return new Promise<AxioxResponse<T>>((resolve, reject) => {
            this.client[method](url, config).then((response: AxiosResponse<T>) => {
                resolve(new AxioxResponse<T>(response));
            }).catch((error: Error|AxiosError<T>) => {
                if (axios.isAxiosError(error) && error.response) {
                    resolve(new AxioxResponse<T>(error.response, true));
                } else {
                    reject(error);
                }
            });
        });
    }
}
