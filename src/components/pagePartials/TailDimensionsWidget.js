import React, { Component } from "react"
import { Card, ResetButton, NumberInputField } from "../generic"
import { RANGE_PARAMS } from "../vars"
import { DEFAULT_TAIL_DIMENSIONS } from "../../templates"
import translations from "../../translations"

const SEGMENT_NAMES = [
    "segment1",
    "segment2",
    "segment3",
    "segment4",
    "segment5",
]

class TailDimensionsWidget extends Component {
    updateFieldState = (name, value) => {
        const numberValue = Number(value)
        if (isNaN(numberValue)) {
            return
        }
        const dims = { ...this.props.dimensions }
        if (SEGMENT_NAMES.includes(name)) {
            const index = SEGMENT_NAMES.indexOf(name)
            const segments = [...dims.segments]
            segments[index] = numberValue
            dims.segments = segments
        } else {
            dims[name] = numberValue
        }
        this.props.onUpdate(dims)
    }

    reset = () => this.props.onUpdate(DEFAULT_TAIL_DIMENSIONS)

    render() {
        const { language, dimensions } = this.props
        const sectionName = translations[language].sections.dimensions
        const { minVal, maxVal, stepVal } = RANGE_PARAMS.dimensionInputs
        const segmentFields = SEGMENT_NAMES.map((name, i) => {
            const props = {
                name,
                value: dimensions.segments[i],
                rangeParams: { minVal, maxVal, stepVal },
                handleChange: this.updateFieldState,
            }
            return <NumberInputField key={name} {...props} />
        })
        const thicknessField = (
            <NumberInputField
                key="thickness"
                name="thickness"
                value={dimensions.thickness}
                rangeParams={{ minVal, maxVal, stepVal }}
                handleChange={this.updateFieldState}
            />
        )
        const mountAngleField = (
            <NumberInputField
                key="mountAngle"
                name="mountAngle"
                value={dimensions.mountAngle}
                rangeParams={RANGE_PARAMS.mountAngle}
                handleChange={this.updateFieldState}
            />
        )
        return (
            <Card title={<h3>{sectionName}</h3>}>
                <div className="grid-cols-3">
                    {segmentFields}
                    {thicknessField}
                    {mountAngleField}
                </div>
                <ResetButton reset={this.reset} language={language} />
            </Card>
        )
    }
}

export default TailDimensionsWidget
