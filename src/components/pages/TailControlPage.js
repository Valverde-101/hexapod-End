import React, { Component } from "react"
import TailPoseWidget from "../pagePartials/TailPoseWidget"
import { Card, ResetButton, ToggleSwitch, NumberInputField, Slider } from "../generic"
import { DEFAULT_TAIL_POSE } from "../../templates"
import translations from "../../translations"

class TailControlPage extends Component {
    pageName = "tailControl"
    state = { WidgetType: NumberInputField }

    componentDidMount = () => this.props.onMount(this.pageName)

    reset = () => {
        const pose = this.props.params.pose
        const newPose = { ...pose, tail: { ...DEFAULT_TAIL_POSE } }
        this.props.onUpdate("pose", { pose: newPose })
    }

    toggleMode = () => {
        const WidgetType = this.state.WidgetType === Slider ? NumberInputField : Slider
        this.setState({ WidgetType })
    }

    updatePose = (name, angle, value) => {
        const pose = this.props.params.pose
        const tail = { ...pose.tail, [angle]: value }
        const newPose = { ...pose, tail }
        this.props.onUpdate("pose", { pose: newPose })
    }

    renderWidget = name => (
        <TailPoseWidget
            key={name}
            name={name}
            pose={this.props.params.pose[name]}
            onUpdate={this.updatePose}
            WidgetType={this.state.WidgetType}
            renderStacked={this.state.WidgetType === Slider}
        />
    )

    get toggleSwitch() {
        const { language } = this.props
        const value =
            this.state.WidgetType === Slider
                ? translations[language].forwardKinematics.slide
                : translations[language].forwardKinematics.input
        const props = {
            id: "TailControlSwitch",
            value,
            handleChange: this.toggleMode,
            showValue: true,
        }
        return <ToggleSwitch {...props} />
    }

    render() {
        const { language } = this.props
        const title = translations[language].sections[this.pageName]
        return (
            <Card title={<h2>{title}</h2>} other={this.toggleSwitch}>
                <div className="grid-cols-1">{this.renderWidget("tail")}</div>
                <ResetButton reset={this.reset} language={language} />
            </Card>
        )
    }
}

export default TailControlPage

