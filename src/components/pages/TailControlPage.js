import React, { Component } from "react"
import TailPoseWidget from "../pagePartials/TailPoseWidget"
import { Card, ResetButton, ToggleSwitch, NumberInputField, Slider } from "../generic"
import { DEFAULT_TAIL_POSE, DEFAULT_DIMENSIONS } from "../../templates"
import translations from "../../translations"
import { TAIL_DIMENSION_NAMES, RANGE_PARAMS } from "../vars"

class TailControlPage extends Component {
    pageName = "tailControl"
    state = { WidgetType: NumberInputField }

    componentDidMount = () => this.props.onMount(this.pageName)

    reset = () => {
        const { pose, dimensions } = this.props.params
        const newPose = { ...pose, tail: { ...DEFAULT_TAIL_POSE } }
        const newDimensions = {
            ...dimensions,
            tailSegment1: DEFAULT_DIMENSIONS.tailSegment1,
            tailSegment2: DEFAULT_DIMENSIONS.tailSegment2,
            tailSegment3: DEFAULT_DIMENSIONS.tailSegment3,
            tailSegment4: DEFAULT_DIMENSIONS.tailSegment4,
            tailSegment5: DEFAULT_DIMENSIONS.tailSegment5,
            tailThickness: DEFAULT_DIMENSIONS.tailThickness,
            tailMountAngle: DEFAULT_DIMENSIONS.tailMountAngle,
        }
        this.props.onUpdate("pose", { pose: newPose })
        this.props.onUpdate("dimensions", { dimensions: newDimensions })
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
                {TAIL_DIMENSION_NAMES.map(name => (
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
                {this.dimensionFields}
                <ResetButton reset={this.reset} language={language} />
            </Card>
        )
    }
}

export default TailControlPage
