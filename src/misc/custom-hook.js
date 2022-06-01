import  {useReducer,useEffect, useState,useCallback, useRef} from 'react'
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
    const setPersistedInput=useCallback(newState=> {
        setInput(newState);
        sessionStorage.setItem(key,JSON.stringify(newState))
    },[key])

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


export function useWhyDidYouUpdate(name, props) {
    // Get a mutable ref object where we can store props ...
    // ... for comparison next time this hook runs.
    const previousProps = useRef();
    useEffect(() => {
      if (previousProps.current) {
        // Get all keys from previous and current props
        const allKeys = Object.keys({ ...previousProps.current, ...props });
        // Use this object to keep track of changed props
        const changesObj = {};
        // Iterate through keys
        allKeys.forEach((key) => {
          // If previous is different from current
          if (previousProps.current[key] !== props[key]) {
            // Add to changesObj
            changesObj[key] = {
              from: previousProps.current[key],
              to: props[key],
            };
          }
        });
        // If changesObj not empty then output to console
        if (Object.keys(changesObj).length) {
          // eslint-disable-next-line no-console
          console.log("[why-did-you-update]", name, changesObj);
        }
      }
      // Finally update previousProps with current props for next hook call
      previousProps.current = props;
    });
  }