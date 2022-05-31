/* eslint-disable no-underscore-dangle */
import React from 'react'
import {useParams} from 'react-router-dom'
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { InfoBlock, ShowPageWrapper } from './Show.styled';
import { useShow } from '../misc/custom-hook';

const Show = () => {
    const {id}=useParams();

    const {show,isLoading,error}=useShow(id);
    
    if(isLoading || !show){
        return(
            <div>
                <h4>Data is being Loaded. Please Wait</h4>
            </div>
        )
    }
    if(error){
        return(
            <div>
                <h4>{error}</h4>
            </div>
        )
    }
    return(
        <ShowPageWrapper>
            <ShowMainData 
                    image={show.image} 
                    name={show.name} 
                    rating={show.rating} 
                    summary={show.summary} 
                    tags={show.genres}
            />
            <InfoBlock>
                <h2>Details</h2>
                <Details status={show.status} network={show.network} premiered={show.premiered}/>
            </InfoBlock>
            <InfoBlock>
                <h2>Seasons</h2>
                <Seasons seasons={show._embedded.seasons} />
            </InfoBlock>
            <InfoBlock>
                <h2>Cast</h2>
                <Cast cast={show._embedded.cast} />
            </InfoBlock>
           
        </ShowPageWrapper>
    )


}

export default Show