import React, { useEffect } from "react";
import Login from "./components/Login/Login";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./App.css";
import GoogleMaps from "./components/GoogleMaps/GoogleMaps";

function App() {
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      document.body.classList.add("body__map");
      document.body.classList.remove("body__login");
    } else {
      document.body.classList.add("body__login");
      document.body.classList.remove("body__map");
    }
  }, [user]);
  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <div>
          <h1>Bienvenue {user?.name}</h1>
          <GoogleMaps />
        </div>
      )}
    </div>
  );
}

export default App;
