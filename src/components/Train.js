// My Main App Component

import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar";

// NavBar is the presentation component
// ApplicationViews is the controller component

export const Train = () => {
 
          return (
            <>          
             <NavBar />
             <ApplicationViews />
        
            </>
          )
 
          };