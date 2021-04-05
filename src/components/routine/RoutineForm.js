import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { RoutineContext } from "./RoutineProvider"
import "./Routine.css"
import { userStorageKey } from "../auth/authSettings"

export const RoutineForm = () => {
  const {saveRoutine, updateRoutine, getRoutineById} = useContext(RoutineContext)
  let currentUser = parseInt(sessionStorage.getItem(userStorageKey))
 //Define the intial state of the form inputs with useState()
  
  const [routine, setRoutine] = useState({
    routineName: "",
    date: 0,
    userId: currentUser
  })

  const history = useHistory()
  
  const [isLoading, setIsLoading] = useState(true);
  // include useParams from react-router-dom to allow the app to read a parameter from the URL
  const {routineId} = useParams()

  const handleControlledInputChange = (event) => {
    let newRoutine = {...routine}
    //routine is an object with properties
    // When changing a state object or array, always create a copy, make changes, and then set state.

    let setVal = event.target.value

    newRoutine[event.target.id] = setVal
    // Set the property to the new value using bracket notation.

    setRoutine(newRoutine)
      // update state
  }


  const handleClickSaveRoutine = () => {
    setIsLoading(true)
    if(routineId){
      // checking to see if routineId exist
      // if it does, use the updateRoutine function which will change the routine in the DB
      updateRoutine({routineName: routine.routineName,
                      id: routine.id,
                      date: routine.date})
      .then(()=> history.push(`/routines/detail/${routine.id}`))
    }else{
      // if it doesnt exist it creates a new routine
      saveRoutine({
        routineName: routine.routineName,
        date: routine.date,
        userId: currentUser
      })
      .then(() => history.push("/routines"))
    }
    }
  useEffect(()=>{
    if(routineId){
      getRoutineById(routineId)
      // takes the routineId and finds that exact routine in your DB and returns that object
      .then(routine => {
        setRoutine(routine)
        // routine in () represents whatever is returned by getRoutineById
        // setRoutine changes the state to whatever routine is in my .then
        setIsLoading(false)
      })
    }else{
      setIsLoading(false)
    }
  },[])


return (
  <form className="routineForm">
      <h2 className="routineForm__title">New Routine</h2>
      <fieldset>
          <div className="form-group">
              <label htmlFor="name">Routine Name: </label>
              <input type="text" id="routineName" onChange={handleControlledInputChange} className="form-control" placeholder="Routine name" value={routine.routineName}/>
          </div>
      </fieldset>
      <fieldset>
          <div className="form-group">
              <label htmlFor="routine">Date Of : </label>
              <input type="date" id="date" onChange={handleControlledInputChange} required className="form-control" placeholder="Routine Date" value={routine.date}/>
          </div>
      </fieldset>
      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event =>{
          event.preventDefault()
          handleClickSaveRoutine()}}>
        {"Save Routine"}
      </button>
  </form>
)
}