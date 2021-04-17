import React, { Component, Suspense, useContext } from "react";
import {
  Route,
  BrowserRouter as Router,
  Link,
  Redirect,
  Switch,
  withRouter,
  HashRouter,
} from "react-router-dom";
import Error404 from "./Error404/Error404.js";
import routes from "./routes.js";
import MenuBar from "./../components/MenuBar/MenuBar.js";
import Home from "./../routes/Home/";
import Login from "./../routes/LogIn/";
import AppContext from "./ContextApp";

class App extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
  }

  loading() {
    return <div>Cargando...</div>;
  }

  render() {
    var topToMenu = "60px";
    if (window.screen.width <= 480) {
      topToMenu = "120px";
    }

    console.log("TTRERE");
    return (
      <div>
        <header>
          <MenuBar />
        </header>
        <HashRouter>
          <main style={{ margin: topToMenu + " 1% 20px 1%" }}>
            <Suspense fallback={this.loading()}>
              <Switch>
                {routes.map((route, idRoute) => {
                  return route.component ? (
                    <Route
                      key={idRoute}
                      exact
                      path={route.path}
                      exact
                      component={route.component}
                    />
                  ) : null;
                })}
                <Route key={"01"} exact path="/" exact component={Home} />
                <Route key={"02"} exact path="/login" exact component={Login} />
                <Route component={Error404} />
              </Switch>
            </Suspense>
          </main>
        </HashRouter>
      </div>
    );
  }
}
export default App;
