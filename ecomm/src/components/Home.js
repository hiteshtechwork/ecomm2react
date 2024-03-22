import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Product from "./Product";
import AllProducts from "./AllProducts";

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState(0); // role: 0-user, 1-developer , 2-admin

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
          console.log(res.data);
        } else {
          alert("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:5000").then((res) => {
      // console.log(res);
      if (res.data.Status === "Success") {
        setAuth(true);
        setName(res.data.name);
        setRole(res.data.role);
      } else {
        setAuth(false);
        navigate("/login");
        // alert(setMessage(res.data.Message));
      }
    });
  }, []);

  return (
    <>
      <div>
        <h2>Loged In user : {name}</h2>
        <button className="float-right" onClick={handleLogout}>
          logout
        </button>
      </div>
      <hr />
      <div className="d-flex ">
        <div>
          {console.log(role)}

          {role === 0 ? <Product /> : ""}

          {role === 1 ? <AllProducts /> : ""}

          {role === 2 ? (
            <>
              <Product /> <AllProducts />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
