import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import "./Workout.css"
import { useParams } from "react-router-dom"


export const WorkoutDetail = () => {
    const { getWorkoutById } = useContext(WorkoutContext)
    const [workouts, setWorkout] = useState({})
      
    const {workoutId} = useParams();
      // include useParams from react-router-dom to allow the app to read a parameter from the URL
      // const history = useHistory();
  
  
    useEffect(() => {
      console.log("useEffect", workoutId)
      getWorkoutById(workoutId)
      .then((response) => {
        setWorkout(response)
      })
      }, [])
  
    return (
      <div className="workoutRoutine">
        <h3 className="workout__name">Name: {workouts.name}</h3> 
        <div className="workout__type">Type: {workouts.type}</div>
        <div className="workout__name">Workouts: {workouts.routine?.name}</div> 
      </div>
    )
  }
