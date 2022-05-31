import  {useReducer,useEffect, useState} from 'react'
import { getAPI } from './config'

function showsReducer(prevState,action){
    switch(action.type){
        case 'ADD':{
            return [...prevState,action.showId]
        }
        case 'REMOVE':{
            return prevState.filter((showId)=>{
                return(
                    showId!==action.showId
                )
            })
        }


        default: return prevState
    }
}

function usePersistedReducer(reducer,initialState,key){
    const [state,dispatch]=useReducer(reducer,initialState,(initial)=>{
        const persisted=localStorage.getItem(key);

        return persisted?JSON.parse(persisted):initial;
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(state))
    },[key,state])

    return [state,dispatch]
}


export function useShows(key='shows'){
    return usePersistedReducer(showsReducer,[],key);
}

export function useLastQuery(key='lastQuery'){
    const [input, setInput]=useState(()=>{
        const persisted=sessionStorage.getItem(key);
        return persisted? JSON.parse(persisted):""
    });
    const setPersistedInput=newState=> {
        setInput(newState);
        sessionStorage.setItem(key,JSON.stringify(newState))
    };
    return [input,setPersistedInput]
}

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

export function useShow(showId){

    const intitalState={
        show:null,
        isLoading:true,
        error:null
    }

    const [state,dispatch]= useReducer(
        reducer,
        intitalState);
    

    useEffect(()=>{
        let isMounted=true;

        getAPI(`/shows/${showId}?embed[]=seasons&embed[]=cast`).then(results=>{

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

    },[showId])

    return state;
}