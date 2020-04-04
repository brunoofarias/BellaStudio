import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom/'
import { theme } from './theme'
import App from './App'
import store from './store'
import * as serviceWorker from './serviceWorker'

const supportsHistory = 'pushState' in window.history

ReactDOM.render(
    <HashRouter forceRefresh={!supportsHistory}>
        <Provider store={store} >
            <MuiThemeProvider theme={theme}>
                <App/>
            </MuiThemeProvider>
        </Provider>
    </HashRouter>, 
    document.getElementById('root')
)

serviceWorker.register()
