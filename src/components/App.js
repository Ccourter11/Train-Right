import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { userStorageKey } from "./auth/authSettings"
import { Train } from "./Train";
import { Logout } from "./auth/LogOut"

function App() { 

    return (
    <>
        <Route render={() => {
            if (sessionStorage.getItem(userStorageKey)) {
              return (
                <>
                   <Train />         
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
        <Route path="/logout">
          <Logout />
        </Route>
    </>
     
     );

    }
export default App