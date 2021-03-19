import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { WorkoutContext } from "./WorkoutProvider"
import "./Workout.css"


export const WorkoutForm = () => {
    const { addWorkout, updateWorkout } = useContext(WorkoutContext) 

    const history = useHistory()
    const [workout, setWorkout] = useState({
        "name": "",
        "type": "",
    })

    // Add a conditional to make sure all fields are complete
    const handleControlledInputChange = (event) => {
        const newWorkout = {...workout}
    
        let setValue = event.target.value
    
        if (event.target.id.includes("Id")){
          setValue = parseInt(setValue)
        }
         else {
          newWorkout[event.target.id] = setValue
        }
    
        setWorkout(newWorkout)
      }
    
      const handleSaveWorkout = (event) => {
        event.preventDefault()
    
        if (workout.name === ""){
          window.alert("You must create a name for this workout!")
        } else {
          addWorkout(workout)
          .then(history.push("/workouts"))
        }
      }

    return (
        <form className="workoutForm">
          <h2 className="workoutForm__title">Workout Form</h2>
          <fieldset className="form-group">
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus placeholder="Name..."></input>
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="reps">Type: </label>
            <input type="text" id="type" onChange={handleControlledInputChange} required></input>
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="reps">Reps: </label>
            <input type="number" id="reps" onChange={handleControlledInputChange} required></input>
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="reps">Sets: </label>
            <input type="number" id="sets" onChange={handleControlledInputChange} required></input>
          </fieldset>
          <button className="btn" onClick={handleSaveWorkout}>
            Save Workout
          </button>
        </form>
      )
    }