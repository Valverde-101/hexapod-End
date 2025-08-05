import React, { Component } from "react"
import { sliderList, Card, ResetButton } from "../generic"
import { DEFAULT_POSE, DEFAULT_PATTERN_PARAMS } from "../../templates"
import { ANGLE_NAMES, LEG_NAMES } from "../vars"
import translations from "../../translations"

class LegPatternPage extends Component {
    pageName = "legPatterns"
    state = { patternParams: DEFAULT_PATTERN_PARAMS }

    componentDidMount = () => {
        this.props.onMount(this.pageName)
        this.reset()
    }

    reset = () => {
        this.props.onUpdate("pose", { pose: DEFAULT_POSE })
        this.setState({ patternParams: DEFAULT_PATTERN_PARAMS })
    }

    updatePatternPose = (name, value) => {
        const patternParams = { ...this.state.patternParams, [name]: Number(value) }
        const newPose = { ...DEFAULT_POSE }

        LEG_NAMES.forEach(leg => {
            newPose[leg] = patternParams
        })

        this.props.onUpdate("pose", { pose: newPose })
        this.setState({ patternParams })
    }

    get sliders() {
        return sliderList({
            names: ANGLE_NAMES,
            values: this.state.patternParams,
            handleChange: this.updatePatternPose,
        })
    }

    render = () => {
        const { language } = this.props
        const title = translations[language].sections[this.pageName]
        return (
            <Card title={<h2>{title}</h2>}>
                <div className="grid-cols-1">{this.sliders}</div>
                <ResetButton reset={this.reset} language={language} />
            </Card>
        )
    }
}

export default LegPatternPage
