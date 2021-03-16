import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { WorkoutList } from "./workouts/WorkoutList"
import { WorkoutProvider } from "./workouts/WorkoutProvider"


export const ApplicationViews = () => {
    return (
      <>
        {/* Render the location list when http://localhost:3000/ */}
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/workouts">
            <WorkoutProvider>
                <WorkoutList />
                
            </WorkoutProvider>
         </Route>


        </>
  )
}