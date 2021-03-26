import React from "react"
import "./Routine.css";
import { Link } from "react-router-dom"

export const RoutineCard = (props) => (
    <div className="routineCard"> 
    {/* <h1>Routine Card</h1> */}
      <h1 className="routine__name">
      <Link to={`/routines/detail/${props.routine.id}`}>
        {props.routine.routineName}
      </Link>
      </h1>
      <h1 className="routine__date">{props.routine.date}</h1>
      <h3></h3>
    </div>
  )