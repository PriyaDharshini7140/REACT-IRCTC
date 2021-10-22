import Navbar from './Components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Footer from './Components/Footer/Footer';
import Availability from './pages/Availability';
import ProtectedRoute from './ProtectedRoute';
import Passenger from './pages/passenger/Passenger';
import Home from './pages/Home/Home';
import Contact from './pages/contactus/Contact';
import Payment from './pages/payment/Payment';
import Freight from './pages/freight/Freight';
import Freightform from './pages/freight/Freightform';
import Update from './pages/freight/Update';
import Pnr from './pages/pnr/pnr';
import Reserved from './pages/pnr/reserved';
import Fareseat from './pages/pnr/fareseat';
import Login from './pages/login/Login';
import BasicTabs from './pages/login/Tabs';
function App() {
  const user = localStorage.getItem("user")
  return (
    <Router>
      <Navbar/>
       <Switch>
      
       <Route  path="/fareseat" component={Fareseat} user={user}/>
       <Route  path="/reserved" component={Reserved} user={user}/>
       <Route  path="/pnr" component={Pnr} user={user}/>
       <Route  path="/update" component={Update} user={user}/>
       <Route  path="/freightform" component={Freightform} user={user}/>
        <Route  path="/freight" component={Freight} user={user}/>
        <Route  path="/payment" component={Payment} user={user}/>
        <Route  path="/passenger" component={Passenger} user={user}/>
        <Route  path="/avail" component={Availability} user={user}/>
        <Route  path="/home" component={Home} user={user}/>
        
        
        <Route path="/contact" component={Contact} /> 
        <Route path="/Register" component={BasicTabs}/>
        <Route path="/" component={Login}/> 
        
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
