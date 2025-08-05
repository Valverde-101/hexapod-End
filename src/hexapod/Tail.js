import Vector from "./Vector"

const degToRad = deg => (deg * Math.PI) / 180
const radToDeg = rad => (rad * 180) / Math.PI

class Tail {
    constructor(
        dimensions = { segments: [20, 20, 20, 20, 20], thickness: 10, mountAngle: 0 },
        originPoint = new Vector(0, 0, 0, "tailBase"),
        pose = { yaw: 0, theta1: 0, theta2: 0, theta3: 0, theta4: 0, theta5: 0 },
        flags = { hasNoPoints: false }
    ) {
        Object.assign(this, { dimensions, pose, originPoint })
        if (flags.hasNoPoints) {
            return
        }
        this.allPointsList = this._computePoints()
    }

    _computePoints() {
        const { segments } = this.dimensions
        const { yaw, theta1, theta2, theta3, theta4, theta5 } = this.pose
        const angles = [theta1, theta2, theta3, theta4, theta5]
        const yawRad = degToRad(yaw)
        let cumulative = 0
        let x = this.originPoint.x
        let y = this.originPoint.y
        let z = this.originPoint.z
        const pts = [this.originPoint]
        angles.forEach((angle, i) => {
            cumulative += degToRad(angle)
            x += segments[i] * Math.cos(cumulative) * Math.cos(yawRad)
            y += segments[i] * Math.cos(cumulative) * Math.sin(yawRad)
            z += segments[i] * Math.sin(cumulative)
            pts.push(new Vector(x, y, z, `tailJoint-${i + 1}`, `t-${i + 1}`))
        })
        return pts
    }

    cloneTrotShift(transformMatrix, tx, ty, tz) {
        return this._doTransform("cloneTrotShift", transformMatrix, tx, ty, tz)
    }

    cloneTrot(transformMatrix) {
        return this._doTransform("cloneTrot", transformMatrix)
    }

    cloneShift(tx, ty, tz) {
        return this._doTransform("cloneShift", tx, ty, tz)
    }

    _doTransform(transformFunction, ...args) {
        const newPointsList = this.allPointsList.map(oldPoint =>
            oldPoint[transformFunction](...args)
        )
        return this._buildClone(newPointsList)
    }

    _buildClone(allPointsList) {
        const clone = new Tail(
            this.dimensions,
            this.originPoint,
            this.pose,
            { hasNoPoints: true }
        )
        clone.allPointsList = allPointsList
        return clone
    }

    forwardKinematics(pose) {
        this.pose = { ...this.pose, ...pose }
        this.allPointsList = this._computePoints()
        return this.tip
    }

    inverseKinematics(target) {
        const dx = target.x - this.originPoint.x
        const dy = target.y - this.originPoint.y
        const dz = target.z - this.originPoint.z
        const yaw = Math.atan2(dy, dx)
        const planarTarget = { x: Math.hypot(dx, dy), z: dz }
        const lengths = this.dimensions.segments
        const angles = [
            this.pose.theta1,
            this.pose.theta2,
            this.pose.theta3,
            this.pose.theta4,
            this.pose.theta5,
        ].map(degToRad)
        const maxIter = 20
        for (let iter = 0; iter < maxIter; iter++) {
            let px = 0
            let pz = 0
            let cum = 0
            const pts = [[0, 0]]
            for (let i = 0; i < lengths.length; i++) {
                cum += angles[i]
                px += lengths[i] * Math.cos(cum)
                pz += lengths[i] * Math.sin(cum)
                pts.push([px, pz])
            }
            for (let j = angles.length - 1; j >= 0; j--) {
                const [jx, jz] = pts[j]
                const [ex, ez] = pts[angles.length]
                const v1x = ex - jx
                const v1z = ez - jz
                const v2x = planarTarget.x - jx
                const v2z = planarTarget.z - jz
                const a1 = Math.atan2(v1z, v1x)
                const a2 = Math.atan2(v2z, v2x)
                angles[j] += a2 - a1
                cum = 0
                px = 0
                pz = 0
                pts.length = 1
                for (let k = 0; k < lengths.length; k++) {
                    cum += angles[k]
                    px += lengths[k] * Math.cos(cum)
                    pz += lengths[k] * Math.sin(cum)
                    pts[k + 1] = [px, pz]
                }
            }
        }
        const newPose = {
            yaw: radToDeg(yaw),
            theta1: radToDeg(angles[0]),
            theta2: radToDeg(angles[1]),
            theta3: radToDeg(angles[2]),
            theta4: radToDeg(angles[3]),
            theta5: radToDeg(angles[4]),
        }
        this.pose = newPose
        this.allPointsList = this._computePoints()
        return newPose
    }

    get tip() {
        return this.allPointsList[this.allPointsList.length - 1]
    }
}

export default Tail

