import React from 'react'
import {Link} from 'react-router-dom'

const Navbar=()=> {

    const LINKS=[
        {to:"/" ,text:"HOME"},
        {to:"/starred" ,text:"STARRED"},
    ]
  return (
    <div>
        <ul>
            {LINKS.map((e)=>{
                 return(
                    <li key={e.to}>
                    <Link to={e.to}>{e.text}</Link>
                    </li>
                 )
            })}
        </ul>
    </div>
  )
}

export default Navbar