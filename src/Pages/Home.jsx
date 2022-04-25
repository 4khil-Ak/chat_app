import { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import clsx from "clsx";
import { Login } from "../Components/Login";
import { Signup } from "../Components/Signup";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      background: "#c1bdba",
      height: "100vh",
      "& .MuiTextField-root": {
        borderWidth: "0px",
        marginBottom: "1.5rem",
        "& input": {
          color: "#fff",
        },
        "& fieldset": {
          top: 0,
          borderWidth: "1px",
          borderColor: "#a0b3b0",
          "& .css-hdw1oc": {
            display: "none",
          },
        },
        "& .Mui-focused": {
          "& fieldset": {
            borderColor: "#1ab188",
            borderWidth: "1px",
          },
        },
      },
    },
    form: {
      background: "#13232f",
      padding: "3rem",
      borderRadius: "1rem",
      boxShadow: "0px 3px 6px #00000036",
      top: "4rem",
      left: 0,
      right: 0,
      height: "fit-content",
      "& .MuiButtonBase-root": {
        color: "#a0b3b0",
        backgroundColor: "rgba(160, 179, 176, 0.25)",
        "&:hover": {
          color: "#ffffff",
          background: "#179b77",
        },
      },
    },
    button: {
      fontSize: "1.5rem",
      width: "50%",
      padding: "1rem",
      border: "none !important",
      outline: "0 !important",
      borderRadius: "0 !important",
    },
    active: {
      color: "#fff !important",
      background: "#1ab188 !important",
    },
  })
);

export const Home = () => {
  const [signup, setSignup] = useState(true);
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, "py-5 position-relative")}>
      <div className={clsx(classes.form, "w-50 m-auto position-absolute")}>
        <div className="row m-0 mb-4">
          <Button
            className={clsx(classes.button, signup ? classes.active : "")}
            onClick={() => setSignup(true)}
          >
            Signup
          </Button>
          <Button
            className={clsx(classes.button, signup ? "" : classes.active)}
            onClick={() => setSignup(false)}
          >
            Login
          </Button>
        </div>
        {signup ? <Signup onClickHandler={()=>setSignup(false)} /> : <Login />}
      </div>
    </div>
  );
};
