var merge = require('lodash.merge');
function toRadians(degrees) {
    return degrees * (Math.PI / 180)
}

let pointCount = 0;

export default class Point {

    static createCenterPoint(options) {
        const defaultOptions = {
            center: null,
            relativePos: {
                radius: null,
                theta: null,
                phi: null,
            },
            relativePosRads: {
                theta: null,
                phi: null,
            },
            absolutePos: {
                x: 0,
                y: 0,
                z: 0,
            },
            rotation: {
                velocity: {
                    radius: 0,
                    theta: 0,
                    phi: 0,
                },
                acceleration: {
                    radius: 0,
                    theta: 0,
                    phi: 0,
                }
            },
            orbitingFigures: [],
        }
        merge(defaultOptions, options);
        return new Point(defaultOptions)
    }

    constructor(options) {
        this.options = {
            center: null,
            relativePos: {
                radius: 0,
                theta: 0,
                phi: 0,
            },
            relativePosRads: {
                theta: 0,
                phi: 0,
            },
            absolutePos: {
                x: null,
                y: null,
                z: null,
            },
            rotation: {
                velocity: {
                    radius: null,
                    theta: null,
                    phi: null,
                },
                acceleration: {
                    radius: null,
                    theta: null,
                    phi: null,
                }
            },
            orbitingFigures: null,
        }
        this.id = (pointCount++).toString();
        merge(this.options, options);
    }

    get center() {
        return this.options.center;
    }

    get absolutePos() {
        return this.options.absolutePos;
    }

    get x() {
        return this.absolutePos.x;
    }

    get y() {
        return this.absolutePos.y;
    }

    get z() {
        return this.absolutePos.z;
    }

    get relativePos() {
        return this.options.relativePos;
    }

    get radius() {
        return this.relativePos.radius;
    }

    get relativePosRads() {
        return this.options.relativePosRads;
    }
    
    get phiRads() {
        return this.relativePosRads.phi;
    }

    get thetaRads() {
        return this.relativePosRads.theta;
    }

    get rotationalVelocity() {
        return this.options.rotation.velocity;
    }

    get radiusVelocity() {
        return this.rotationalVelocity.radius;
    }

    get phiVelocity() {
        return this.rotationalVelocity.phi;
    }

    get thetaVelocity() {
        return this.rotationalVelocity.theta;
    }

    get rotationalAcceleration() {
        return this.options.rotation.acceleration;
    }

    get radiusAcceleration() {
        return this.rotationalAcceleration.radius;
    }

    get thetaAcceleration() {
        return this.rotationalAcceleration.theta;
    }

    get phiAcceleration() {
        return this.rotationalAcceleration.phi;
    }

    get orbitingFigures() {
        return this.options.orbitingFigures;
    }

    updateRadius() {
        this.relativePos.radius += this.center.radiusVelocity;
    }

    updatePhi() {
        this.relativePos.phi += this.center.phiVelocity;
        if (this.relativePos.phi > 180) {
            this.relativePos.phi = this.relativePos.phi % 180;
            this.relativePos.theta += 180;
        } else if (this.relativePos.phi < 0) {
            this.relativePos.phi = -this.relativePos.phi;
            this.relativePos.theta += 180;
        }
        this.relativePosRads.phi = toRadians(this.relativePos.phi);
    }

    updateTheta() {
        this.relativePos.theta = ((
            this.relativePos.theta + this.center.thetaVelocity) % 360
        );
        this.relativePosRads.theta = toRadians(this.relativePos.theta);
    }

    updateX() {
        debugger;
        this.absolutePos.x = this.center.x + (
            this.radius * Math.sin(this.phiRads) * Math.cos(this.thetaRads)
        )
    }

    updateZ() {
        this.absolutePos.z = this.center.z + (
            this.radius * Math.sin(this.phiRads) * Math.sin(this.thetaRads)
        )
    }

    updateY() {
        this.absolutePos.y = this.center.y + (
            this.radius * Math.cos(this.phiRads)
        )
    }

    updateRelativePos() {
        this.updateRadius();
        this.updatePhi();
        this.updateTheta();
    }

    updateAbsolutePos() {
        this.updateX();
        this.updateY();
        this.updateZ();
    }

