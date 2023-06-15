import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import FacebookIcon from "@mui/icons-material/Facebook";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import icon from "./img/defaulticon.webp";
import { countries } from "./Countries";

const useStyles = makeStyles((theme) => ({
  BtnFacebook: {
    width: "180px",
    height: "40px",
    borderRadius: "4px",
    background: "#3b5998",
    color: "white",
    border: "0px transparent",
    textAlign: "center",
    margin: "5px",
    fontSize: "0px",
    display: "inline-block",
    cursor: "pointer",

    "&:hover": {
      // transform: "scale(1.1)",
      // background: "#3b5998",
      // opacity: "0.6",
    },
  },
}));

// background: #3b5998;
// opacity: 0.6;

const BtnGoogle = styled.button`
  margin: 5px;
  width: 180px;
  height: 40px;
  border-radius: 4px;
  font-size: 15px;
  background: #db3236;
  color: white;
  border: 0px transparent;
  text-align: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export default function LoginButtons() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const classes = useStyles();
  // var [password, setPassword] = useState("");
  var [image, setImage] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [email, setEmail] = useState(null);
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [accesstoken, setAccesToken] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(country);
    alert("Hello");

    if (
      email === null ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      country === null
    ) {
      setError("Email or Country is incorrect!");
    } else {
      var config = {
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL + "/loginfacebook",
        data: {
          username: name,
          password: password,
          accesstoken: accesstoken,
          country: country,
          email: email,
          image: image,
          isexternalaccount: true,
          externalid: password,
        },
      };

      axios(config).then(function (res) {
        if (res.status === 200 && res.data.token) {
          console.log(res.data);
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("userid", JSON.stringify(res.data.id));
          localStorage.setItem("username", JSON.stringify(res.data.username));
          if ("redirectTo" in localStorage) {
            window.location = JSON.parse(localStorage.getItem("redirectTo"));
          } else {
            window.location = "/";
          }
        }
      });

      // Perform any necessary actions with email and country states

      // Close the prompt
      setIsPromptOpen(false);
    }
  };

  const responseFacebook = (response) => {
    var config = { url: response.picture.data.url, method: "get" };
    axios(config).then((res) => {
      if (res.status === 200) {
        setImage(res.data);
      } else {
        setImage(icon);
      }
    });
    if (response && response.name !== undefined && response.id !== undefined) {
      setName(response.name);
      setAccesToken(response.accessToken);
      setPassword(response.id);

      setIsPromptOpen(true);
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
    if (response !== undefined) console.log(response);
  };

  return (
    <>
      <Typography>Or Login using Social Media</Typography>
      <Grid
        align="center"
        container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "safe center",
          paddingTop: 5,
        }}
      >
        <Grid item>
          <FacebookLogin
            autoLoad={false}
            appId="416836892116617"
            fields="name,email,picture"
            scope="public_profile,user_friends"
            callback={responseFacebook}
            // cssClass={classes.BtnFacebook}
            // icon={FacebookIcon}
            render={(renderProps) => (
              <FacebookIcon
                onClick={renderProps.onClick}
                style={{
                  fontSize: "50",
                  color: "blue",
                  cursor: "pointer",
                  paddingTop: 5,
                }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <GoogleOAuthProvider clientId="1022277434989-epcqu1cf2ldd355p4gi2shf7v3ailpml.apps.googleusercontent.com">
            <GoogleLogin
              type="icon"
              onSuccess={(credentialResponse) => {
                var config = {
                  method: "post",
                  url: process.env.REACT_APP_API_BASE_URL + "/logingoogle",
                  data: { token: credentialResponse.credential },
                };

                axios(config).then(function (res) {
                  console.log(res);
                  if (res.status === 200 && res.data.token) {
                    console.log(res.data);
                    localStorage.setItem(
                      "token",
                      JSON.stringify(res.data.token)
                    );
                    localStorage.setItem("userid", JSON.stringify(res.data.id));
                    localStorage.setItem(
                      "username",
                      JSON.stringify(res.data.username)
                    );
                    window.location = "/";
                  }
                });
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              scope={"email,name"}
            />
          </GoogleOAuthProvider>
        </Grid>
      </Grid>
      <div
        className={`${
          isPromptOpen ? "fixed inset-0 bg-gray-800 bg-opacity-75" : "hidden"
        }`}
      >
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white dark:bg-gray-800 rounded p-8">
            <h2 className="text-2xl font-bold mb-4">Complete Registration</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block dark:text-gray-200 text-left"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  for="small"
                  class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Country
                </label>
                <select
                  id="small"
                  class="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    setCountry(
                      e.target.value !== "Choose a country"
                        ? e.target.value
                        : ""
                    );
                  }}
                >
                  <option selected>Choose a country</option>
                  {countries.map((count) => (
                    <option value={count.label}>{count.label}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
            <p className="text-red-600 text-center text-lg">{error}</p>
          </div>
        </div>
      </div>
    </>
  );
}
