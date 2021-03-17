import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import "./Workout.css"
import { useParams, useHistory } from "react-router-dom"


export const WorkoutDetail = () => {
    const { getWorkoutById, releaseWorkout } = useContext(WorkoutContext)
  
      const [workout, setWorkout] = useState({})
  
      const {workoutId} = useParams();
      const history = useHistory();
  
  
    useEffect(() => {
      console.log("useEffect", workoutId)
      getWorkoutById(workoutId)
      .then((response) => {
        setWorkout(response)
      })
      }, [])
  
    return (
      <section className="workout">
        <h3 className="workout__name">{workout.name}</h3>
        <div className="workout__type">{workout.type}</div>
      </section>
    )
  }