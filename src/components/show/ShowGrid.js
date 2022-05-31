import React ,{useCallback}from 'react'
import ShowCard from './ShowCard'
import IMAGE_NOT_FOUND from '../../images/not-found.png'
import { FlexGrid } from '../styled'
import { useShows } from '../../misc/custom-hook'


const ShowGrid = ({data,removeShowFromState}) => {
    const [starredShows,dispatchStarred]=useShows();
    
    const onStarClick = useCallback(
        (showId, isStarred) => {
          if (isStarred) {
            dispatchStarred({ type: 'REMOVE', showId });
            if (removeShowFromState) {
              removeShowFromState(showId);
            }
          } else {
            dispatchStarred({ type: 'ADD', showId });
          }
        },
        [dispatchStarred, removeShowFromState]
      );

  return (
    <FlexGrid>
        {
            data.map(({show})=>{
                const isStarred=starredShows.includes(show.id)

                if(show.image){
                    return(
                        <ShowCard 
                            key={show.id} 
                            id={show.id}
                            name={show.name} 
                            image={show.image? show.image.medium: IMAGE_NOT_FOUND} 
                            summary={show.summary}
                            onStarClick={() => onStarClick(show.id, isStarred)}
                            isStarred={isStarred}
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
