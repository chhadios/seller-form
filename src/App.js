import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Seller from "./components/seller";
import './index.css';
const App =()=>(
  
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Seller}/>
    </Switch>
  </BrowserRouter>
)

export default App;
