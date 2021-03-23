import React, { useContext, useEffect, useState } from "react"
import { RoutineContext } from "./RoutineProvider"
import "./Routine.css"
import { useParams, useHistory } from "react-router-dom"


export const RoutineDetail = () => {
    const { getRoutineById } = useContext(RoutineContext)
    const [routines, setRoutine] = useState({})
    const {routineId} = useParams();
      // include useParams from react-router-dom to allow the app to read a parameter from the URL
      const history = useHistory();
  
  
    useEffect(() => {
      console.log("useEffect", routineId)
      getRoutineById(routineId)
      .then((response) => {
        setRoutine(response)
      })
      }, [])
  
    return (
      <div className="routineDetail">
        <h1>Details</h1>
        {console.log(routines)}
        <h3 className="routineDetail__name">Name: {routines.workout?.name}</h3> 
        <h3 className="routineDetail__type">Type: {routines.workout?.type}</h3>
        <h3 className="routineDetail__reps">Reps: {routines.workout?.reps}</h3>
        <h3 className="routineDetail__sets">Sets: {routines.workout?.sets}</h3>
      </div>
    )
  }