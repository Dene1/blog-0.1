import {createRoot} from "react-dom/client"
import "./index.css"
import {Blog} from "./blog.jsx"
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import {store} from "./store/store.js"

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Provider store={store}>
            <Blog/>
        </Provider>
    </BrowserRouter>
)
