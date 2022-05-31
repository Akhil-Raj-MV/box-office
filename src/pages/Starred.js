import React, { useEffect, useState ,useCallback } from 'react'
import { useShows } from '../misc/custom-hook'
import {MainPageLayout} from '../components/MainPageLayout'
import { getAPI } from '../misc/config';
import ShowGrid from '../components/show/ShowGrid';

export const Starred = () => {

  const [starred]=useShows();

  const [shows,setShows]=useState(null);
  const [isLoading,setIsLoading]=useState(true);
  const [error,setError] =useState(null);

  useEffect(()=>{
    if(starred && starred.length>0){
        const promises=starred.map(showId=> getAPI(`/shows/${showId}`) )
        Promise.all(promises)
        .then(apiData=>apiData.map(show=>({show})))
        .then((results)=>{
          setShows(results);
          setIsLoading(false)
        }).catch((err)=>{
          setError(err.message);
          setIsLoading(false)
        })
    }
    else {setIsLoading(false);}
  },[starred])

  const removeShowFromState = useCallback(showIdToRemove => {
    setShows(currShows => currShows.filter(({ show }) => show.id !== showIdToRemove));
  }, []);

  return (
    <MainPageLayout>
     {isLoading && <div>Loading the shows, Please Wait</div>}
     {error && <div>{error.message}</div>}
     {!isLoading && !shows && <div>No Shows are added</div>}
     {!isLoading && !error && shows && <ShowGrid data={shows} removeShowFromState={removeShowFromState}/>}
    </MainPageLayout>
  )
}
