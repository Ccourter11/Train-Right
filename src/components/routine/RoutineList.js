import React, { useContext, useEffect } from "react"
import { RoutineContext } from "./RoutineProvider"
import { RoutineCard } from "./RoutineCard"


export const RoutineList = () => {
  const {routines, getRoutines} = useContext(RoutineContext)

  useEffect(() => {
    getRoutines()
  }, [])

  return (
    <div className="routines">
      {
      routines.map(routine => {
        return <RoutineCard key={routine.id} routine={routine} />
      })
      }
    </div>
  )
}