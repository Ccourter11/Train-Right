import React, { createContext, useState } from "react"

export const RoutineContext = createContext()

export const RoutineProvider = (props) => {
    const [routines, setRoutines] = useState([])

    const getRoutines = () => {
        return fetch("http://localhost:8088/routines")
        .then(response => response.json())
        .then(setRoutines)
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
    return (
        <RoutineContext.Provider value={{
            routines, getRoutines, getRoutineById, saveRoutine, updateRoutine
        }}>
            {props.children}
        </RoutineContext.Provider>
    )
}