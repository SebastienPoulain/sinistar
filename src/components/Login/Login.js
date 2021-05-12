import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const loginToApp = (e) => {
    e.preventDefault();

    if (!name) {
      setErrorName("Vous devez entrer votre nom complet");
    } else {
      setErrorName("");
    }

    if (!password) {
      setErrorPassword("Vous devez entrer un mot de passe");
    } else {
      setErrorPassword("");
    }

    validateEmail(email);

    if (name && password && validateEmail(email)) {
      dispatch(
        login({
          name: name,
        })
      );
    }
  };

  const validateEmail = (email) => {
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;

    const emailValidated = pattern.test(email);

    if (!emailValidated) {
      setErrorEmail("Vous devez entrer une adresse courriel valide");
      return false;
    } else {
      setErrorEmail("");
      return true;
    }
  };

  return (
    <div className="login">
      <svg xmlns="http://www.w3.org/2000/svg" width="156.259" height="30">
        <path d="M36.273 21.822s2.407 2.6 5.463 2.6c1.872 0 3.439-.535 3.439-1.643 0-1.185-.84-1.413-3.592-1.986-3.591-.764-6.723-2.292-6.723-5.73 0-2.826 2.827-5.654 7.793-5.654a11.558 11.558 0 0 1 6.8 2.216l-2.292 3.361a8.41 8.41 0 0 0-4.508-1.566c-1.719 0-3.285.611-3.285 1.719s1.223 1.376 4.278 2.025c3.591.764 6.151 1.948 6.151 5.692 0 3.094-3.285 5.577-7.907 5.577a11.291 11.291 0 0 1-8.175-3.285zM55.136 1.941a3.018 3.018 0 1 1-3.018 3.019 3 3 0 0 1 3.018-3.019zm-2.292 7.926h4.584v18.107h-4.584zM77.929 16.247v11.727h-4.584V17.393a3.342 3.342 0 0 0-3.591-3.706 4.466 4.466 0 0 0-3.591 2.33v11.957h-4.585V9.867h4.278v2.636a6.258 6.258 0 0 1 5.425-3.094 6.488 6.488 0 0 1 6.648 6.838zM84.228 1.941A3.018 3.018 0 1 1 81.21 4.96a3 3 0 0 1 3.018-3.019zm-2.292 7.926h4.585v18.107h-4.585zM91.768 21.822s2.407 2.6 5.463 2.6c1.871 0 3.438-.535 3.438-1.643 0-1.185-.841-1.413-3.591-1.986-3.592-.764-6.723-2.292-6.723-5.73 0-2.826 2.826-5.654 7.793-5.654a11.557 11.557 0 0 1 6.8 2.216l-2.292 3.361a8.409 8.409 0 0 0-4.507-1.566c-1.719 0-3.285.611-3.285 1.719s1.223 1.376 4.278 2.025c3.591.764 6.15 1.948 6.15 5.692 0 3.094-3.285 5.577-7.907 5.577a11.293 11.293 0 0 1-8.175-3.285zM106.554 9.867h3.552V4.481h4.581v5.386h5.463v4.126h-5.463v7.3c0 2.216 1.146 2.865 2.368 2.865a3.63 3.63 0 0 0 1.91-.65l1.681 3.744a8.251 8.251 0 0 1-4.355 1.184 6.062 6.062 0 0 1-6.189-6.417v-8.023h-3.552zM139.956 9.867v18.107h-4.24v-2.368a6.261 6.261 0 0 1-5.463 2.826c-4.7 0-8.824-3.934-8.824-9.512s4.126-9.512 8.824-9.512a6.487 6.487 0 0 1 5.463 2.827V9.866zm-4.585 6.341a5.067 5.067 0 0 0-4.278-2.521c-3.094 0-5 2.254-5 5.233s1.91 5.233 5 5.233a5.067 5.067 0 0 0 4.278-2.521zM156.258 9.982l-1.6 4.126a5.272 5.272 0 0 0-2.178-.42 4.787 4.787 0 0 0-4.049 2.445v11.842h-4.584V9.867h4.354v2.636a5.9 5.9 0 0 1 4.928-3.094 9.857 9.857 0 0 1 3.129.573z"></path>
        <g>
          <path
            d="M25.905 10.328 13.705.211a.915.915 0 0 0-1.167 0L.338 10.328a.915.915 0 0 0-.331.7V29.24a.739.739 0 0 0 .7.738 16.194 16.194 0 0 0 12.418-4.83l-2.457-3.679-2.126-3.185a5.511 5.511 0 1 1 9.166 0l-3.506 5.251-1.078 1.614a16.194 16.194 0 0 0 12.418 4.83.739.739 0 0 0 .7-.738v-18.21a.913.913 0 0 0-.337-.703z"
            fill="#edcc1f"
          ></path>
        </g>
      </svg>
      <form>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Nom Complet"
          type="text"
        />
        {errorName && <span className="login__error">{errorName}</span>}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Courriel"
        />
        {errorEmail && <span className="login__error">{errorEmail}</span>}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          type="Password"
        />
        {errorPassword && <span className="login__error">{errorPassword}</span>}
        <button onClick={loginToApp} type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
