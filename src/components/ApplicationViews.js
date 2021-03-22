import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { WorkoutList } from "./workouts/WorkoutList"
import { WorkoutProvider } from "./workouts/WorkoutProvider"
import { WorkoutForm } from "./workouts/WorkoutForm"
import { RoutineProvider } from "./routine/RoutineProvider"
import { RoutineList } from "./routine/RoutineList"
import { WorkoutDetail } from "./workouts/WorkoutDetail"
import { RoutineDetail } from "./routine/RoutineDetail"


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

                <Route exact path="/workouts/detail/:workoutId(\d+)">
                  <WorkoutDetail/>
                </Route>

                <Route path="/workouts/edit/:workoutId(\d+)">
                    <WorkoutForm/>
                </Route>

                <Route path="/routines">
                   <RoutineList />
                </Route>

                <Route path="/routines/detail/routineId(\d+)">
                   <RoutineDetail />
                </Route>
            </WorkoutProvider> 
        </RoutineProvider>
        
        </>
  ) 
}