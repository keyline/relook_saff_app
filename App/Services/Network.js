import axios from "axios";
import { getAccessToken } from "./AsyncStorage";
import { BASE_URL } from "./Constant";

export const Network = (method, endpoint, data = {}) => {

    return fetch = new Promise(async (resolve, reject) => {
        try {
            let accesstoken = await getAccessToken();
            let config = {
                method: method,
                url: `${BASE_URL}${endpoint}`,
                headers: {
                    "Accept": "multipart/form-data",
                    'Content-Type': 'application/json',
                    'Authorization': accesstoken
                },
                data: JSON.stringify(data)
            }
            if (__DEV__) {
                console.log('BaseUrl', BASE_URL);
                console.log('EndPoint ', endpoint);
                console.log('PayLoad ', JSON.stringify(data));
                console.log('accesstoken', accesstoken)
            }
            axios.request(config)
                .then((response) => {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        reject('Something Went Wrong');
                    }
                })
                .catch(error => {
                    reject(error)
                })
        } catch (error) {
            reject(error);
        }
    })
}