import React, { useContext, useEffect, useState } from "react"
import { RoutineContext } from "./RoutineProvider"
import "./Routine.css"
import { useParams, useHistory } from "react-router-dom"
import { WorkoutContext } from "../workouts/WorkoutProvider"


export const RoutineDetail = () => {
    const { getRoutineById } = useContext(RoutineContext)
    const [routines, setRoutine] = useState({})
    const {routineId} = useParams();
    const {getWorkoutById} = useContext(WorkoutContext)
    const [workouts, SetWorkouts] = useState([])
      // include useParams from react-router-dom to allow the app to read a parameter from the URL
      const history = useHistory();
  
  
    useEffect(() => {
      console.log("useEffect", routineId)
      getRoutineById(routineId)
      .then((response) => {
        setRoutine(response)
      })
      }, [])


      useEffect(() => {
        let promises = []
        promises =  routines.workoutRoutines?.map(workoutRoutine => getWorkoutById(workoutRoutine.workoutId))
        promises ? Promise.all(promises).then(SetWorkouts) : console.log("No Promises")
      }, [routines])
     
    return (
      <div className="routineDetail">
        <h1>Details</h1>
        {console.log(workouts)}
        {
          workouts.map(workout => <div key={workout.id}>
          <h3 className="routineDetail__name" key={workout.name}>Name: {workout?.name}</h3> 
          <h3 className="routineDetail__type" key={workout.type}>Type: {workout?.type}</h3>
          <h3 className="routineDetail__reps" key={workout.reps}>Reps: {workout?.reps}</h3>
          <h3 className="routineDetail__sets" key={workout.sets}>Sets: {workout?.sets}</h3> 
          </div>
          )
        }
       
      </div>
    )
  }