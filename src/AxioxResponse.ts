import {AxiosResponse} from "axios";
import AxioxWhen from "./AxioxWhen";

export default class AxioxResponse<D> {

    constructor(
        private readonly _raw: AxiosResponse<D>,
        private readonly _errored: boolean = false
    ) {}

    public get success(): boolean {
        return !this._errored && this._raw.status >= 200 && this._raw.status < 300;
    }

    public get errored(): boolean {
        return this._errored;
    }

    public get status(): number {
        return this._raw.status;
    }

    public get raw(): AxiosResponse<D> {
        return this._raw;
    }

    public get data(): D {
        return this._raw.data;
    }

    public when(): AxioxWhen<D> {
        return new AxioxWhen<D>(this);
    }
}
