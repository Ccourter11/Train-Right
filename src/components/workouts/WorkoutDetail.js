import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import { useParams, useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import "./Workout.css"

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
    
    // useEffect(() => {
    //  setTypes()
    //   }
    // }, [])
  
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
        <Button onClick={handleRelease}>Release Workout</Button>
        <Button className="editWorkoutBtn" onClick={() => {
          history.push(`/workouts/edit/${workout.id}`)
            }}>Edit</Button>
      </div>
    )
  }

