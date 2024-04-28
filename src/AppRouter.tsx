import React, { ComponentType } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, UserInfo } from './pages'

type IRoutes = {
    path: string,
    component: ComponentType
}

const routes: IRoutes[] = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/user',
        component: UserInfo
    }
]

const AppRouter = () => {
    return (
        <Routes>

            {
                routes.map((item, index) => {
                    return (
                        <Route key={index} path={item.path} Component={item.component} />
                    )
                })
            }

        </Routes>
    )
}

export default AppRouter