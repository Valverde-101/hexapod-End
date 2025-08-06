import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { DEFAULT_POSE } from "./templates"
import { Nav, NavDetailed, DimensionsWidget } from "./components"
import translations from "./translations"
import { updateHexapod, Page } from "./AppHelpers"
import HexapodPlot from "./components/HexapodPlot"

window.dataLayer = window.dataLayer || []
function gtag() {
    window.dataLayer.push(arguments)
}

class App extends React.Component {
    state = {
        inHexapodPage: false,
        hexapod: updateHexapod("default"),
        revision: 0,
        language: "es",
    }

    /* * * * * * * * * * * * * *
     * Page load Callback
     * * * * * * * * * * * * * */

    toggleLanguage = () =>
        this.setState({ language: this.state.language === "es" ? "en" : "es" })

    onPageLoad = pageKey => {
        const pageName = translations[this.state.language].sections[pageKey]
        document.title = pageName + " - Mithi's Bare Minimum Hexapod Robot Simulator"
        gtag("config", "UA-170794768-1", {
            page_path: window.location.pathname + window.location.search,
        })

        if (pageKey === "landingPage") {
            this.setState({ inHexapodPage: false })
            return
        }

        this.setState({ inHexapodPage: true })
        this.manageState("pose", { pose: DEFAULT_POSE })
    }

    /* * * * * * * * * * * * * *
     * State Management Callback
     * * * * * * * * * * * * * */

    manageState = (updateType, newParam) => {
        const hexapod = updateHexapod(updateType, newParam, this.state.hexapod)

        this.setState({
            revision: this.state.revision + 1,
            hexapod,
        })
    }
    /* * * * * * * * * * * * * *
     * Page Component Prototype
     * * * * * * * * * * * * * */

    pageComponent = Component => (
        <Component
            onMount={this.onPageLoad}
            onUpdate={this.manageState}
            language={this.state.language}
            params={{
                dimensions: this.state.hexapod.dimensions,
                pose: this.state.hexapod.pose,
            }}
        />
    )

    /* * * * * * * * * * * * * *
     * Layout
     * * * * * * * * * * * * * */

    render = () => (
        <Router>
            <Nav language={this.state.language} toggleLanguage={this.toggleLanguage} />
            <div id="main">
                <div id="sidebar">
                    <div hidden={!this.state.inHexapodPage}>
                        <DimensionsWidget
                            params={{ dimensions: this.state.hexapod.dimensions }}
                            onUpdate={this.manageState}
                            language={this.state.language}
                        />
                    </div>
                    <Page pageComponent={this.pageComponent} />
                    {!this.state.inHexapodPage ? (
                        <NavDetailed language={this.state.language} />
                    ) : null}
                </div>
                <div id="plot" className="border" hidden={!this.state.inHexapodPage}>
                    <HexapodPlot
                        revision={this.state.revision}
                        hexapod={this.state.hexapod}
                    />
                </div>
            </div>
            {this.state.inHexapodPage ? (
                <NavDetailed language={this.state.language} />
            ) : null}
        </Router>
    )
}

export default App
