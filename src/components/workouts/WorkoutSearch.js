import React, { useContext } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import "./Workout.css"

export const WorkoutSearch = () => {
  const { setSearchTerms } = useContext(WorkoutContext)

  return (
    <>
    <div className="searchBtn">
    <h2>Workout Search:</h2>
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for a workout... " />
        </div>
    </>
  )
} 