import React from "react"
import "./Workout.css"
import { Link } from "react-router-dom"

export const WorkoutCard = (props) => (
    <section className="workout">
        <h3 className="workou__name">
      <Link to={`/workouts/detail/${props.id}`}>
        {props.name}
      </Link>
    </h3>
        {/* <h4 className="workout__name">{props.workouts.name}</h4> */}
        <h2 className="workout__type">Workout: {props.workouts.name}</h2>
        
    </section>
)