import React, { ComponentType } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthPage, CreateJD, Home, Questionnaires, UserInfo } from './pages'
import JDListing from './pages/JDListing'

type IRoutes = {
    path: string,
    component: ComponentType,
    index?: boolean,
}

// eslint-disable-next-line react-refresh/only-export-components
export const routes: IRoutes[] = [
    {
        path: '/',
        component: AuthPage,
        index: true
    },
    {
        path: "/home",
        component: Home
    },
    {
        path: '/profiles',
        component: UserInfo
    },
    {
        path: "/questions",
        component: Questionnaires
    },
    {
        path:'/list',
        component:JDListing
    },
    {
        path:'/createjd',
        component:CreateJD
    }
]

const AppRouter = () => {
    return (
        <Routes>

            {
                routes.map((item, index) => {
                    return (
                        <Route key={index} path={item.path} Component={item.component} index={item?.index ? true : false} />
                    )
                })
            }

        </Routes>
    )
}

export default AppRouter