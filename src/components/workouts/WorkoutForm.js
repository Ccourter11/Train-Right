import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { WorkoutContext } from "./WorkoutProvider"
import "./Workout.css"




export const WorkoutForm = () => {
    const { addWorkout,getWorkouts, updateWorkout, getWorkoutById } = useContext(WorkoutContext) 
    const [ isLoading, setIsLoading ] = useState(true);
    //Define the intial state of the form inputs with useState()
    const [workout, setWorkout] = useState({
      "name": "",
      "type": "",
      "sets": 0,
      "reps": 0
    })
    
    const history = useHistory()
    const {workoutId} = useParams();

    // after a change, save it
    const handleControlledInputChange = (event) => {
      // When changing a state object or array, always create a copy, make changes, and then set state.
      const newWorkout = {...workout}
      //workout is an object with properties.
      let selectedVal = event.target.value
      
      // Set the property to the new value using object bracket notation.
      newWorkout[event.target.id] = selectedVal
      // update state
      setWorkout(newWorkout)
    }
    
    // Add a conditional to make sure all fields are complete
    const handleSaveWorkout = (event) => {
      
         if (workout.name === ""){
        window.alert("You must create a name for this workout!")
      } else {
        addWorkout(workout)
        .then(history.push("/workouts"))
      }
      if (workoutId) {
        updateWorkout(workout)
        .then(history.push("/workouts"))
    } else { 
      //invoke addCustomer passing customer as an argument.
       addWorkout(workout)
      //change the url and display the customer list
      .then(history.push("/workouts"))
      }
  }

    useEffect(() => {
      getWorkouts().then(() => {

          // if there is data
      if (workoutId) {
          getWorkoutById(workoutId)
          .then(workout=> {
          const editedWorkout = {
            id: workout.id,
            name: workout.name,
            type: workout.type,
            reps: parseInt(workout.reps),
            sets: parseInt(workout.sets)
          }
          setWorkout(editedWorkout)
              setIsLoading(false)
          })
      } else {
          // else there is no data
          setIsLoading(false)
      }
      })
  }, [])

    return (
      
        <form className="workoutForm">
          <h2 className="workoutForm__title">Workout Form</h2>
          <fieldset className="form-group">
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" onChange={handleControlledInputChange} value={workout.name} required autoFocus placeholder="Name..."></input>
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="reps">Type: </label>
            <input type="dropdown" id="type" onChange={handleControlledInputChange} value={workout.type} required placeholder="Upper or Lower.."></input>
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="reps">Reps: </label>
            <input type="number" id="reps" onChange={handleControlledInputChange} value={workout.reps} required></input>
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="reps">Sets: </label>
            <input type="number" id="sets" onChange={handleControlledInputChange} value={workout.sets} required></input>
          </fieldset>
          <button variant="primary" className="btn" onClick={handleSaveWorkout}>
            Save Workout
          </button>
        </form>
      )
    }

