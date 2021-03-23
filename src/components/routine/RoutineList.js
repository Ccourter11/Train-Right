import React, { useContext, useEffect } from "react"
import { RoutineContext } from "./RoutineProvider"
import { RoutineCard } from "./RoutineCard"
import { useHistory } from "react-router"


export const RoutineList = () => {
  const {routines, getRoutines} = useContext(RoutineContext)

  useEffect(() => {
    getRoutines()
  }, [])

  const history = useHistory()
  return (
    <>
    <h2 className="routines__title">Routines</h2>
        <div className="createBtn">
        <button  onClick={() => history.push("/routines/create")}>
          Create Routine
        </button>
        </div>
    <div className="routines">
      {
      routines.map(routine => {
        return <RoutineCard key={routine.id} routine={routine} />
      })
      }
    </div>
    </>
  )
}