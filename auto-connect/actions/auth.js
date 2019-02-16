import axios from "axios";

const URL = process.env["BACKEND_URI"];

import { AsyncStorage } from "react-native";

export const login = (name, email, profilePic) => {
  return dispatch => {
    axios({
      url: `${URL}login/user`,
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        name,
        email,
        profilePic
      }
    })
      .then(res => {
        AsyncStorage.setItem("token", res.data.token).then(x => {
          AsyncStorage.setItem("expiresIn", res.data.expiresIn.toString()).then(
            y => {
              dispatch({
                type: "USER_LOGIN",
                payload: {
                  name,
                  email,
                  profilePic
                }
              });
            }
          );
        });
      })
      .catch(err => {
        console.log("error");
      });
  };
};
