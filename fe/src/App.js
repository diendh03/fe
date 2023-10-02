import logo from "./logo.svg";
import "./App.css";
import OAuth2Login from "react-simple-oauth2-login";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import GoogleLogin from "@quochung205/react-google-login";
import axios from "axios";
function App() {
  const onSuccessFB = async (res) => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get("data");
    console.log(data);
    // await axios({
    //   method: "post",
    //   url: "http://localhost:8081/api/auth/facebook",
    //   data: {
    //     access_token: res.access_token,
    //   },
    // });
  };
  const onFail = (res) => {
    console.log(res);
  };
  const onSuccessGG = async (res) => {
    console.log(res);
    // await axios({
    //   method: "post",
    //   url: "http://localhost:8080/api/auth/google",
    //   data: {
    //     access_token: res.credential,
    //   },
    // });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <OAuth2Login
          buttonText="Defix"
          authorizationUrl="http://localhost:8080/oauth"
          clientId="983822582705404"
          redirectUri="http://localhost:3000/"
          onSuccess={onSuccessFB}
          onFailure={onFail}
        />
        <GoogleOAuthProvider clientId="932607064448-r47hhh1v1q9ks1iqqc2r5djgtn0pf58h.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={onSuccessGG}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </header>
    </div>
  );
}

export default App;
