import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./core/Home";
import Login from "./user/Login";
import Register from "./user/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
