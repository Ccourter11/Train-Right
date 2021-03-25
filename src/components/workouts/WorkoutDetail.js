import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import "./Workout.css"
import { useParams, useHistory } from "react-router-dom"


export const WorkoutDetail = () => {
    const { getWorkoutById, releaseWorkout } = useContext(WorkoutContext)
    const [workout, setWorkout] = useState({})
      
    const {workoutId} = useParams();
      // include useParams from react-router-dom to allow the app to read a parameter from the URL
      const history = useHistory();
  
    const handleRelease = () => {
        releaseWorkout(workout.id)
        .then(() => {
        history.push("/workouts")
      })
    }
  
    useEffect(() => {
      getWorkoutById(parseInt(workoutId))
      .then((response) => {
        setWorkout(response)
      })
      }, [])
  
    return (
      <div className="workoutRoutine">
        <h3 className="workout__name">Name: {workout.name}</h3> 
        <div className="workout__type">Type: {workout.type}</div>
        <div className="workout__reps">Reps: {workout.reps}</div>
        <div className="workout__sets">Sets: {workout.sets}</div>
        <button onClick={handleRelease}>Release Workout</button>
        <button onClick={() => {
          history.push(`/workouts/edit/${workout.id}`)
            }}>Edit</button>
      </div>
    )
  }

//   <button onClick={() => {
//     history.push(`/workouts/edit/${workout.id}`)
// }}>Edit</button>