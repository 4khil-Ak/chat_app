import { useState, useContext } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Button, Typography, TextField } from "@mui/material";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";

const useStyles = makeStyles(() =>
  createStyles({
    login: {
      "& .MuiButtonBase-root": {
        color: "#fff",
        background: "#1ab188",
        "&:hover": {
          color: "#ffffff",
          background: "#179b77",
        },
      },
    },
    textField: {
      color: "#fff",
      width: "100%",
    },
    button: {
      padding: "0.4rem 1.5rem !important",
      border: "none !important",
      outline: "0 !important",
      borderRadius: "0 !important",
    },
  })
);

export const Login = () => {
  const context = useContext(UserContext)
  let navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    setFormValues((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const loginUser = () => {
    if (formValues.email === "" || formValues.password === "") {
      alert("Fill the required fields");
    } else {
      fetch(`http://localhost:8000/api/?user=user&method=login`, {
        method: "POST",
        body: JSON.stringify({
          email: formValues.email.toLowerCase(),
          password: formValues.password,
        }),
      }).then((response) => {
        response.text().then((_data) => {
          var data = JSON.parse(_data);
          if (data.error) {
            alert(data.message);
          } else {
            context.setUser(data.data);
            sessionStorage.setItem("chatID",data.data.fname);
            navigate(`/dashboard/${data.data.fname}`)
          }
          // setFormValues(initialState);
        });
      });
    }
  };
  const classes = useStyles();
  return (
    <div className={classes.login}>
      <Typography className="mb-5" variant="h4" style={{ color: "#fff" }}>
        Welcome Back
      </Typography>
      <TextField
        autoFocus={true}
        required={true}
        type="email"
        name="email"
        className={clsx(classes.textField)}
        onChange={onChangeHandler}
        placeholder="Email Address*"
        value={formValues.email}
      />
      <TextField
        required={true}
        type="password"
        name="password"
        className={clsx(classes.textField)}
        onChange={onChangeHandler}
        placeholder="Password*"
        value={formValues.password}
      />
      <Button onClick={loginUser} className={classes.button}>
        Log In
      </Button>
    </div>
  );
};
