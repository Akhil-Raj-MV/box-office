import React ,{memo} from 'react'
import { useLocation } from 'react-router'
import { NavList ,LinkStyled} from './Navs.styled'


const LINKS=[
  {to:"/" ,text:"HOME"},
  {to:"/starred" ,text:"STARRED"},
]

const Navs=()=> {

  const location=useLocation();

  return (
    <div>
        <NavList>
            {LINKS.map((e)=>{
                 return(
                    <li key={e.to}>
                    <LinkStyled className={(e.to === location.pathname)?'active':''} to={e.to}>{e.text}</LinkStyled>
                    </li>
                 )
            })}
        </NavList>
    </div>
  )
}

export default memo(Navs)