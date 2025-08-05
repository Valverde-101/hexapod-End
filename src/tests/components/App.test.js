import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import App from "../../App"
import { PATH_LINKS, URL_LINKS } from "../../components/vars"

/* * * *
 Navigation Footer
 * * * */

const expectToHaveNav = () => {
    const roles = ["navigation", "contentinfo"]
    roles.map(role => expect(screen.getByRole(role)).toBeInTheDocument())

    const allLinks = [...PATH_LINKS, ...URL_LINKS]
    allLinks.forEach(link => {
        const node = screen.getByRole("link", { name: link.description })
        expect(node).toBeInTheDocument()
    })
}

/* * * *
Default Leg Patterns Page
 * * * */

const expectToHaveDefaultLegPatternsPage = () => {
    const heading = screen.getByRole("heading", { name: "Patrones de patas" })
    expect(heading).toBeInTheDocument()
    const sliderNames = ["alpha", "beta", "gamma"]

    sliderNames.forEach(name => {
        expect(screen.getByLabelText(name)).toBeInTheDocument()
        const node = screen.getByRole("slider", { name })
        expect(node).toHaveAttribute("value", "0")
        expect(node).toHaveAttribute("step", "0.01")
        expect(node).toHaveAttribute("type", "range")
    })
}

/* * * *
Default Inverse Kinematics Page
 * * * */

const expectToHaveDefaultInverseKinematics = () => {
    const heading = screen.getByRole("heading", { name: "Cinemática inversa" })
    expect(heading).toBeInTheDocument()

    const attributes = [
        { key: "value", value: "0" },
        { key: "max", value: "1" },
        { key: "min", value: "-1" },
        { key: "step", value: "0.01" },
        { key: "type", value: "range" },
    ]

    const sliderTranslateNames = ["tx", "ty", "tz"]

    sliderTranslateNames.forEach(name => {
        expect(screen.getByLabelText(name)).toBeInTheDocument()
        const node = screen.getByRole("slider", { name })
        attributes.forEach(attribute => {
            expect(node).toHaveAttribute(attribute.key, attribute.value)
        })
    })

    const sliderRotateNames = ["rx", "ry", "rz", "hipStance", "legStance"]

    sliderRotateNames.forEach(name => {
        const node = screen.getByRole("slider", { name })
        expect(screen.getByLabelText(name)).toBeInTheDocument()
        expect(node).toHaveAttribute("value", "0")
        expect(node).toHaveAttribute("step", "0.01")
        expect(node).toHaveAttribute("type", "range")
    })
}

/* * * *
Default Forward Kinematics Page
 * * * */

const expectToHaveDefaultForwardKinematics = () => {
    const heading = screen.getByRole("heading", { name: "Cinemática directa" })
    expect(heading).toBeInTheDocument()

    const angles = ["alpha", "beta", "gamma"]

    const legs = [
        "rightFront",
        "rightMiddle",
        "rightBack",
        "leftFront",
        "leftMiddle",
        "leftBack",
    ]

    for (const leg of legs) {
        for (const angle of angles) {
            const label = `${leg}-${angle}`
            const node = screen.getByRole((role, node) => {
                return role === "spinbutton" && node.getAttribute("id") === label
            })

            expect(node).toBeInTheDocument()
        }
    }
}

const click = name => fireEvent.click(screen.getByRole("link", { name }))

/* * * *
Application
 * * * */

describe("App", () => {
    beforeEach(() => {
        render(<App />)
    })

    test("Navigates to Leg Patterns page", () => {
        click("Patrones de patas")
        expectToHaveNav()
        expectToHaveDefaultLegPatternsPage()
    })

    test("Navigates to Inverse Kinematics page", () => {
        click("Cinemática inversa")
        expectToHaveNav()
        expectToHaveDefaultInverseKinematics()
    })

    test("Navigates to Forward Kinematics page", () => {
        click("Cinemática directa")
        expectToHaveNav()
        expectToHaveDefaultForwardKinematics()
    })

    test("Navigates to Landing Page", () => {
        click("Inicio")
        const heading = screen.getByRole("heading", {
            name: "Simulador de robot hexápodo mínimo de Mithi",
        })
        expect(heading).toBeInTheDocument()

        const wrongHeadings = [
            "Dimensiones",
            "Patrones de patas",
            "Cinemática inversa",
            "Cinemática directa",
        ]
        wrongHeadings.forEach(name =>
            expect(screen.queryByRole("heading", { name })).toBeNull()
        )

        expectToHaveNav()
    })
})
