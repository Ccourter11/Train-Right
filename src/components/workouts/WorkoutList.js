import React, { useEffect, useContext, useState } from "react"
import { WorkoutCard } from "./WorkoutCard"
import "./Workout.css"
import { userStorageKey } from "../auth/authSettings"
import Button from 'react-bootstrap/Button'

// The useContext hook allows you to use data structures and functions that a parent provider,the WorkoutProvider, component exposes.
// To start, you need to import the context object you created in the provider component so that the Context hook can access the objects it exposes
import { WorkoutContext } from "./WorkoutProvider"
import { useHistory } from "react-router-dom" // import from libraries before your local modules


export const WorkoutList = () => {
    // This state changes when `getWorkouts()` is invoked below
    // WorkoutProvider is only passing searchTerms because workoutList only needs to know what the term is
    const { workouts, getWorkouts, searchTerms } = useContext(WorkoutContext)
    // when the component initially loads, workouts is a blank array
    const [filteredWorkouts, setFilteredWorkouts] = useState([])
    
    let currentUser = parseInt(sessionStorage.getItem(userStorageKey))
    let userWorkouts = workouts.filter(workout => currentUser === workout.userId)
    // if the currentUsers id is 3 , return an array of all the workouts that have that userId


    const history = useHistory()

    useEffect(() => {
      // The useEffect hook allows the component to reach out into the world for anything that cannot be handled during render. Here, it is the API call for the workouts
        getWorkouts()
      }, [])
      // This is my dependency array. 
      // Logic within functions only occur when a function is invoked.
      //  Within a React component, useEffect is a function. 
      // After the return, useEffect is automatically invoked and since the dependency array is empty, it only runs the first time the component renders. You can include dependencies in the array to cause the useEffect to run additional times.

        // searchTerms will cause a change
        useEffect(() => {
          if (searchTerms !== "") {
            // If the search field is not blank, display matching workouts
            const subset = userWorkouts.filter(workout => workout.name.toLowerCase().includes(searchTerms.toLowerCase()))
            // The toLowerCase() method returns the calling string value converted to lower case
            setFilteredWorkouts(subset)
          } else {
            // If the search term is blank, display all workouts
            setFilteredWorkouts(userWorkouts)
          }
        }, [searchTerms, workouts])
        // we have to check if searchTerms has changed so we can show the correct list of workouts
        // we are now displaying our filtered array and we dont set that until the useEffect runs
        // this useEffect runs if any data has been changed and this function will put the data in the filteredWorkouts array  
        // may need to remove workouts^

      return (
        <>  
        <h2 className="workouts__title">Workouts</h2>
        <div className="createBtn">
        <Button onClick={() => history.push("/workouts/create")}>
          Create Workout
        </Button>
        </div>
       
        <div className="workouts">
          <div className="typeBtn">
          {/* <Button variant="primary">Primary</Button> */}
          <Button onClick={() => setFilteredWorkouts(userWorkouts.filter(workout=> workout.typeId === 1))}>Upper</Button>
          {/* if the currently logged in user  has any workouts with a type of upper, return them */}
          <Button onClick={() => setFilteredWorkouts(userWorkouts.filter(workout=> workout.typeId === 2))}>Lower</Button>
          {/* if the currently logged in user  has any workouts with a type of lower, return them */}
          </div>          
        {
        filteredWorkouts.map(workout => {
          // workout list is our parent component and passes props (data) to our workoutcard, aka our child component
          return <WorkoutCard key={workout.id} workouts={workout} />
        })
        }
      </div>
      {/* we use the .map() array method to iterate the array of filteredWorkouts and generate HTML for each one by invoking the WorkoutCard component function */}

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