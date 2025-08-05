import React, { useState } from "react"
import { Card } from "./generic/SmallWidgets"
import translations from "../translations"

const ArmsMenu = ({ language = "es" }) => {
    const t = translations[language]
    const [selectedArm, setSelectedArm] = useState("both")
    const [direction, setDirection] = useState("same")

    const sectionName = t.sections.armsControl

    return (
        <Card title={<h2>{sectionName}</h2>}>
            <div className="grid-cols-2">
                <label>
                    {t.arms.selectArm}
                    <select
                        value={selectedArm}
                        onChange={e => setSelectedArm(e.target.value)}
                    >
                        <option value="left">{t.arms.left}</option>
                        <option value="right">{t.arms.right}</option>
                        <option value="both">{t.arms.both}</option>
                    </select>
                </label>
                <label>
                    {t.arms.direction}
                    <select
                        value={direction}
                        onChange={e => setDirection(e.target.value)}
                    >
                        <option value="same">{t.arms.same}</option>
                        <option value="opposite">{t.arms.opposite}</option>
                    </select>
                </label>
            </div>
        </Card>
    )
}

export default ArmsMenu
