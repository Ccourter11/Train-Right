import React, { useContext, useEffect, useState } from "react"
import { RoutineContext } from "./WorkoutProvider"
import "./Workout.css"

import { useParams } from "react-router-dom"


export const WorkoutDetail = () => {
    const { getRoutineById } = useContext(RoutineContext)
    const [routines, setRoutine] = useState({})
      
    const {routineId} = useParams();
      // include useParams from react-router-dom to allow the app to read a parameter from the URL
      // const history = useHistory();
  
  
    useEffect(() => {
      console.log("useEffect", routineId)
      getRoutinetById(routineId)
      .then((response) => {
        setRoutine(response)
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