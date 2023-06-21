import React, {useState, useEffect} from 'react';
import './App.css';
import YodlrApi from './Api';
import jwt from 'jsonwebtoken';
import UserContext from './Users/UserContext';
import AdminUsersContext from './Admin/AdminUsersContext';
import { BrowserRouter, Redirect } from 'react-router-dom';
import Navigation from './Routes/Navigation';
import Routes from './Routes/Routes';
import useLocalStorage from './Common/UseLocalStorage';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [token, setToken] = useLocalStorage("token");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    async function getCurrUser() {
      if(token) {
        try {
          YodlrApi.defaultToken(token);
          const {id} = jwt.decode(token);
          const currUser = await YodlrApi.getUser(id);
          currUser["token"] = token;
          setCurrUser(currUser);
          setUsers(await getUsersForAdmin(currUser));
        } catch(err) {
          setCurrUser(null);
        };
      };
      setIsLoaded(true);
    };
    setIsLoaded(false);
    getCurrUser();
  }, [token]);

  async function getUsersForAdmin(currUser) {
    if(currUser.isAdmin) {
      const users = await YodlrApi.getUsers();
      return users;
    }
    return null;
  }

  async function login(data) {
    try {
      const token = await YodlrApi.login(data);
      setToken(token);
      return {success: true};
    } catch(err) {
      YodlrApi.clearToken();
      setToken(null);
      return {success: false, err};
    };
  };

  async function signup(data) {
    try {
      const token = await YodlrApi.signup(data);
      setToken(token);
      return {success: true};
    } catch(err) {
      return {success: false, err}
    };
  };

  async function logout() {
    setCurrUser(null);
    setToken(null);
    localStorage.clear();
    YodlrApi.clearToken();
    return(<Redirect to="/" />);
  }

  if(!isLoaded) return (<div>Loading</div>);

  return (
    <BrowserRouter>
    <UserContext.Provider value={{currUser, setCurrUser, alert, setAlert }}>
      <AdminUsersContext.Provider value={{users, setUsers}}>
        <Navigation logout={logout}/>
          { alert }
          <Routes 
            login={login}
            signup={signup}
          />
      </AdminUsersContext.Provider>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
