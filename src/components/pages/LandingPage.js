import React from "react"
import RandomRobotGif from "../pagePartials/RandomRobotGif"
import translations from "../../translations"

class LandingPage extends React.Component {
    pageName = "landingPage"

    componentDidMount = () => this.props.onMount(this.pageName)

    render = () => {
        const { language } = this.props
        const t = translations[language].landing
        return (
            <>
                <div id="landing">
                    <RandomRobotGif />
                    <h1>{t.title}</h1>
                    <p>{t.p1}</p>
                    <p>{t.p2}</p>
                </div>
            </>
        )
    }
}

export default LandingPage
