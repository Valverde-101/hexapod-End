import React from "react"
import { GiCoffeeMug } from "react-icons/gi"
import { FaGithubAlt, FaTimes, FaHome } from "react-icons/fa"
import { GrStatusGoodSmall } from "react-icons/gr"
import translations from "../translations"

const PATH_NAMES = {
    inverseKinematics: "/inverse-kinematics",
    forwardKinematics: "/forward-kinematics",
    legPatterns: "/leg-patterns",
    landingPage: "/",
    walkingGaits: "/walking-gaits",
}

const ANGLE_NAMES = ["alpha", "beta", "gamma"]
const DIMENSION_NAMES = ["front", "side", "middle", "coxia", "femur", "tibia"]
const LEG_NAMES = [
    "leftFront",
    "rightFront",
    "leftMiddle",
    "rightMiddle",
    "leftBack",
    "rightBack",
]

const IK_SLIDERS_LABELS = ["tx", "ty", "tz", "rx", "ry", "rz", "hipStance", "legStance"]

const GAIT_SLIDER_LABELS = [
    "hipSwing",
    "liftSwing",
    "legStance",
    "hipStance",
    "tx",
    "tz",
    "rx",
    "ry",
    "stepCount",
]

/*************
 * RANGE PARAMS
 *************/

const rangeParams = absVal => ({ minVal: -absVal, maxVal: absVal, stepVal: 0.01 })
const RANGES = {
    30: rangeParams(30),
    45: rangeParams(45),
    60: rangeParams(60),
    90: rangeParams(90),
    180: rangeParams(180),
}

const translateInputs = { minVal: -1, maxVal: 1, stepVal: 0.01 }

const RANGE_PARAMS = {
    dimensionInputs: { minVal: 0, maxVal: Infinity, stepVal: 1 },
    tx: translateInputs,
    ty: translateInputs,
    tz: translateInputs,
    rx: RANGES[30],
    ry: RANGES[30],
    rz: RANGES[60],
    legStance: RANGES[90],
    hipStance: RANGES[60],
    alpha: RANGES[90],
    beta: RANGES[180],
    gamma: RANGES[180],
}

const GAIT_RANGE_PARAMS = {
    tx: { minVal: -0.25, maxVal: 0.25, stepVal: 0.01, defaultVal: 0 },
    tz: { minVal: -0.5, maxVal: 0.5, stepVal: 0.01, defaultVal: 0 },
    rx: { minVal: -15, maxVal: 15, stepVal: 0.5, defaultVal: 0 },
    ry: { minVal: -15, maxVal: 15, stepVal: 0.5, defaultVal: 0 },
    legStance: { minVal: -50, maxVal: 50, stepVal: 0.5, defaultVal: 0 },
    hipStance: { minVal: 0, maxVal: 40, stepVal: 0.5, defaultVal: 20 },
    hipSwing: { minVal: 10, maxVal: 40, stepVal: 0.5, defaultVal: 25 },
    liftSwing: { minVal: 10, maxVal: 70, stepVal: 0.5, defaultVal: 40 },
    stepCount: { minVal: 3, maxVal: 7, stepVal: 1, defaultVal: 5 },
}

/*************
 * ICONS
 *************/

const ICON_COMPONENTS = {
    mug: <GiCoffeeMug className="vertical-align" />,
    circle: <GrStatusGoodSmall className="small-icon" />,
    octocat: <FaGithubAlt className="vertical-align" />,
    times: <FaTimes className="vertical-align" />,
    home: <FaHome className="vertical-align" />,
}

/* Default Spanish navigation links for tests and other utilities */
const t = translations.es

const PATH_LINKS = [
    {
        path: PATH_NAMES.inverseKinematics,
        description: t.sections.inverseKinematics,
        icon: ICON_COMPONENTS.circle,
    },
    {
        path: PATH_NAMES.forwardKinematics,
        description: t.sections.forwardKinematics,
        icon: ICON_COMPONENTS.circle,
    },
    {
        path: PATH_NAMES.legPatterns,
        description: t.sections.legPatterns,
        icon: ICON_COMPONENTS.circle,
    },
    {
        path: PATH_NAMES.walkingGaits,
        description: t.sections.walkingGaits,
        icon: ICON_COMPONENTS.circle,
    },
    {
        path: PATH_NAMES.landingPage,
        description: t.sections.landingPage,
        icon: ICON_COMPONENTS.home,
    },
]

const URL_LINKS = [
    {
        url: "https://ko-fi.com/minimithi",
        icon: ICON_COMPONENTS.mug,
        description: t.nav.kofi,
    },
    {
        url: "https://github.com/mithi/hexapod",
        icon: ICON_COMPONENTS.octocat,
        description: t.nav.repo,
    },
]

export {
    PATH_NAMES,
    ANGLE_NAMES,
    DIMENSION_NAMES,
    LEG_NAMES,
    IK_SLIDERS_LABELS,
    GAIT_SLIDER_LABELS,
    RANGE_PARAMS,
    GAIT_RANGE_PARAMS,
    ICON_COMPONENTS,
    PATH_LINKS,
    URL_LINKS,
}

