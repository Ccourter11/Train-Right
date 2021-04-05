import React, { useContext } from "react"
import { WorkoutContext } from "./WorkoutProvider"
import "./Workout.css"

export const WorkoutSearch = () => {
   // WorkoutProvider is only passing setSearchTerms because workoutSearch needs a way to change that state variable
  const { setSearchTerms } = useContext(WorkoutContext)

  return (
    <>
    <div className="searchBtn">
    <h2>Workout Search:</h2>
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        // provide a call back function
        // update the state variable so that it now contains what the user typed in
        placeholder="Search for a workout... " />
        </div>
    </>
  )
} 