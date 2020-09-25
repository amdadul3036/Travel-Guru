import React, { useContext, useState } from 'react';
import './Login.css'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from '@material-ui/core';



const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [ loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        isSignedIn: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        error:'',
        success: ''
    });

    
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/"}};

    if(firebase.apps.length === 0){
      firebase.initializeApp(firebaseConfig);
    }


    // Sign in Google
    const googleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const {displayName, email} = res.user;

            const signedInUser = {
                isSignedIn: true,
                firstName: displayName,
                email: email,
                success: true
            }
            handleResponse(signedInUser, true);
          })
          .catch(error => {
            console.log(error);
            console.log(error.message);
          });

    }

    // Sign in Facebook
    const fbSignIn = () => {
      var fbProvider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(fbProvider)
      .then(res => {
          const {displayName, email} = res.user;
          const signedInUser = {
              isSignedIn: true,
              firstName: displayName,
              email: email,
              success: true
          }
          handleResponse(signedInUser, true);
        })
        .catch(error => {
          console.log(error);
          console.log(error.message);
        });

    }

    

    // Handle Blur function 
    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
          isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password' === e.target.value === 'confirmPassword'){
          const isPasswordValid = e.target.value.length >= 6;
          const passwordHasNumber = /\d{1}/.test(e.target.value);
          isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if(isFieldValid){
          const newUserInfo = {...user};
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo);
        }
    }
    
    // Handle submit function 
    const handleSubmit = (e) => {
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                  const newUserInfo = {...user};
                  newUserInfo.isSignedIn = true;
                  newUserInfo.error = '';
                  newUserInfo.success = true;
                  updateUserName(user.firstName);
                  handleResponse(newUserInfo, true);
                  
                })
                .catch(error => {
                    // Handle Errors here.
                    const newUserInfo = {};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    handleResponse(newUserInfo, false);
                    // ...
                });
              
        }
    

        // signIn With Email And Password
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
              const newUserInfo = {...user};
              newUserInfo.isSignedIn = true;
              newUserInfo.error = '';
              newUserInfo.success = true;
              handleResponse(newUserInfo, true);
            })
            .catch(error => {
                // Handle Errors here.
                const newUserInfo = {};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                handleResponse(newUserInfo, false);
                // ...
            });
        }
        e.preventDefault();
      }

    //   Update UserName function 
      const updateUserName = name => {
        const user = firebase.auth().currentUser;
    
        user.updateProfile({
          displayName: name
        }).then(function() {
          console.log('user name updated successfully');
        }).catch(function(error) {
          console.log(error);
        });
      }

    //   Handle response function 
      const handleResponse = (signedInUser, redirect) =>{
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        if(redirect){
            history.replace(from);
        }
      }

    return (
            <div className="container-fluid">
                <div className="container">
                    <div className="loginContainer bg"> 
                        <form onSubmit={handleSubmit} className="w-md-50 bg-white rounded p-5">
                            {newUser ?<h2 className="mb-3">Create an account</h2> : <h2 className="mb-3">Login</h2>}

                            {newUser && <input type="text" name="firstName" onBlur={handleBlur} className="form-control font-weight-bold bg-light" id="formGroupExampleInput" placeholder="First Name" required/>}
                            <br/>

                            {newUser && <input type="text" name="lastName" onBlur={handleBlur} className="form-control font-weight-bold bg-light" id="formGroupExampleInput" placeholder="Last Name" required/>}
                            <br/>

                            <input type="text" name="email" onBlur={handleBlur} className="form-control font-weight-bold bg-light" id="formGroupExampleInput" placeholder="Username or Email" required/>
                            <p className="text-muted">*give proper email address</p>

                            <input type="password" name="password" onBlur={handleBlur} className="form-control font-weight-bold bg-light" id="formGroupExampleInput" placeholder="Password" required/>
                            <p className="text-muted">*Password should have at least 6 letter and 1 number</p>

                            {newUser && <input type="password" name="confirmPassword" onBlur={handleBlur} className="form-control font-weight-bold bg-light" id="formGroupExampleInput" placeholder="Confirm Password" required/>}

                            {!newUser && <div className="d-flex">
                                <input type="checkbox" className="mt-1"/><label htmlFor="remember" className="mr-auto font-wight-bold">Remember Me</label>
                                <Link to="/" className="text-warning font-wight-bold">Forgot password</Link>
                            </div>}

                            <input type="submit" className="btn btn-warning w-100 p-2 mt-3" value={newUser ? 'Create an account': 'Login'} />
                        
                        </form>

                            {newUser 
                            ?<div className="d-flex p-2">
                                <p className="text-white">Already have an account?</p>
                                <Link onClick={() => setNewUser(!newUser)} to="/login" className="text-warning font-wight-bold ml-2">login</Link>
                            </div>
                            :<div className="d-flex p-2">
                                <p className="text-white">Don't have an account?</p>
                                <Link onClick={() => setNewUser(!newUser)} to="/" className="text-warning font-wight-bold ml-2">Create an account</Link>
                            </div>}

                            <p style={{color: 'red'}}>{user.error}</p>

                        <h4 className="text-center text-white">Or</h4>
                        <hr className="w-md-50 bg-white"/>
                        
                        <div className="w-md-50 rounded p-2">
                            <button onClick={googleSignIn} className="form-control font-weight-bold bg-light"><span><img src="https://iili.io/2xw5TQ.png" alt=""className="icon m-1"/></span>Continue with Google</button>
                        </div>

                        <div className="w-md-50 rounded p-2">
                            <button onClick={fbSignIn} className="form-control font-weight-bold bg-light"><span><img src="https://iili.io/2xjyBt.png" alt=""className="icon m-1"/></span>Continue with Facebook</button>
                        </div>

                    </div>
                </div>
            </div>
    );
};

export default Login;