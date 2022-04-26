import clsx from "clsx";
import { useEffect, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { createStyles, makeStyles } from "@mui/styles";
import { Sidebar, MessageForm, Profile } from "../Components/Dashboard/index";
import UserContext from "../Context/UserContext";

const useStyles = makeStyles(() =>
  createStyles({
    dashboard: {
      height: "100vh",
      background: "#efe",
    },
    sidebar: {
      height: "auto",
      background: "#fff",
    },
    message: {
      height: "auto",
    },
  })
);

export const Dashboard = () => {
  const context = useContext(UserContext);
  const classes = useStyles();
  const params = useParams();
  useEffect(() => {
    context.fetchUser();
  }, []);

  if (params.id === sessionStorage.getItem("chatID")) {
    return (
      <div className={clsx(classes.dashboard, "row m-0")}>
        <div className={clsx(classes.sidebar, "col-3 p-2")}>
          <Sidebar />
        </div>
        <div className={clsx(classes.message, "col-6 p-2")}>
          <MessageForm />
        </div>
        <div className={clsx(classes.message, "bg-white col-3 p-2")}>
          <Profile />
        </div>
      </div>
    );
  } else {
    return <Navigate to={"/"}></Navigate>;
  }
};
