import React, { useContext, useEffect, useState } from "react"
import { RoutineContext } from "./RoutineProvider"
import "./Routine.css"

import { useParams } from "react-router-dom"


export const RoutineDetail = () => {
    const { getRoutineById } = useContext(RoutineContext)
    const [routine, setRoutine] = useState({})
      
    const {routineId} = useParams();
      // include useParams from react-router-dom to allow the app to read a parameter from the URL
      // const history = useHistory();
  
  
    useEffect(() => {
      console.log("useEffect", routineId)
      getRoutineById(routineId)
      .then((response) => {
        setRoutine(response)
      })
      }, [])
  
    return (
      <div className="routine">
        <h3 className="routine__name">Name: {routine.name}</h3> 
        <div className="routine__type">Type: {routine.routine?.type}</div>
        <div className="routine__name">routine: {routine.routine?.name}</div> 
      </div>
    )
  }