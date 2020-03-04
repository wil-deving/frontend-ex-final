import React, { Component, Suspense } from 'react'
import {
    Route,
    BrowserRouter as Router,
    Link,
    Redirect,
    Switch,
    HashRouter
} from 'react-router-dom'
import Error404 from './Error404/Error404.js'
import routes from './routes.js'

class App extends Component {

    constructor(props) {
        super(props)
    }

    loading () {
        return(
            <div>Cargando...</div>
        )
    }

    render () {
        // console.log('RenderApp', this, window, window.ConfigApp, routes)
        return (
            <HashRouter>
                <div>
                    <main>
                        <Link to="/"><span>Home</span></Link>
                        <Link to="/test"><span>Test</span></Link>
                        <Suspense fallback={this.loading()}>
                            <Switch>
                                {
                                    routes.map((route, idRoute) => {
                                        return route.component ? (
                                            <Route key={idRoute}
                                                exact path={route.path}
                                                exact component={route.component} />
                                        )
                                        : (null)
                                    })
                                }
                                <Route component={Error404} />
                            </Switch>
                        </Suspense>

                    </main>
                </div>
            </HashRouter>
        )
    }
}
export default App