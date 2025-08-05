import React, { useState } from "react"
import { Card } from "./generic/SmallWidgets"
import { NumberInputField } from "./generic"
import LegPoseWidget from "./pagePartials/LegPoseWidgets"
import { ARM_NAMES } from "./vars"
import translations from "../translations"

const ArmsMenu = ({
    language = "es",
    pose = {},
    onUpdate = () => {},
    WidgetType = NumberInputField,
}) => {
    const t = translations[language]
    const [selectedArm, setSelectedArm] = useState("both")
    const [direction, setDirection] = useState("same")

    const sectionName = t.sections.armsControl
    const renderStacked = WidgetType.name === "Slider"

    const armPoseWidget = name => (
        <LegPoseWidget
            key={name}
            name={name}
            pose={pose[name] || { alpha: 0, beta: 0, gamma: 0 }}
            onUpdate={onUpdate}
            WidgetType={WidgetType}
            renderStacked={renderStacked}
        />
    )

    return (
        <Card title={<h2>{sectionName}</h2>}>
            <div className="grid-cols-2">
                <label className="label">
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
                <label className="label">
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
            <div className="grid-cols-2">
                {ARM_NAMES.map(name => armPoseWidget(name))}
            </div>
        </Card>
    )
}

export default ArmsMenu

