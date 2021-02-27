import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./Pages/Home/home";
import MovieInfo from "./Pages/MovieInfo/movieinfo";
import Favourites from "./Pages/Favourites/favourites"

const history = createBrowserHistory();
function App() {
  return (  
    <Router history={history}>
         <Switch>
                <Route path="/movieinfo/:id" component={MovieInfo} />
                <Route path="/favourites" component={Favourites} />
                <Route path="/" component={Home} />
              </Switch>
    </Router>
    
  );
}

export default App;
