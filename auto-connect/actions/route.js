import axios from "axios";

const URL = process.env["BACKEND_URI"];

import { AsyncStorage } from "react-native";

export const fetchRoute = (from, to) => {

    return dispatch => {

        AsyncStorage.getItem("token")
            .then( token => {
                axios({
                    url: `${URL}route`,
                    method:'post',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    data:{
                        from,
                        to
                    }
                })
                .then( res => {

                    console.log(res.data);

                    dispatch({
                        type: "FETCH_ROUTE",
                        payload: res.data
                    })
                })
                .catch( err => {
                    console.log("error", err);
                });
            })
    }
} 
