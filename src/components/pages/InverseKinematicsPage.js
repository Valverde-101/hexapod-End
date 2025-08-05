import React, { Component } from "react"
import { sliderList, Card, ResetButton, AlertBox } from "../generic"
import { solveInverseKinematics } from "../../hexapod"
import { IK_SLIDERS_LABELS } from "../vars"
import { DEFAULT_IK_PARAMS } from "../../templates"
import PoseTable from "../pagePartials/PoseTable"
import translations from "../../translations"
import ArmsMenu from "../ArmsMenu"

class InverseKinematicsPage extends Component {
    pageName = "inverseKinematics"
    state = { ikParams: DEFAULT_IK_PARAMS, errorMessage: null }

    componentDidMount = () => this.props.onMount(this.pageName)

    reset = () => {
        const result = solveInverseKinematics(
            this.props.params.dimensions,
            DEFAULT_IK_PARAMS
        )
        this.updateHexapodPlot(result.hexapod, DEFAULT_IK_PARAMS)
    }

    updateHexapodPlot = (hexapod, ikParams) => {
        this.setState({ ikParams, errorMessage: null })
        this.props.onUpdate("hexapod", { hexapod })
    }

    updateIkParams = (name, value) => {
        const ikParams = { ...this.state.ikParams, [name]: value }
        const result = solveInverseKinematics(this.props.params.dimensions, ikParams)

        if (!result.obtainedSolution) {
            this.props.onUpdate("hexapod", { hexapod: null })
            this.setState({ errorMessage: result.message })
            return
        }

        this.updateHexapodPlot(result.hexapod, ikParams)
    }

    get sliders() {
        return sliderList({
            names: IK_SLIDERS_LABELS,
            values: this.state.ikParams,
            handleChange: this.updateIkParams,
        })
    }

    updatePose = (name, angle, value) => {
        const pose = this.props.params.pose
        const newPose = {
            ...pose,
            [name]: { ...pose[name], [angle]: value },
        }
        this.props.onUpdate("pose", { pose: newPose })
    }

    get additionalInfo() {
        if (this.state.errorMessage) {
            return <AlertBox info={this.state.errorMessage} />
        }

        return <PoseTable pose={this.props.params.pose} />
    }

    render = () => {
        const { language } = this.props
        const title = translations[language].sections[this.pageName]
        return (
            <>
                <Card title={<h2>{title}</h2>}>
                    <div className="grid-cols-3">{this.sliders.slice(0, 6)}</div>
                    <div className="grid-cols-2">{this.sliders.slice(6, 8)}</div>
                    <ResetButton reset={this.reset} language={language} />
                    {this.additionalInfo}
                </Card>
                <ArmsMenu
                    language={language}
                    pose={this.props.params.pose}
                    onUpdate={this.updatePose}
                />
            </>
        )
    }
}

export default InverseKinematicsPage
