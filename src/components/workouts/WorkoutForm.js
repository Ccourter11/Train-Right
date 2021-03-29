import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { WorkoutContext } from "./WorkoutProvider"
import "./Workout.css"
import { userStorageKey } from "../auth/authSettings"



export const WorkoutForm = () => {
    const { types, getTypes, addWorkout, getWorkouts, updateWorkout, getWorkoutById } = useContext(WorkoutContext) 
    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))
    // let userWorkouts = types.filter(type => currentUser === type.userId)

    // the reason the setIsLoading's initial state is set to true is that your whole component actually is in such state initially and then you set it to false after fetched data is ready
    const [ isLoading, setIsLoading ] = useState(true);

    //Define the intial state of the form inputs with useState()
    const [workout, setWorkout] = useState({
      "name": "",
      "typeId": 0,
      "sets": 0,
      "reps": 0,
      "userId": parseInt(sessionStorage.getItem("app_user_id"))
    })
    
    const history = useHistory()
    // include useParams from react-router-dom to allow the app to read a parameter from the URL
    const {workoutId} = useParams();

    // after a change, save it
    const handleControlledInputChange = (event) => {
      // When changing a state object or array, always create a copy, make changes, and then set state.
      const newWorkout = {...workout}
      //workout is an object with properties.
   
      let workoutValue = event.target.value
      if(event.target.id !== "name") {
        parseInt(workoutValue)
      }

      // Set the property to the new value using object bracket notation.
      newWorkout[event.target.id] = workoutValue
      // update state
      setWorkout(newWorkout)
      
    }

    
    

    // Add a conditional to make sure all fields are complete
    const handleSaveWorkout = (event) => {
      
       if (workout.name === ""){
        window.alert("You must create a name for this workout!")
      } else {
        if (workoutId) {
          // checks to see if there is a workout ID
          updateWorkout({
            "id": workout.id,
            "name": workout.name,
            "typeId": parseInt(workout.typeId),
            "sets": parseInt(workout.sets),
            "reps": parseInt(workout.reps),
            "userId": parseInt(workout.userId)
          })
          // if yes, then it will update on save
          .then(history.push("/workouts"))
        } else {
          addWorkout({
            "name": workout.name,
            "typeId": parseInt(workout.typeId),
            "sets": parseInt(workout.sets),
            "reps": parseInt(workout.reps),
            "userId": parseInt(workout.userId)
          })
          // if it doesnt it will create a new workout
          .then(history.push("/workouts"))
      }
      }
  }

  useEffect(() => {
    getTypes()
  }, [])

    useEffect(() => {
      getWorkouts().then(() => {

          // if there is data
      if (workoutId) {
          getWorkoutById(workoutId)
          .then(workout=> {
          const editedWorkout = {
            id: workout.id,
            name: workout.name,
            typeId: workout.typeId,
            reps: workout.reps,
            sets: workout.sets,
            userId: sessionStorage.getItem("app_user_id")
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

          {/* <fieldset className="form-group">
            <label htmlFor="type">Type: </label>
            <input type="dropdown" id="type" onChange={handleControlledInputChange} value={workout.type} required placeholder="Upper or Lower.."></input>
          <label htmlFor="upperBody">Type: </label>
          </fieldset> */}

          <fieldset className="form-group">
          <label htmlFor="type">Type: </label>
           <select value={workout.typeId} id="typeId" className="upper-lower" onChange={handleControlledInputChange}>

           <option value="0">Upper Or Lower</option>
            {/* to get the data for drop down we need the context */}

            {types.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                  {/* because this is react, im looping over something and creating a jsx element, i do need a key, a key needs to be a unquie identifier bc we already have an id that acts like a unique identifier, we use the id as the key. the value of of option tag is going to be id bc thats what we want to capture and then what the user sees is going to be the name  */}
                </option>
            ))}
             </select> 
           </fieldset>
          <fieldset className="form-group">
            <label htmlFor="reps">Reps: </label>
            <input type="number" id="reps" onChange={handleControlledInputChange} value={workout.reps} required></input>
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="sets">Sets: </label>
            <input type="number" id="sets" onChange={handleControlledInputChange} value={workout.sets} required></input>
          </fieldset>
          <button variant="primary" className="btn" onClick={handleSaveWorkout}>
            Save Workout
          </button>
        </form>
      )
    }

