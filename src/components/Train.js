// My Main App Component

import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { userStorageKey } from "./auth/authSettings"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar";


export const Train = () => (
<>
    <Route render={() => {
        if (sessionStorage.getItem(userStorageKey)) {
          return (
            <>
             <NavBar />
             <ApplicationViews />
             
        
            </>
          )
        } else {
          return <Redirect to="/login" />;
        }
    }} />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
</>
 
 );