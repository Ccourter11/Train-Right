import React, { useEffect, useContext } from "react"
import { WorkoutCard } from "./WorkoutCard"
import "./Workout.css"

// The useContext hook allows you to use data structures and functions that a parent provider component exposes.
// To start, you need to import the context object you created in the provider component so that the Context hook can access the objects it exposes
import { WorkoutContext } from "./WorkoutProvider"
import { useHistory } from "react-router-dom" // import from libraries before your local modules

export const WorkoutList = () => {
    // This state changes when `getWorkouts()` is invoked below
    const { workouts, getWorkouts } = useContext(WorkoutContext)


    const history = useHistory()

    useEffect(() => {
        getWorkouts()
      }, [])

      return (
        <>  
        <h2 className="workouts__title">Workouts</h2>
        <button onClick={() => history.push("/workouts/create")}>
          Create Workout
        </button>
        <div className="workouts">
            {console.log(workouts)}
        {
        workouts.map(workout => {
          return <WorkoutCard key={workout.id} workouts={workout} />
        })
        }
      </div>
      </>
      )
    }