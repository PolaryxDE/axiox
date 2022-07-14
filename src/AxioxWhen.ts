import AxioxResponse from "./AxioxResponse";

export default class AxioxWhen<D> {

    constructor(
        private readonly _owner: AxioxResponse<D>
    ) {}

    public status(status: number, then: (res: AxioxResponse<D>) => void): AxioxWhen<D> {
        return this.and(c => c.status(status), then);
    }

    public data(key: keyof D, data: any, then: (res: AxioxResponse<D>) => void): AxioxWhen<D> {
        return this.and(c => c.data(key, data), then);
    }

    public success(then: (res: AxioxResponse<D>) => void): AxioxWhen<D> {
        return this.and(c => c.success(), then);
    }

    public errored(then: (res: AxioxResponse<D>) => void): AxioxWhen<D> {
        return this.and(c => c.errored(), then);
    }

    public and(chaining: (chain: AxioxWhenAnd<D>) => void, then: (res: AxioxResponse<D>) => void): AxioxWhen<D> {
        const chain = new AxioxWhenAnd(this._owner);
        chaining(chain);

        if (chain.check()) {
            then(this._owner);
        }
        return this;
    }
}

class AxioxWhenAnd<D> {

    private readonly _checks: (() => boolean)[] = [];

    constructor(
        private readonly _owner: AxioxResponse<D>
    ) {}

    public status(status: number): AxioxWhenAnd<D> {
        this._checks.push(() => this._owner.status === status);
        return this;
    }

    public data(key: keyof D, data: any): AxioxWhenAnd<D> {
        this._checks.push(() => this._owner.data[key] === data);
        return this;
    }

    public success(): AxioxWhenAnd<D> {
        this._checks.push(() => this._owner.success);
        return this;
    }

    public errored(): AxioxWhenAnd<D> {
        this._checks.push(() => this._owner.errored);
        return this;
    }

    check(): boolean {
        return this._checks.every(check => check());
    }
}
