import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
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
} from "./components/pages"

const Page = ({ pageComponent }) => (
    <Switch>
        <Route path="/" exact>
            {pageComponent(LandingPage)}
        </Route>
        <Route path={PATH_NAMES.legPatterns} exact>
            {pageComponent(LegPatternPage)}
        </Route>
        <Route path={PATH_NAMES.forwardKinematics} exact>
            {pageComponent(ForwardKinematicsPage)}
        </Route>
        <Route path={PATH_NAMES.inverseKinematics} exact>
            {pageComponent(InverseKinematicsPage)}
        </Route>
        <Route path={PATH_NAMES.walkingGaits} exact>
            {pageComponent(WalkingGaitsPage)}
        </Route>
        <Route path={PATH_NAMES.armControl} exact>
            {pageComponent(ArmControlPage)}
        </Route>
        <Route>
            <Redirect to="/" />
        </Route>
    </Switch>
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
