import React, { Component } from "react"
import LegPoseWidget from "../pagePartials/LegPoseWidgets"
import { Card, ResetButton, ToggleSwitch, NumberInputField, Slider } from "../generic"
import { DEFAULT_POSE, DEFAULT_DIMENSIONS } from "../../templates"
import translations from "../../translations"
import { ARM_DIMENSION_NAMES, RANGE_PARAMS } from "../vars"

class ArmControlPage extends Component {
    pageName = "armControl"
    state = { WidgetType: NumberInputField, selection: "bothSame" }

    componentDidMount = () => this.props.onMount(this.pageName)

    reset = () => {
        const { pose, dimensions } = this.props.params
        const newPose = {
            ...pose,
            leftArm: { ...DEFAULT_POSE.leftArm },
            rightArm: { ...DEFAULT_POSE.rightArm },
        }
        const newDimensions = {
            ...dimensions,
            armCoxia: DEFAULT_DIMENSIONS.armCoxia,
            armFemur: DEFAULT_DIMENSIONS.armFemur,
            armTibia: DEFAULT_DIMENSIONS.armTibia,
        }
        this.props.onUpdate("pose", { pose: newPose })
        this.props.onUpdate("dimensions", { dimensions: newDimensions })
    }

    toggleMode = () => {
        const WidgetType = this.state.WidgetType === Slider ? NumberInputField : Slider
        this.setState({ WidgetType })
    }

    handleSelection = e => this.setState({ selection: e.target.value })

    updatePose = (name, angle, value) => {
        const pose = this.props.params.pose
        const newPose = { ...pose }
        const v = Number(value)
        if (this.state.selection === "left") {
            newPose.leftArm = { ...pose.leftArm, [angle]: v }
        } else if (this.state.selection === "right") {
            newPose.rightArm = { ...pose.rightArm, [angle]: v }
        } else if (this.state.selection === "bothOpposite") {
            newPose.leftArm = { ...pose.leftArm, [angle]: v }
            newPose.rightArm = { ...pose.rightArm, [angle]: -v }
        } else {
            newPose.leftArm = { ...pose.leftArm, [angle]: v }
            newPose.rightArm = { ...pose.rightArm, [angle]: v }
        }
        this.props.onUpdate("pose", { pose: newPose })
    }

    updateDimension = (name, value) => {
        const dimensions = {
            ...this.props.params.dimensions,
            [name]: Number(value),
        }
        this.props.onUpdate("dimensions", { dimensions })
    }

    get dimensionFields() {
        const { minVal, maxVal, stepVal } = RANGE_PARAMS.dimensionInputs
        const dims = this.props.params.dimensions
        return (
            <div className="grid-cols-3">
                {ARM_DIMENSION_NAMES.map(name => (
                    <NumberInputField
                        key={name}
                        name={name}
                        value={dims[name]}
                        rangeParams={{ minVal, maxVal, stepVal }}
                        handleChange={this.updateDimension}
                    />
                ))}
            </div>
        )
    }

    get selectionMenu() {
        const { language } = this.props
        const t = translations[language].arms
        const options = [
            { value: "left", label: t.left },
            { value: "right", label: t.right },
            { value: "bothSame", label: t.bothSame },
            { value: "bothOpposite", label: t.bothOpposite },
        ]
        return (
            <select
                id="armSelection"
                className="input"
                value={this.state.selection}
                onChange={this.handleSelection}
            >
                {options.map(o => (
                    <option value={o.value} key={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        )
    }

    renderWidget = name => (
        <LegPoseWidget
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
            id: "ArmControlSwitch",
            value,
            handleChange: this.toggleMode,
            showValue: true,
        }
        return <ToggleSwitch {...props} />
    }

    render() {
        const { language } = this.props
        const title = translations[language].sections[this.pageName]
        const name = this.state.selection === "right" ? "rightArm" : "leftArm"
        return (
            <Card
                title={<h2>{title}</h2>}
                other={
                    <div>
                        {this.toggleSwitch} {this.selectionMenu}
                    </div>
                }
            >
                <div className="grid-cols-1">{this.renderWidget(name)}</div>
                {this.dimensionFields}
                <ResetButton reset={this.reset} language={language} />
            </Card>
        )
    }
}

export default ArmControlPage
