import React from "react"
import "./Routine.css";

export const RoutineCard = (props) => (
    <div className="routine"> 
      <h3 className="routine__name"></h3>      
      {/* <h1>Routines</h1> */}
      <h2 className="routine__name">Routine Name: {props.routine.routineName}</h2>
    </div>
  )