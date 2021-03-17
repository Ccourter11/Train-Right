import React, { createContext, useState } from "react"

export const RoutineContext = createContext()

export const RoutineProvider = (props) => {
    const [routines, setRoutines] = useState([])

    const getRoutines = () => {
        return fetch("http://localhost:8088/routines")
        .then(response => response.json())
        .then(setRoutines)
    }

    return (
        <RoutineContext.Provider value={{
            routines, getRoutines
        }}>
            {props.children}
        </RoutineContext.Provider>
    )
}