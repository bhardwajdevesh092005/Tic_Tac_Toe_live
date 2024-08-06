import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Layout from './Layout.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Play from './components/Pages/Play.jsx'
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />} path='/'>
            <Route element={<App />} path='' />
            <Route element={<Play />} path='play/:name' />
        </Route>
    )
)
ReactDOM.createRoot(document.getElementById('root')).render(
        <RouterProvider router={router} />
)