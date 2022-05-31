/* eslint-disable no-underscore-dangle */
import React ,{useEffect, useReducer} from 'react'
import {useParams} from 'react-router-dom'
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { getAPI } from '../misc/config';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const Show = () => {
    const {id}=useParams();

    const reducer=(prevState,action)=>{
        switch(action.type){
           case 'FETCH_SUCCESS':{
               return{
                   show:action.show,
                   error:null,
                   isLoading:false
               }
           }

           case 'FETCH_FAILED':{
              return{
                  ...prevState,
                  isLoading:false,
                  error:action.error
              }
           }


           default: 
                return prevState;
        }
    }
    
    const intitalState={
        show:null,
        isLoading:true,
        error:null
    }

    const [{show,isLoading,error},dispatch]= useReducer(reducer,intitalState);
    

    useEffect(()=>{
        let isMounted=true;

        getAPI(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results=>{

        if(isMounted){
            dispatch({type:'FETCH_SUCCESS', show:results} )
        }
            
        }).catch((err)=>{
        if(isMounted){
            dispatch({type:'FETCH_FAILED', error:err.message})
        }
        })
        return(
            ()=>{
                isMounted=false
            }
        )

    },[id])
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