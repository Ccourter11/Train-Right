import React, { useContext, useEffect, useState } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import "./Workout.css"
import { useParams, useHistory } from "react-router-dom"


export const WorkoutDetail = () => {
    const { getWorkoutById } = useContext(WorkoutContext)
    const [workout, setWorkout] = useState({})
      
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
      <div className="workout">
        <h3 className="workout__name">{workout.name}</h3> 
        <div className="workout__type">{workout.type}</div>
        <div className="workout__name">Workouts: {workout.routine?.name}</div> 
      </div>
    )
  }

  // <div className="location">
  //           <h3 className="location_name">{location.name}</h3>
  //           <div className="location_address">{location.address}</div>
  //           <h4>Employees</h4>
  //           <ul>
  //               {location.employees?.map(employee => <li key={employee.id}>{employee.name}</li>)}
  //           </ul>
  //           <h4>Current Residents</h4>
  //           <ul>
  //               {location.animals?.map(animal => <li key ={animal.id}>{animal.name}</li>)}
  //           </ul>
  //           <button onClick={() => {
  //               history.push(`/locations/edit/${location.id}`)
  //           }}>Edit</button>
  //       </div>