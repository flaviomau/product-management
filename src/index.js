import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Api from './Api'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App Api={Api}/>, document.getElementById('root'))
registerServiceWorker()
