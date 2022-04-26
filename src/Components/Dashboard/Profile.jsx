import clsx from "clsx";
import { useContext } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Button, Typography } from "@mui/material";
import UserContext from "../../Context/UserContext";

const useStyles = makeStyles(() =>
  createStyles({
    profilePic: {
      width: "10rem",
      height: "10rem",
      borderRadius: "50%",
      fontSize: "4rem",
    },
    logout: {
      border: "none !important",
      outline: "0 !important",
    },
  })
);

export const Profile = () => {
  const context = useContext(UserContext);
  const ProfilePic = (val1 = "", val2 = "") => {
    var name = val1 + " " + val2;
    var FirstLetter = name.match(/\b(\w)/g); // returns an array of first letter of each word
    var Profile = FirstLetter.join(""); // joins each letter in an array to form a single word
    return Profile.toUpperCase();
  };
  const classes = useStyles();
  return (
    <div className="pt-5 mt-5">
      <div
        className={clsx(
          classes.profilePic,
          "bg-info text-white d-flex align-items-center justify-content-center m-auto"
        )}
      >
        {ProfilePic(context.user.fname, context.user.lname)}
      </div>
      <div className="mt-3 position-relative mb-5">
        <div className="d-flex w-100 p-2 m-0 w-100 align-items-center">
          <Typography
            variant="body2"
            className="w-50 text-dark text-right pr-3"
          >
            First Name
          </Typography>
          <span>:</span>
          <Typography
            variant="body1"
            className="w-50 text-primary text-left pl-3"
          >
            {context.user.fname}
          </Typography>
        </div>
        <div className="d-flex w-100 p-2 m-0 w-100 align-items-center">
          <Typography
            variant="body2"
            className="w-50 text-dark text-right pr-3"
          >
            Last Name
          </Typography>
          <span>:</span>
          <Typography
            variant="body1"
            className="w-50 text-primary text-left pl-3"
          >
            {context.user.lname}
          </Typography>
        </div>
        <div className="d-flex w-100 p-2 m-0 w-100 align-items-center">
          <Typography
            variant="body2"
            className="w-50 text-dark text-right pr-3"
          >
            Email
          </Typography>
          <span>:</span>
          <Typography
            variant="body1"
            className="w-50 text-primary text-left pl-3"
          >
            {context.user.email}
          </Typography>
        </div>
      </div>
      <Button onClick={context.logout} className={classes.logout}>Logout</Button>
    </div>
  );
};
