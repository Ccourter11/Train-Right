import React, { useContext, useEffect, useState } from "react"
import { RoutineContext } from "./RoutineProvider"
import "./Routine.css"
import { useParams, useHistory } from "react-router-dom"
import { WorkoutContext } from "../workouts/WorkoutProvider"

export const RoutineDetail = () => {
    const { getRoutineById, releaseRoutineWorkout, deleteRoutine } = useContext(RoutineContext)
    const [routine, setRoutine] = useState({})
    // include useParams from react-router-dom to allow the app to read a parameter from the URL
    const {routineId} = useParams();
    const {getWorkoutById} = useContext(WorkoutContext)
    const [workouts, SetWorkouts] = useState([])
    
      const history = useHistory();
  

      const handleDelete = (event) => {
          releaseRoutineWorkout(parseInt(event.target.id))
          .then(() => {
          history.push("/routines")
        })
      }

      const deletedRoutine = () => {
        deleteRoutine(routineId)
          .then(() => {
          history.push("/routines")
        })
      }
  
    useEffect(() => {
      getRoutineById(parseInt(routineId))
      .then((response) => {
        setRoutine(response)
      })
      }, [])


      useEffect(() => {
        let promises = []
        // create an empty array
        promises =  routine.workoutRoutines?.map(workoutRoutine => getWorkoutById(workoutRoutine.workoutId))
        // the ? after workoutRoutines basically ask if routines.workoutRoutines exist
        // it does so, now were going to map over workoutRoutines
        // for every workout in workoutRoutines were going to get the workout 
        // since for every item were doing a get call, were creating an array of promises
        promises ? Promise.all(promises).then(SetWorkouts) : console.log("No Promises")
        // when all promises are fufilled then it will Setworkouts
      }, [routine])
      // the dependencey array triggers if routine changes, and it can only change through setRoutine
     

    return (
      <div className="routineDetail">
        <h1>Details</h1>
        {
          workouts.map(workout => <div key={workout.id}>
          <h3 className="routineDetail__name" id={workout.name}>Name: {workout?.name}</h3> 
          <h3 className="routineDetail__type" id={workout.type}>Type: {workout?.type}</h3>
          <h3 className="routineDetail__reps" id={workout.reps}>Reps: {workout?.reps}</h3>
          <h3 className="routineDetail__sets" id={workout.sets}>Sets: {workout?.sets}</h3> 
          <button className="deleteRoutineBtn" id={routine?.id} onClick={deletedRoutine}>Release Routine</button>
          <button className="deleteWorkoutBtn" id={workout?.id} onClick={handleDelete}>Release Workout</button>
          <button className="editRoutineBtn" onClick={() => {
            history.push(`/routines/edit/${workout.id}`)
          }}>Edit</button>
          <hr/>
          </div>
          )
        }
       
      </div>
    )
  }