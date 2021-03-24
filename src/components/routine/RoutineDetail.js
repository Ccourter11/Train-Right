import React, { useContext, useEffect, useState } from "react"
import { RoutineContext } from "./RoutineProvider"
import "./Routine.css"
import { useParams, useHistory } from "react-router-dom"
import { WorkoutContext } from "../workouts/WorkoutProvider"



export const RoutineDetail = () => {
    const { getRoutineById, releaseRoutineWorkout } = useContext(RoutineContext)
    const [routines, setRoutine] = useState({})
    const {routineId} = useParams();
    const {getWorkoutById} = useContext(WorkoutContext)
    const [workouts, SetWorkouts] = useState([])
    
      // include useParams from react-router-dom to allow the app to read a parameter from the URL
      const history = useHistory();
  

      const handleDelete = (event) => {
        console.log(routineId)
        {console.log(event.target)}
        releaseRoutineWorkout(parseInt(event.target.id))
          .then(() => {
          history.push("/routines")
        })
      }

      // const handleRelease = () => {
      //   console.log(workout.id)
      //     releaseWorkout(workout.id)
      //     .then(() => {
      //     history.push("/workouts")
      //   })
      // }
  
    useEffect(() => {
      console.log("useEffect", routineId)
      getRoutineById(parseInt(routineId))
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
        {/* {console.log(workout)} */}
        {
          workouts.map(workout => <div key={workout.id}>
          <h3 className="routineDetail__name" id={workout.name}>Name: {workout?.name}</h3> 
          <h3 className="routineDetail__type" id={workout.type}>Type: {workout?.type}</h3>
          <h3 className="routineDetail__reps" id={workout.reps}>Reps: {workout?.reps}</h3>
          <h3 className="routineDetail__sets" id={workout.sets}>Sets: {workout?.sets}</h3> 
          <button id={workout?.id} onClick={handleDelete}>Release Workout</button>
          <button onClick={() => {
            history.push(`/routines/edit/${workout?.id}`)
          }}>Edit</button>
          <hr/>
          </div>
          )
        }
       
      </div>
    )
  }