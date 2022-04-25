import clsx from "clsx";
import { useState, useContext, useEffect } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import UserContext from "../../Context/UserContext";
import { Typography, TextField, Button } from "@mui/material";
import { ReactComponent as SendIcon } from "../../Assets/send.svg";

const useStyles = makeStyles(() =>
  createStyles({
    messageForm: {
      height: "100%",
    },
    contactHeader: {
      height: "10.5%",
      background: "#fff",
      padding: "0.25rem",
      margin: "0",
      boxShadow: "0px 3px 6px #00000036",
    },
    profile: {
      width: "2.5rem",
      height: "2.5rem",
      borderRadius: "50%",
      padding: "5px",
    },
    messageBody: {
      height: "89.5%",
      "& .MuiTextField-root": {
        "& .MuiInputBase-root": {
          borderRadius: 0,
        },
        "& fieldset": {
          top: 0,
          "& .css-hdw1oc": {
            display: "none",
          },
        },
      },
      "& svg": {
        fill: "#fff",
        background: "#17a2b8",
        width: "3.5rem",
        height: "100%",
        padding: "0.5rem",
      },
    },
    messagePanel: {
      height: "90%",
      msOverflowX: "hidden",
      msOverflowY: "auto",
      scrollBehavior: "smooth",
      "&::-webkit-scrollbar": {
        width: "3px",
      },
      "&::-webkit-scrollbar-thumb": {
        width: "3px",
        backgroundColor: "#17a2b8",
        borderRadius: "5px",
      },
      "&::-webkit-scrollbar-track": {
        width: "3px",
        backgroundColor: "#fff",
      },
    },
    message: {
      position: "relative",
      width: "fit-content",
      padding: "0.25rem 1rem",
      background: "#fff",
      boxShadow: "0px 3px 6px #00000036",
      borderRadius: "5px",
    },
    mlAuto: {
      marginLeft: "auto !important",
    },
    mrAuto: {
      marginRight: "auto !important",
    },
    time: {
      fontSize: "0.7rem !important",
      position: "absolute",
      bottom: 0,
      width: "max-content",
    },
    tr: {
      right: "105%",
    },
    tl: {
      left: "105%",
    },
  })
);

export const MessageForm = () => {
  const context = useContext(UserContext);
  useEffect(() => {
    context.getMessage(context.mountedData[0]?.id);
  }, [context.mountedData]);
  const initialState = {
    value: "",
  };
  const [message, setMessage] = useState(initialState);

  const ProfilePic = (val1 = "", val2 = "") => {
    var name = val1 + " " + val2;
    var FirstLetter = name.match(/\b(\w)/g); // returns an array of first letter of each word
    var Profile = FirstLetter.join(""); // joins each letter in an array to form a single word
    return Profile.toUpperCase();
    // console.log(Profile);
  };

  const classes = useStyles();

  let messageUi = null;
  if (context.message.length === 0) {
    messageUi = (
      <Typography className="w-100p pb-5 text-danger" variant="h6">
        Start Chatting
      </Typography>
    );
  } else {
    messageUi = context.message.map((mes, index) => (
      <div key={mes.id + index} className="w-100 pb-2">
        <Typography
          variant="body2"
          className={clsx(
            classes.message,
            parseInt(mes.sender_id) === parseInt(context.user.id)
              ? classes.mlAuto
              : classes.mrAuto,
            "position-relative"
          )}
        >
          {mes.text}
          <Typography
            className={clsx(
              classes.time,
              parseInt(mes.sender_id) === parseInt(context.user.id)
                ? classes.tr
                : classes.tl,
              "text-success"
            )}
            variant="body2"
          >
            {mes.time}
          </Typography>
        </Typography>
      </div>
    ));
  }
  const onChangeHandler = (e) => {
    setMessage((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const sendData = () => {
    if(message.value !== ""){
      context.sendMessage(message.value, context.mountedData[0].id);
    }
    setMessage(initialState);
  };

  if (context.mountedData.length === 0) {
    return (
      <Typography className="text-center w-100 pt-5 text-danger" variant="h6">
        Click a contact to Chat !
      </Typography>
    );
  } else {
    return (
      <div className={clsx(classes.messageForm, "d-flex flex-column")}>
        {context?.mountedData.map((value, index) => (
          <div
            key={value.fname + index}
            className={clsx(
              classes.contactHeader,
              "p-2 row align-items-center justify-content-between"
            )}
          >
            <div
              className={clsx(
                classes.profile,
                "d-flex align-items-center justify-content-center bg-dark text-white"
              )}
            >
              {ProfilePic(value.fname, value.lname)}
            </div>
            <div className="d-flex flex-column justify-content-right">
              <Typography className="text-right text-info" variant="subtitle">
                {value.fname}.{value.lname}
              </Typography>
              <Typography className="text-right text-dark" variant="body1">
                {value.email}
              </Typography>
            </div>
          </div>
        ))}
        <div className={clsx(classes.messageBody, "row m-0 flex-column")}>
          <div
            className={clsx(
              classes.messagePanel,
              "d-flex flex-column justify-content-end"
            )}
          >
            {messageUi}
          </div>
          <div className="d-flex align-items-center" style={{ height: "10%" }}>
            <TextField
              autoFocus={true}
              required={true}
              type="text"
              name="value"
              className={clsx(classes.messageBox, "w-100")}
              onChange={onChangeHandler}
              placeholder="Enter Text"
              value={message.value}
            />
            <Button onClick={sendData} style={{ padding: 0, outline: 0 }}>
              <SendIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  }
};
