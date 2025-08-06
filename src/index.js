import React, { Suspense } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
//import "./font.css"
import * as serviceWorker from "./serviceWorker"

const App = React.lazy(() =>
    import(/* webpackChunkName: "APP", webpackPreload: true */ "./App")
)

const root = createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <Suspense fallback={<p>Mithi's Bare Minimum Hexapod Robot Simulator...</p>}>
            <App />
        </Suspense>
    </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
