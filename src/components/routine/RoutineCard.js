import React from "react"
import "./Routine.css";
import { Link } from "react-router-dom"

export const RoutineCard = (props) => (
    <div className="routine"> 
      <h3 className="routine__name"></h3>
      {/* <Link to={`/routines/detail/${props.routines.id}`}>
        {props.routines.routineName}
      </Link> */}
      <h2 className="routine__name">Routine Name: {props.routine.routineName}</h2>
      <h3 className="routine__date">Routine Date: {props.routine.date}</h3>
    </div>
  )