import React, { createContext, useState } from "react"

export const RoutineContext = createContext()

export const RoutineProvider = (props) => {
    const [routines, setRoutines] = useState([])


    // getting the array or routines from db
    const getRoutines = () => {
        return fetch("http://localhost:8088/routines")
        .then(response => response.json())
        // from json to JS^
        .then(setRoutines)
        // sets response to the state var [routines]
    }
    const getRoutineById = (id) => {
        return fetch(`http://localhost:8088/routines/${id}?_embed=workoutRoutines`)
            .then(res => res.json())
      }

      const saveRoutine = routines => {
        return fetch("http://localhost:8088/routines", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(routines)
        })
        .then(getRoutines)
      }

      const updateRoutine = routine => {
        return fetch(`http://localhost:8088/routines/${routine.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(routine)
        })
        .then(getRoutines)
      }

      const releaseRoutineWorkout = routineId => {
        return fetch(`http://localhost:8088/workoutRoutines/${routineId}`, {
            method: "DELETE"
        })
            .then(getRoutines)
      }
    return (
        <RoutineContext.Provider value={{
            routines, getRoutines, getRoutineById, saveRoutine, updateRoutine, releaseRoutineWorkout
        }}>
            {props.children}
        </RoutineContext.Provider>
    )
}