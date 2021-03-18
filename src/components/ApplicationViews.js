import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { WorkoutList } from "./workouts/WorkoutList"
import { WorkoutProvider } from "./workouts/WorkoutProvider"
import { WorkoutForm } from "./workouts/WorkoutForm"
import { RoutineProvider } from "./routine/RoutineProvider"
import { RoutineList } from "./routine/RoutineList"
import { WorkoutDetail } from "./workouts/WorkoutDetail"


export const ApplicationViews = () => {
    return (
      <>
        {/* Render the location list when http://localhost:3000/ */}
        <Route exact path="/">
          <Home />
        </Route>

        <RoutineProvider >
            <WorkoutProvider>
              <Route path="/workouts">
                <WorkoutList />
             </Route>

             <Route exact path="/workouts/create">
               <WorkoutForm />
              </Route>

              <Route exact path="/routines/detail/:workoutId(\d+)">
                  <WorkoutDetail/>
                  <RoutineList />
                </Route>
            </WorkoutProvider>


           <Route path="/routines">
             </Route>
             
        </RoutineProvider>
        </>
  ) 
}