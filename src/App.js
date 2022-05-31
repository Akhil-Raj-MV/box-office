import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './pages/Home'
import { Starred } from './pages/Starred';
import Show from './pages/Show'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/starred">
          <Starred/>
        </Route>
        <Route exact path="/show/:id">
            <Show/>  
         </Route>
        <Route>
          OOPS... 404 ERROR
        </Route>
      </Switch>
    </div>
  );
}

export default App;
