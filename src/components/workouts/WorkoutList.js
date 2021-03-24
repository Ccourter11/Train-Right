import React, { useEffect, useContext, useState } from "react"
import { WorkoutCard } from "./WorkoutCard"
import "./Workout.css"


// The useContext hook, @ line 12, allows you to use data structures and functions that a parent provider, for instance the WorkoutProvider @ line 38, component exposes.
// To start, you need to import the context object you created in the provider component so that the Context hook can access the objects it exposes
import { WorkoutContext } from "./WorkoutProvider"
import { useHistory } from "react-router-dom" // import from libraries before your local modules

export const WorkoutList = () => {
    // This state changes when `getWorkouts()` is invoked below
    const { workouts, getWorkouts } = useContext(WorkoutContext)
    const [filteredWorkouts, setFilteredWorkouts] = useState([])


    const history = useHistory()

    useEffect(() => {
      // The useEffect hook allows the component to reach out into the world for anything that cannot be handled during render. Here, it is the API call for the workouts
        getWorkouts()
      }, [])
      // This is my dependency array. 
      // Logic within functions only occur when a function is invoked.
      //  Within a React component, useEffect is a function. 
      // After the return, useEffect is automatically invoked and since the dependency array is empty, it only runs the first time the component renders.
      // You can include dependencies in the array to cause the useEffect to run additional times.

      return (
        <>  
        <h2 className="workouts__title">Workouts</h2>
        <div className="createBtn">
        <button onClick={() => history.push("/workouts/create")}>
          Create Workout
        </button>
        </div>
       

        <div className="workouts">
          <div className="typeBtn">
          <button onClick={() => setFilteredWorkouts(workouts.filter(workout=> workout.type === "Upper"))}>Upper</button>
          <button onClick={() => setFilteredWorkouts(workouts.filter(workout=> workout.type === "Lower"))}>Lower</button>
          </div>
          
        {
        filteredWorkouts.map(workout => {
          return <WorkoutCard key={workout.id} workouts={workout} />
        })
        }
      </div>
      {/* we use the .map() array method to iterate the array of workouts and generate HTML for each one by invoking the WorkoutCard component function */}

      {/* the 'key' and 'workouts' arguments become properties on an object that gets passed as an argument */}
      </>
      )
    }

  //   const theProperties = {
  //     key: workout.id,
  //     workouts: workout
  // }
  // Workout(theProperties)

  // this is the vanilla JS version of the JSX below

  // <WorkoutCard key={workout.id} workouts={workout} />