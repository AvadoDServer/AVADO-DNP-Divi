import axios from "axios";

const baseUrl = "http://divi.avadopackage.com/monitor"

const getEnv = () => {
    return axios.get(`${baseUrl}/getenv`);
}

const setEnv = (payload) => {
    return axios.post(`${baseUrl}/setenv`, payload);
}

const restartDivi = () => {
    return axios.post(`${baseUrl}/restartDivi`);
}

export default {
    getEnv,
    setEnv,
    restartDivi,
}
