import React from "react"
import "./Workout.css"
import { Link } from "react-router-dom"

export const WorkoutCard = (props) => (
    <section className="workout">
        <h3 className="workout__name">
      <Link to={`/routines/detail/${props.workouts.id}`}>
        {props.workouts.type}
      </Link>
      </h3>
    </section>
)