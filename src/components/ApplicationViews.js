import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { WorkoutList } from "./workouts/WorkoutList"
import { WorkoutProvider } from "./workouts/WorkoutProvider"
import { WorkoutForm } from "./workouts/WorkoutForm"
import { RoutineProvider } from "./routine/RoutineProvider"
import { RoutineList } from "./routine/RoutineList"


export const ApplicationViews = () => {
    return (
      <>
        {/* Render the location list when http://localhost:3000/ */}
        <Route exact path="/">
          <Home />
        </Route>

            <WorkoutProvider>
              <Route path="/workouts">
                <WorkoutList />
             </Route>

             <Route exact path="/workouts/create">
               <WorkoutForm />
              </Route>
            </WorkoutProvider>


        <RoutineProvider >
        <Route path="/routines">
                <RoutineList />
             </Route>
        </RoutineProvider>

        </>
  ) 
}