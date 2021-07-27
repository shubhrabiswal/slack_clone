import React from 'react'
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import firebase from 'firebase'
import { auth, provider } from "./firebase.js";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { GoogleLogin } from 'react-google-login';
// import Icon from './icon';
const useStyles = () => { }

const Login = () => {
    const classes = useStyles();
    const [state, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result
                })
        }
        const googleSuccess = async (res) => {
            // window.alert("Login Successful")
            console.log("res", res)
            console.log(res.profileObj)
            const result = res?.profileObj;
            console.log("result", result)
            const token = res?.tokenId;
            // console.log("token",token)

            try {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result,
                    // data: { result, token } 
                })
                // history.push("/");
            } catch (error) {
                console.log(error);
            }

        }

        const googleFailure = (err) => {
            console.log(err)
            console.log("Google Sign in was unsuccessful")
        }
        const responseGoogle = (response) => {
            console.log(response);
        }
        console.log("lsjfljlhfhlhsl")

        return (
            <div>
                <div className="login" >

                    <h1>Sign in Slack</h1>
                    <p>signin.slack.com</p>
                    {/* <Button onClick={signIn}>Sign in with Google</Button> */}
                    <h1>Sign in</h1>
                    <p>sign.slack.com</p>
                    {/* <Button onClick={signIn}>Sign in with Google</Button> */}
                    <GoogleLogin
                        clientId="162754271125-fd79e2688vimj32jdj1ah2v03vk279jc.apps.googleusercontent.com"
                        render={renderProps => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                SignIn</button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />

                </div>
            </div >
        )
}


export default Login;