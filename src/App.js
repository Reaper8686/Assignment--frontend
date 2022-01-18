import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./core/Home";
import Login from "./user/Login";
import Register from "./user/Register";
import Cart from "./core/Cart";
import PaymentForm from "./core/PaymentForm";
import Profile from "./user/Profile";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/order" exact component={PaymentForm} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
