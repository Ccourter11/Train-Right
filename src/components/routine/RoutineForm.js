import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { RoutineContext } from "./RoutineProvider"
import "./Routine.css"


export const RoutineForm = () => {
  const {saveRoutine, updateRoutine, getRoutineById} = useContext(RoutineContext)


  const [routine, setRoutine] = useState({
    routineName: "",
    date: 0
  })

  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true);
  const {routineId} = useParams()

  const handleControlledInputChange = (event) => {
    let newRoutine = {...routine}

    let setVal = event.target.value

    newRoutine[event.target.id] = setVal

    setRoutine(newRoutine)
  }


  const handleClickSaveRoutine = () => {
    setIsLoading(true)
    if(routineId){
      updateRoutine({routineName: routine.routineName,
                      id: routine.id,
                      date: routine.date})
      .then(()=> history.push(`/routines/detail/${routine.id}`))
    }else{
      saveRoutine({
        routineName: routine.routineName,
        date: routine.date
      })
      .then(() => history.push("/routines"))
    }
    }
  useEffect(()=>{
    if(routineId){
      getRoutineById(routineId)
      .then(routine => {
        setRoutine(routine)
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
        {routineId ? "Edit Routine" : "Save Routine"}
      </button>
  </form>
)
}