    updatePos() {
        this.updateRelativePos();
        this.updateAbsolutePos();
    }

    updateRadiusAcceleration() {
        if (this.radiusVelocity > 0) {
            this.rotationalAcceleration.radius = -1;
        } else if (this.radiusVelocity < 0) {
            this.rotationalAcceleration.radius = 1;
        } else {
            this.rotationalAcceleration.radius = 0;
        }
    }

    updateThetaAcceleration() {
        if (this.thetaVelocity > 0) {
            this.rotationalAcceleration.theta = -1;
        } else if (this.thetaVelocity < 0) {
            this.rotationalAcceleration.theta = 1;
        } else {
            this.rotationalAcceleration.theta = 0;
        }
    }

    updatePhiAcceleration() {
        if (this.phiVelocity > 0) {
            this.rotationalAcceleration.phi = -1;
        } else if (this.phiVelocity < 0) {
            this.rotationalAcceleration.phi = 1;
        } else {
            this.rotationalAcceleration.phi = 0;
        }
    }

    setRadiusVelocity(radius) {
        this.rotationalVelocity.radius = radius;
        this.updateRadiusAcceleration();
    }

    setThetaVelocity(theta) {
        this.rotationalVelocity.theta = theta;
        this.updateThetaAcceleration();
    }

    setPhiVelocity(phi) {
        this.rotationalVelocity.phi = phi;
        this.updatePhiAcceleration();
    }

    setVelocity({
        radius = this.radiusVelocity,
        theta = this.thetaVelocity,
        phi = this.phiVelocity,
    }) {
        this.setRadiusVelocity(radius);
        this.setThetaVelocity(theta);
        this.setPhiVelocity(phi);
    }

    updateRadiusVelocity() {
        if (this.radiusVelocity > 0 !== (
            this.radiusVelocity + this.radiusAcceleration > 0)
        ) {
            this.rotationalVelocity.radius = 0;
            this.updateRadiusAcceleration();
        } else {
            this.rotationalVelocity.radius = (
                this.radiusVelocity + this.radiusAcceleration
            );
        }
    }

    updateThetaVelocity() {
        if (this.thetaVelocity > 0 !== (
            this.thetaVelocity + this.thetaAcceleration > 0)
        ) {
            this.rotationalVelocity.theta = 0;
            this.updateThetaAcceleration();
        } else {
            this.rotationalVelocity.theta = (
                this.thetaVelocity + this.thetaAcceleration
            );
        }
    }

    updatePhiVelocity() {
        if (this.phiVelocity > 0 !== (
            this.phiVelocity + this.phiAcceleration > 0)
        ) {
            this.rotationalVelocity.phi = 0;
            this.updatePhiAcceleration();
        } else {
            this.rotationalVelocity.phi = (
                this.phiVelocity + this.phiAcceleration
            );
        }
    }

    updateVelocity() {
        this.updateRadiusVelocity();
        this.updateThetaVelocity();
        this.updatePhiVelocity();
    }

    isRotating() {
        return (
            this.phiAcceleration ||
            this.thetaAcceleration ||
            this.radiusAcceleration ||
            this.phiVelocity ||
            this.thetaVelocity ||
            this.radiusVelocity
        )
    }

    calcRelative() {
        const relX = this.x - this.center.x;
        const relY = this.y - this.center.y;
        const relZ = this.z - this.center.z;
        const relRadius = Math.sqrt(relX * relX + relY * relY + relZ * relZ);
        const relTheta = (
            Math.atan(relZ / relX) * 180 / Math.PI + (relX < 0 ? 180 : 0)
        );
        const relPhi = (
            relY ?
            Math.atan(
                Math.sqrt(relX * relX + relZ * relZ) / 
                relY
            ) * 180 / Math.PI + (relY < 0 ? 180 : 0) :
            90
        );
        this.relativePos.radius = relRadius;
        this.relativePos.theta = relTheta;
        this.relativePos.phi = relPhi;
    }

    render(ctx) {
        if (this.isRotating()) {
            this.updateVelocity();
            this.orbitingFigures.forEach(figure => {
                figure.updatePos();
            })
        }
        this.orbitingFigures.forEach(figure => {
            figure.render(ctx);
        })
    }
}