import React, { useState, createContext } from "react"

export const WorkoutContext = createContext()
// context is primarily used when some data needs to be accessible by many components at 

// This component establishes what data can be used.
export const WorkoutProvider = (props) => {

// Next, you will use the useState() hook to define a variable that holds the state of the component, and a function that updates it
const [workouts, setWorkouts] = useState([])

const getWorkouts = () => {
    return fetch("http://localhost:8088/workouts")
      .then(response => response.json())
      .then(workoutsData => setWorkouts(workoutsData))
  }

  const addWorkout = workouts => {
    return fetch("http://localhost:8088/workouts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(workouts)
    })
    .then(getWorkouts)
  }

  const getWorkoutById = (id) => {
    return fetch(`http://localhost:8088/workouts/${id}`)
        .then(res => res.json())
  }
  
  const releaseWorkout = workoutId => {
    return fetch(`http://localhost:8088/workouts/${workoutId}`, {
        method: "DELETE"
    })
        .then(getWorkouts)
  }

  const updateWorkout = workout => {
    return fetch(`http://localhost:8088/workouts/${workout.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(workout)
    })
    .then(getWorkouts)
  }
  const AddedWorkout = workoutsRoutine => {
    return fetch("http://localhost:8088/workoutRoutines", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(workoutsRoutine)
    })
    .then(getWorkoutRoutine)
  }
  const getWorkoutRoutine = () => {
    return fetch("http://localhost:8088/workoutRoutines")
      .then(response => response.json())
  }

   /*
      You return a context provider which has the
      `workouts` state and the `getWorkouts` function as keys.
      This allows any child elements to access them.
  */
      return (
        <WorkoutContext.Provider value={{
          
          workouts, getWorkouts, addWorkout, getWorkoutById, updateWorkout, releaseWorkout, AddedWorkout, getWorkoutRoutine
        }}>
          {props.children}
        </WorkoutContext.Provider>
      )
    }