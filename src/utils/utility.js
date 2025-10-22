import axios from "axios";

export const setStateFromAPIResponse = async function (api, setter) {
    if (api && setter) {
        const response = await axios.get(api);
        console.log(api, " => ", response.data);
        const data = response.data;
        
        if (data) {
            setter(data);
        }
    }
}

