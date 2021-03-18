import React, { useState, createContext } from "react"

export const WorkoutContext = createContext()

// This component establishes what data can be used.
export const WorkoutProvider = (props) => {

// Next, you will use the useState() hook to define a variable that holds the state of the component, and a function that updates it
const [workouts, setWorkouts] = useState([])

const getWorkouts = () => {
    return fetch("http://localhost:8088/workouts")
      .then(response => response.json())
      .then(workoutsData => setWorkouts(workoutsData))
  }

  const addWorkout = workoutObj => {
    return fetch("http://localhost:8088/workouts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(workoutObj)
    })
    .then(getWorkouts)
  }
  const getWorkoutById = (id) => {
    return fetch(`http://localhost:8088/workouts/${id}?_expand=routines`)
        .then(res => res.json())
  }

   /*
      You return a context provider which has the
      `workouts` state and the `getWorkouts` function as keys.
      This allows any child elements to access them.
  */
      return (
        <WorkoutContext.Provider value={{
          
          workouts, getWorkouts, addWorkout, getWorkoutById
        }}>
          {props.children}
        </WorkoutContext.Provider>
      )
    }