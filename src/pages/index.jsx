import { Route, Routes } from "react-router-dom";
import Users from "./Users";
import ReactQuery from "./ReactQuery";

import React from 'react'

const MainRouters = () => {
    return (
        <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/react-query" element={<ReactQuery />} />
        </Routes>
    )
}

export default MainRouters