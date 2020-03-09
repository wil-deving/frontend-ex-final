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
import MenuBar from './../components/MenuBar/MenuBar.js'

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
        // console.log('resolution', window.screen.width)
        // console.log('resolution', window.screen.height)
        var topToMenu = '60px'
        if (window.screen.width <= 480) {
            topToMenu = '120px'
        }

        return (
            <div>
                 <header>
                     <MenuBar />
                 </header>
                <HashRouter>
                    <main style={{margin: topToMenu + ' 1% 20px 1%'}}>
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
                </HashRouter>
            </div>
        )
    }
}
export default App