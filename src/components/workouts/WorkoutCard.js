import React from "react"
import "./Workout.css"

export const WorkoutCard = (props) => (
    <section className="workout">
        {/* <h4 className="workout__name">{props.workouts.name}</h4> */}
        <h2 className="workout__type">Workout Type : {props.workouts.type}</h2>
    </section>
)