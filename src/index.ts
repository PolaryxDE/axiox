import axios, {AxiosInstance} from "axios";
import AxioxClient from "./AxioxClient";

function Axiox(client?: AxiosInstance): AxioxClient {
    client = client || axios;

    return new AxioxClient(client);
}

export default Axiox;
