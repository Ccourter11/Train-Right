import React, {useContext, useState, useEffect} from "react"
import "./Workout.css"
import { Link } from "react-router-dom"
import { WorkoutContext } from "./WorkoutProvider";
import { RoutineContext } from "../routine/RoutineProvider"
import { userStorageKey } from "../auth/authSettings"

export const WorkoutCard = (props) => {
  const { types,getTypes,getRoutines, routines } = useContext(RoutineContext)
  const {AddedWorkout} = useContext(WorkoutContext)
  let currentUser = parseInt(sessionStorage.getItem(userStorageKey))
  let userRoutines = routines.filter(routine => currentUser === routine.userId)


  const handleAddedWorkout = () => {
    AddedWorkout(routine)
  }

    //for edit, hold on to state of routine in this view
    const [routine, setRoutine] = useState({
      routineId: 0,
      workoutId: props.workouts.id
    })


  useEffect(() => {
    getRoutines()
  }, [])


  //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
     
      //always create a copy make changes, and then set state.
      const newRoutine = { ...routine }
      //routine is an object with properties.
      //set the property to the new value
      newRoutine[event.target.id] = parseInt(event.target.value)
      //update state
      setRoutine(newRoutine)
    }

  return (
    <section className="workout">
        <h3 className="workout__name">
      <Link to={`/workouts/detail/${props.workouts.id}`}>
        {props.workouts.name}
      </Link>
      </h3>
      <button className="addBtn" onClick={handleAddedWorkout}>Add </button>

      <label htmlFor="workout"> Assign to Routine: </label>

            <select value={routine.routineId} id="routineId" className="form-control" onChange={handleControlledInputChange}>

              <option value="0">Select a Routine</option>
              {/* to get the data for drop down we need the context */}
              {userRoutines.map(r => (
                <option key={r.id} value={r.id}>
                  {r.routineName}
                  {/* because this is react, im looping over something and creating a jsx element, i do need a key, a key needs to be a unquie identifier bc we already have an id that acts like a unique identifier, we use the id as the key. the value of of option tag is going to beid bc thats what we want to capture and then what the user sees is going to be the name  */}
                </option>
                ))}
                </select>
    </section>
  )
}