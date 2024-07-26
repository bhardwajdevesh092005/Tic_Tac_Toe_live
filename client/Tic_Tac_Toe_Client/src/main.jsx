import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Layout from './Layout.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import store from '../src/Store/store.js'
import { Provider } from 'react-redux'
import Login from './components/Pages/Login.jsx'
import SignUp from './components/Pages/SignUp.jsx'
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />} path='/'>
            <Route element={<App />} path='' />
            <Route element={<Login />} path='login' />
            <Route element={<SignUp />} path='signup' />
        </Route>
    )
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)