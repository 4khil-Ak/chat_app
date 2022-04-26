import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({
  usersList: [],
  message: [],
  user: {},
  mountedData: [],
  setUser: () => {},
  setChat: () => {},
  fetchUser: () => {},
  sendMessage: () => {},
  getMessage: () => {},
  logout: () => {},
});

export const UserContextProvider = (props) => {
  let navigate = useNavigate();
  const [user, setUserDetails] = useState({});
  const [usersList, setUsersList] = useState([]);
  const [message, setMessage] = useState([]);
  const [mountedData, setMountedData] = useState([]);
  const setUser = (data) => {
    setUserDetails(data);
  };
  const setChat = (id) => {
    setMountedData(usersList.filter((x) => x.id === id));
  };
  const fetchUser = () => {
    fetch(`http://localhost:8000/api/?user=user&method=get_user`).then(
      (response) => {
        response.text().then((_data) => {
          var data = JSON.parse(_data);
          var tempData = Object.values(data.list);
          setUsersList(tempData);
        });
      }
    );
  };
  const sendMessage = (text, rec) => {
    let d = new Date();
    fetch(`http://localhost:8000/api/?user=user&method=send_message`, {
      method: "POST",
      body: JSON.stringify({
        sender_id: user.id,
        receiver_id: rec,
        text: text,
        time: d.toLocaleTimeString(),
      }),
    }).then((response) => {
      response.text().then((_data) => {
        var data = JSON.parse(_data);
        var tempData = Object.values(data.list);
        setMessage(tempData);
      });
    });
  };
  const getMessage = (rec) => {
    fetch(`http://localhost:8000/api/?user=user&method=get_message`, {
      method: "POST",
      body: JSON.stringify({
        sender_id: user.id,
        receiver_id: rec,
      }),
    }).then((response) => {
      response.text().then((_data) => {
        var data = JSON.parse(_data);
        var tempData = Object.values(data.list);
        setMessage(tempData);
      });
    });
  };
  const logout = () => {
    sessionStorage.clear();
    setUserDetails({});
    navigate("/");
  };
  return (
    <UserContext.Provider
      value={{
        user: user,
        usersList: usersList,
        message: message,
        mountedData: mountedData,
        setUser: setUser,
        fetchUser: fetchUser,
        setChat: setChat,
        sendMessage: sendMessage,
        getMessage: getMessage,
        logout: logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
