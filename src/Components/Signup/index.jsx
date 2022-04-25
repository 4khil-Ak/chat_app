import { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Button, Typography, TextField } from "@mui/material";
import clsx from "clsx";
import { Navigate } from "react-router-dom";
const useStyles = makeStyles(() =>
  createStyles({
    signup: {
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

export const Signup = (props) => {
  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialState);
  const onChangeHandler = (e) => {
    setFormValues((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const createUser = () => {
    if (
      formValues.email === "" ||
      formValues.first_name === "" ||
      formValues.last_name === "" ||
      formValues.password === ""
    ) {
      alert("Fill the required fields");
    } else {
      fetch(`http://localhost:8000/api/?user=user&method=signup`, {
        method: "POST",
        body: JSON.stringify({
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          email: formValues.email.toLowerCase(),
          password: formValues.password,
        }),
      }).then((response) => {
        response.text().then((_data) => {
          var data = JSON.parse(_data);
          if (data.error) {
            alert(data.message);
          } else {
            alert(data.message);
            setFormValues(initialState);
            props.onClickHandler();
          }
        });
      });
    }
  };
  const classes = useStyles();
  return (
    <div className={classes.signup}>
      <Typography className="mb-5" variant="h4" style={{ color: "#fff" }}>
        Sign Up for Free
      </Typography>
      <div className="row m-0 justify-content-between">
        <TextField
          autoFocus={true}
          required={true}
          type="text"
          name="first_name"
          className={clsx(classes.textField)}
          onChange={onChangeHandler}
          placeholder="First Name *"
          defaultValue={formValues.fname}
          style={{ width: "47%" }}
        />
        <TextField
          required={true}
          type="text"
          name="last_name"
          className={clsx(classes.textField)}
          onChange={onChangeHandler}
          placeholder="Last Name *"
          defaultValue={formValues.lname}
          style={{ width: "47%" }}
        />
      </div>
      <TextField
        required={true}
        type="email"
        name="email"
        className={clsx(classes.textField)}
        onChange={onChangeHandler}
        placeholder="Email Address *"
        defaultValue={formValues.email}
      />
      <TextField
        required={true}
        name="password"
        type="password"
        className={clsx(classes.textField)}
        onChange={onChangeHandler}
        placeholder="Password *"
        defaultValue={formValues.password}
      />
      <Button onClick={createUser} className={classes.button}>
        Get Started
      </Button>
    </div>
  );
};
