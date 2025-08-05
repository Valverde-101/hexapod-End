import React, { Component } from "react"
import NumberInputField from "./generic/NumberInputField"
import { Card, ResetButton, ToggleSwitch } from "./generic/SmallWidgets"
import { DEFAULT_DIMENSIONS } from "../templates"
import { DIMENSION_NAMES, RANGE_PARAMS } from "./vars"
import translations from "../translations"

class DimensionsWidget extends Component {
    sectionKey = "dimensions"
    state = { isFine: true }

    reset = () => this.props.onUpdate("dimensions", { dimensions: DEFAULT_DIMENSIONS })

    toggleMode = () => this.setState({ isFine: !this.state.isFine })

    updateFieldState = (name, value) => this.updateDimensions(name, value)

    updateDimensions = (name, value) => {
        const dimensions = { ...this.props.params.dimensions, [name]: value }
        this.props.onUpdate("dimensions", { dimensions })
    }

    get toggleSwitch() {
        const props = {
            id: "DimensionsWidgetSwitch",
            value: this.state.isFine ? "1x" : "5x",
            handleChange: this.toggleMode,
            showValue: true,
        }

        return <ToggleSwitch {...props} />
    }

    get NumberInputFields() {
        const { minVal, maxVal } = RANGE_PARAMS.dimensionInputs
        const stepVal = this.state.isFine ? 1 : 5
        const dimensions = this.props.params.dimensions

        const numberInputFields = DIMENSION_NAMES.map(name => {
            const props = {
                name,
                value: dimensions[name],
                rangeParams: { minVal, maxVal, stepVal },
                handleChange: this.updateFieldState,
            }

            return <NumberInputField {...props} key={name} />
        })

        return <div className="grid-cols-6">{numberInputFields}</div>
    }

    render = () => {
        const { language = "es" } = this.props
        const sectionName = translations[language].sections[this.sectionKey]
        return (
            <Card title={<h2>{sectionName}</h2>} other={this.toggleSwitch}>
                {this.NumberInputFields}
                <ResetButton reset={this.reset} language={language} />
            </Card>
        )
    }
}

export default DimensionsWidget
