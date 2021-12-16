import Home from "./components/home/Home";
import Single_post from "./components/single_post/Single_post";
import Topbar from "./components/topbar/Topbar";
import Write from "./components/write/Write";
import Login from './components/login/Login';
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useContext } from "react";
import { Context } from "./context/Context";


function App() {
  const { user } = useContext(Context);
  return (
    <Router>
    <Topbar/>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route exact path="/login">{user ? <Home/>:<Login/>}</Route>
        <Route exact path="/register">{user ? <Home/>:<Register/>}</Route>
        <Route exact path="/write">{user ? <Write/>:<Register/>}</Route>
        <Route exact path="/post/:id"><Single_post/></Route>
        <Route exact path="/profile"><Profile/></Route>
      </Switch>
    </Router>
  );
}

export default App;
