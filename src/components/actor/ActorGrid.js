import React from 'react'
import IMAGE_NOT_FOUND from '../../images/not-found.png'
import { FlexGrid } from '../styled'
import ActorCard from './ActorCard'


const ActorGrid = ({data}) => {
  return (
    <FlexGrid>
      {
        data.map(({person})=>{
          return(
          <ActorCard 
              key={person.id} 
              name={person.name} 
              image={person.image? 
              person.image.medium: IMAGE_NOT_FOUND} 
              gender={person.gender}
              country={person.country? person.country.name:null}
              birthday={person.birthday}
              deathday={person.deathday}
          />
          )
        })
      }


    </FlexGrid>
  )
}

export default ActorGrid