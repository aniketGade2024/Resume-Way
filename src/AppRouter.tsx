import React, { ComponentType } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Questionnaires, UserInfo } from './pages'

type IRoutes = {
    path: string,
    component: ComponentType,
    index?: boolean,
}

// eslint-disable-next-line react-refresh/only-export-components
export const routes: IRoutes[] = [
    {
        path: '/',
        component: Home,
        index: true
    },
    {
        path: '/profiles',
        component: UserInfo
    },
    {
        path: "/questions",
        component: Questionnaires
    }
]

const AppRouter = () => {
    return (
        <Routes>

            {
                routes.map((item, index) => {
                    return (
                        <Route key={index} path={item.path} Component={item.component} index={item?.index ? true : false}  />
                    )
                })
            }

        </Routes>
    )
}

export default AppRouter