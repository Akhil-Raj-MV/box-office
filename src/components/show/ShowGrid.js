import React from 'react'
import ShowCard from './ShowCard'
import IMAGE_NOT_FOUND from '../../images/not-found.png'
import { FlexGrid } from '../styled'

const ShowGrid = ({data}) => {
  return (
    <FlexGrid>
        {
            data.map(({show})=>{
                if(show.image){
                    return(
                        <ShowCard 
                            key={show.id} 
                            id={show.id}
                            name={show.name} 
                            image={show.image? show.image.medium: IMAGE_NOT_FOUND} 
                            summary={show.summary}
                        />
                    )
                }
                    return null
                
            })
        }
    </FlexGrid>
  )
}

export default ShowGrid
