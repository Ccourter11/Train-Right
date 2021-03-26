import React, { useContext, useEffect } from "react"
import { RoutineContext } from "./RoutineProvider"
import { RoutineCard } from "./RoutineCard"
import { useHistory } from "react-router"
import { userStorageKey } from "../auth/authSettings"


export const RoutineList = () => {
  const {routines, getRoutines} = useContext(RoutineContext)
  let currentUser = parseInt(sessionStorage.getItem(userStorageKey))
  let userRoutines = routines.filter(routine => routine.userId === currentUser)
  // 
  // userRoutines is an Array of the current user routines
 
  

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
      userRoutines.map(routine => {
         // we map over the userRoutines array to return the each current users routines only 
        return <RoutineCard key={routine.id} routine={routine} />
      })
      }
    </div>
    </>
  )
}