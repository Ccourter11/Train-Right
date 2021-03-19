import React from "react"
import "./Routine.css";

export const RoutineCard = (props) => (
    <div className="routine"> 
      <h3 className="routine__name"></h3>
      <h2 className="routine__name">Routine Name: {props.routine.routineName}</h2>
      <h3 className="routine__date">Routine Date: {props.routine.date}</h3>
    </div>
  )