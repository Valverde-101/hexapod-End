import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { PATH_NAMES } from "./components/vars"
import * as defaults from "./templates"
import { VirtualHexapod } from "./hexapod"
import {
    InverseKinematicsPage,
    WalkingGaitsPage,
    ForwardKinematicsPage,
    LegPatternPage,
    LandingPage,
    ArmControlPage,
    TailControlPage,
} from "./components/pages"

const Page = ({ pageComponent }) => (
    <Routes>
        <Route path="/" element={pageComponent(LandingPage)} />
        <Route
            path={PATH_NAMES.legPatterns}
            element={pageComponent(LegPatternPage)}
        />
        <Route
            path={PATH_NAMES.forwardKinematics}
            element={pageComponent(ForwardKinematicsPage)}
        />
        <Route
            path={PATH_NAMES.inverseKinematics}
            element={pageComponent(InverseKinematicsPage)}
        />
        <Route
            path={PATH_NAMES.walkingGaits}
            element={pageComponent(WalkingGaitsPage)}
        />
        <Route
            path={PATH_NAMES.armControl}
            element={pageComponent(ArmControlPage)}
        />
        <Route
            path={PATH_NAMES.tailControl}
            element={pageComponent(TailControlPage)}
        />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
)

const updateHexapod = (updateType, newParam, oldHexapod) => {
    if (updateType === "default") {
        return new VirtualHexapod(defaults.DEFAULT_DIMENSIONS, defaults.DEFAULT_POSE)
    }

    let hexapod = null
    const { pose, dimensions } = oldHexapod

    if (updateType === "pose") {
        hexapod = new VirtualHexapod(dimensions, newParam.pose)
    }

    if (updateType === "dimensions") {
        hexapod = new VirtualHexapod(newParam.dimensions, pose)
    }

    if (updateType === "hexapod") {
        hexapod = newParam.hexapod
    }

    if (!hexapod || !hexapod.foundSolution) {
        return oldHexapod
    }

    return hexapod
}

export { Page, updateHexapod }
