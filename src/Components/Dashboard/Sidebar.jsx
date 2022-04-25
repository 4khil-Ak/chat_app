import clsx from "clsx";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { useContext } from "react";
import UserContext from "../../Context/UserContext";

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      fontSize: "1.2rem",
    },
    contactCard: {
      padding: "0.25rem",
      margin: "0",
      marginTop: "0.5rem",
      boxShadow: "0px 3px 6px #00000036",
      cursor: "pointer",
    },
    profileName: {
      width: "2.5rem",
      height: "2.5rem",
      borderRadius: "50%",
      padding: "5px",
    },
  })
);

export const Sidebar = () => {
  const context = useContext(UserContext);

  let user = context.user;
  const ProfilePic = (val1 = "", val2 = "") => {
    var name = val1 + " " + val2;
    var FirstLetter = name.match(/\b(\w)/g); // returns an array of first letter of each word
    var Profile = FirstLetter.join(""); // joins each letter in an array to form a single word
    return Profile.toUpperCase();
    // console.log(Profile);
  };
  const classes = useStyles();
  return (
    <>
      <div
        className={clsx(
          classes.header,
          "bg-info row m-0 align-items-center w-100 p-2 text-light justify-content-between"
        )}
      >
        <Typography variant="subtitle2">Welcome to Chat-Chat</Typography>
        <Typography variant="subtitle2" className="text-uppercase">
          {user.fname}&ensp;{user.lname}
        </Typography>
      </div>
      {context.usersList?.filter(x=>x.id !== context.user.id).map((value, index) => (
        <div
          onClick={()=>context.setChat(value.id)}
          key={value.fname + index}
          className={clsx(
            classes.contactCard,
            "p-2 row align-items-center justify-content-between"
          )}
        >
          <div
            className={clsx(
              classes.profileName,
              "d-flex align-items-center justify-content-center bg-danger text-white"
            )}
          >
            {ProfilePic(value.fname, value.lname)}
          </div>
          <div className="d-flex flex-column justify-content-right">
            <Typography className="text-right text-info" variant="body2">
              {value.fname}.{value.lname}
            </Typography>
            <Typography className="text-right text-dark" variant="caption">
              {value.email}
            </Typography>
          </div>
        </div>
      ))}
    </>
  );
};
