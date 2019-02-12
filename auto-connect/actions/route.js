import axios from "axios";

const URL = process.env["BACKEND_URI"];

import { AsyncStorage } from "react-native";

import Polyline from "@mapbox/polyline";

const API_KEY = "AIzaSyCvEFK1EMeKuwvshOn8NAS214I2WzrEPgc";


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

                    const route = res.data;

                    axios.get(
                    `https://maps.googleapis.com/maps/api/directions/json?origin=${route[0].lat},${route[0].long}&destination=${route[1].lat},${route[1].long}&mode=walking&key=${API_KEY}`
                    )
                    .then(result => result.data)
                    .then(result => {
                        let array = Polyline.decode(result.routes[0].overview_polyline.points);
                        let coordinates = array.map((point) => {
                                return  {
                                    latitude :point[0],
                                    longitude :point[1]
                                }
                            })

                        dispatch({
                            type: "FETCH_ROUTE",
                            payload: {
                                route,
                                polyline: coordinates
                            }
                        });

                    }).catch(er => {
                        console.log(er.message);
                    });
                })
                .catch( err => {
                    console.log("error", err);
                });
            })
    }
} 
