import React ,{useState} from 'react'
import { MainPageLayout } from '../components/MainPageLayout'
import ShowGrid from '../components/show/ShowGrid';
import {getAPI} from '../misc/config'
import ActorGrid from '../components/actor/ActorGrid';
import { useLastQuery } from '../misc/custom-hook';

const Home = () => {
  const [input,setInput] =useLastQuery();
  const [results,setResults]=useState(null);
  const [searchOption,setSearchOption]=useState("shows")

  const isShows=(searchOption==="shows");
  
  const onInputChange=(e)=>{
    setInput(e.target.value);
  }

  const onSearch=()=>{
     getAPI(`/search/${searchOption}?q=${input}`).then(
       r=>setResults(r)
     );
  }

  const onKeyDownHandler=(e)=>{
    if(e.keyCode=== 13){
      onSearch();
    }
  }

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }

    if (results && results.length > 0) {
      return results[0].show
        ? <ShowGrid data={results}/>
        : <ActorGrid data={results}/>
    }

    return null;
  };

  const onRadioChange=(e)=>{
      setSearchOption(e.target.value)
  }

  return (
    <div>
      <MainPageLayout>
        <input type="text" onChange={onInputChange} value={input} onKeyDown={onKeyDownHandler}  placeholder="search for something"/>
        <div>
          <label htmlFor="shows-id">
            shows
            <input 
            onChange={onRadioChange} 
            type="radio" 
            id="shows-id" 
            value="shows"
            checked={isShows}/>
          </label>
          <label htmlFor="actors-id">
            Actors
            <input 
            onChange={onRadioChange} 
            type="radio" 
            id="actors-id"
           value="people"
           checked={!isShows}/>
          </label>
        </div>
        <button type="button" onClick={onSearch}>Search</button>
        {renderResults()}
      </MainPageLayout>
    </div>
  )
}

export default Home