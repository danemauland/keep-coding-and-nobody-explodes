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
                x: null,
                y: null,
                z: null,
                scalar: null,
            },
            absolutePos: {
                x: 0,
                y: 0,
                z: 0,
            },
            rotation: {
                xTheta: 0,
                yTheta: 0,
                zTheta: 0,
                xThetaRads: 0,
                yThetaRads: 0,
                zThetaRads: 0,
                posScalar: 0,
                xOmega: 0,
                yOmega: 0,
                zOmega: 0,
                velScalar: 0,
                xAlpha: 0,
                yAlpha: 0,
                zAlpha: 0,
                accScalar: 0,
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
                x: 0,
                y: 0,
                z: 0,
                scalar: 0,
            },
            absolutePos: {
                x: null,
                y: null,
                z: null,
            },
            rotation: {
                xTheta: null,
                yTheta: null,
                zTheta: null,
                xThetaRads: null,
                yThetaRads: null,
                zThetaRads: null,
                posScalar: null,
                xOmega: null,
                yOmega: null,
                zOmega: null,
                velScalar: null,
                xAlpha: null,
                yAlpha: null,
                zAlpha: null,
                accScalar: null,
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

    get absX() {
        return this.absolutePos.x;
    }

    get absY() {
        return this.absolutePos.y;
    }

    get absZ() {
        return this.absolutePos.z;
    }

    get relativePos() {
        return this.options.relativePos;
    }

    get relX() {
        return this.relativePos.x;
    }

    get relY() {
        return this.relativePos.y;
    }

    get relZ() {
        return this.relativePos.z;
    }

    get relScalar() {
        return this.relativePos.scalar;
    }

    get rotation() {
        return this.options.rotation;
    }

    get xTheta() {
        return this.rotation.xTheta;
    }

    get yTheta() {
        return this.rotation.yTheta;
    }

    get zTheta() {
        return this.rotation.zTheta;
    }
    
    get xThetaRads() {
        return this.rotation.xThetaRads;
    }

    get yThetaRads() {
        return this.rotation.yThetaRads;
    }

    get zThetaRads() {
        return this.rotation.zThetaRads;
    }

    get posScalar() {
        return this.rotation.posScalar;
    }

    get xOmega() {
        return this.rotation.xOmega;
    }

    get yOmega() {
        return this.rotation.yOmega;
    }

    get zOmega() {
        return this.rotation.zOmega;
    }

    get velScalar() {
        return this.rotation.velScalar;
    }

    get xAlpha() {
        return this.rotation.xAlpha;
    }

    get yAlpha() {
        return this.rotation.yAlpha;
    }

    get zAlpha() {
        return this.rotation.zAlpha;
    }

    get accScalar() {
        return this.rotation.accScalar;
    }

    get xThetaVelocity() {
        return this.rotation.xTheta;
    }

    get yThetaVelocity() {
        return this.rotation.yTheta;
    }

    get zThetaVelocity() {
        return this.rotation.zTheta;
    }

    get xThetaRadsVelocity() {
        return this.rotation.xTheta;
    }

    get yThetaRadsVelocity() {
        return this.rotation.yTheta;
    }

    get zThetaRadsVelocity() {
        return this.rotation.zTheta;
    }

    get orbitingFigures() {
        return this.options.orbitingFigures;
    }

    updateRelScalar() {
        debugger;
        this.relativePos.scalar += this.center.velScalar;
    }

    updateAbsX() {
        this.absolutePos.x = (
            this.center.absX + 
            this.relScalar * (
                (
                    this.relZ * (
                        Math.cos(this.center.zThetaRads) *
                        Math.sin(this.center.yThetaRads) *
                        Math.cos(this.center.xThetaRads) +
                        Math.sin(this.center.zThetaRads) *
                        Math.sin(this.center.xThetaRads)
                    )
                ) + (
                    this.relY * (
                        Math.cos(this.center.zThetaRads) *
                        Math.sin(this.center.yThetaRads) *
                        Math.sin(this.center.xThetaRads) +
                        - Math.sin(this.center.zThetaRads) *
                        Math.cos(this.center.xThetaRads)
                    )
                ) + (
                    this.relX * 
                    Math.cos(this.center.zThetaRads) *
                    Math.cos(this.center.yThetaRads)
                )
            )
        )
    }

    updateAbsY() {
        this.absolutePos.y = (
            this.center.absY + 
            this.relScalar * (
                (
                    this.relZ * (
                        Math.sin(this.center.zThetaRads) *
                        Math.sin(this.center.yThetaRads) *
                        Math.cos(this.center.xThetaRads) +
                        - Math.cos(this.center.zThetaRads) *
                        Math.sin(this.center.xThetaRads)
                    )
                ) + (
                    this.relY * (
                        Math.sin(this.center.zThetaRads) *
                        Math.sin(this.center.yThetaRads) *
                        Math.sin(this.center.xThetaRads) +
                        Math.cos(this.center.zThetaRads) *
                        Math.cos(this.center.xThetaRads)
                    )
                ) + (
                    this.relX * 
                    Math.sin(this.center.zThetaRads) *
                    Math.cos(this.center.yThetaRads)
                )
            )
        )
    }

    updateAbsZ() {
        this.absolutePos.z = (
            this.center.absZ + 
            this.relScalar * (
                (
                    this.relZ *
                    Math.cos(this.center.xThetaRads) *
                    Math.cos(this.center.yThetaRads)
                ) + (
                    this.relY *
                    Math.sin(this.center.xThetaRads) *
                    Math.cos(this.center.yThetaRads)
                 
                ) + (
                    this.relX * 
                    (-Math.sin(this.center.yThetaRads))
                )
            )
        )
    }

    updateAbsolutePos() {
        this.updateAbsX();
        this.updateAbsY();
        this.updateAbsZ();
    }

    updatePos() {
        this.updateRelScalar();
        this.updateAbsolutePos();
    }

    updateAccScalar() {
        if (this.velScalar > 0) {
            this.rotation.accScalar = -1;
        } else if (this.velScalar < 0) {
            this.rotation.accScalar = 1;
        } else {
            this.rotation.accScalar = 0;
        }
    }

    updateXAlpha() {
        if (this.xOmega > 0) {
            this.rotation.xAlpha = -1;
        } else if (this.xOmega < 0) {
            this.rotation.xAlpha = 1;
        } else {
            this.rotation.xAlpha = 0;
        }
    }

    updateYAlpha() {
        if (this.yOmega > 0) {
            this.rotation.yAlpha = -1;
        } else if (this.yOmega < 0) {
            this.rotation.yAlpha = 1;
        } else {
            this.rotation.yAlpha = 0;
        }
    }

    updateZAlpha() {
        if (this.zOmega > 0) {
            this.rotation.zAlpha = -1;
        } else if (this.zOmega < 0) {
            this.rotation.zAlpha = 1;
        } else {
            this.rotation.zAlpha = 0;
        }
    }

    setVelScalar(scalar) {
        this.rotation.velScalar = scalar;
        this.updateAccScalar();
    }

    setXOmega(omega) {
        this.rotation.xOmega = omega;
        this.updateXAlpha();
    }

    setYOmega(omega) {
        this.rotation.yOmega = omega;
        this.updateYAlpha();
    }

    setZOmega(omega) {
        this.rotation.zOmega = omega;
        this.updateZAlpha();
    }

    setOmegas({
        velScalar = this.radiusVelocity,
        xOmega = this.xOmega,
        yOmega = this.yOmega,
        zOmega = this.zOmega,
    }) {
        this.setVelScalar(velScalar);
        this.setXOmega(xOmega);
        this.setYOmega(yOmega);
        this.setZOmega(zOmega);
    }

    updateVelScalar() {
        if (this.velScalar > 0 !== (
            this.velScalar + this.accScalar > 0)
        ) {
            this.rotation.velScalar = 0;
            this.updateAccScalar();
        } else {
            this.rotation.velScalar += this.accScalar;
        }
    }

    updateXOmega() {
        if (this.xOmega > 0 !== (
            this.xOmega + this.xAlpha > 0)
        ) {
            this.rotation.xOmega = 0;
            this.updateXAlpha();
        } else {
            this.rotation.xOmega = (this.xOmega + this.xAlpha) % 360;
        }
    }

    updateYOmega() {
        if (this.yOmega > 0 !== (
            this.yOmega + this.yAlpha > 0)
        ) {
            this.rotation.yOmega = 0;
            this.updateYAlpha();
        } else {
            this.rotation.yOmega = (this.yOmega + this.yAlpha) % 360;
        }
    }

    updateZOmega() {
        if (this.zOmega > 0 !== (
            this.zOmega + this.zAlpha > 0)
        ) {
            this.rotation.zOmega = 0;
            this.updateZAlpha();
        } else {
            this.rotation.zOmega = (this.zOmega + this.zAlpha) % 360;
        }
    }

    updateOmegas() {
        this.updateVelScalar();
        this.updateXOmega();
        this.updateYOmega();
        this.updateZOmega();
    }

    updatePosScalar() {
        if (this.posScalar > 0 !== (
            this.posScalar + this.velScalar > 0)
        ) {
            this.rotation.posScalar = 0;
        } else {
            this.rotation.posScalar += this.velScalar;
        }
    }

    updateXTheta() {
        this.rotation.xTheta = (this.xTheta + this.xOmega) % 360;
        this.rotation.xThetaRads = toRadians(this.xTheta);
    }

    updateYTheta() {
        this.rotation.yTheta = (this.yTheta + this.yOmega) % 360;
        this.rotation.yThetaRads = toRadians(this.yTheta);
    }

    updateZTheta() {
        this.rotation.zTheta = (this.zTheta + this.zOmega) % 360;
        this.rotation.zThetaRads = toRadians(this.zTheta);
    }

    updateThetas() {
        this.updateOmegas();
        this.updatePosScalar();
        this.updateXTheta();
        this.updateYTheta();
        this.updateZTheta();
    }

    isTransforming() {
        return (
            this.xAlpha ||
            this.yAlpha ||
            this.zAlpha ||
            this.accScalar ||
            this.xOmega ||
            this.yOmega ||
            this.zOmega ||
            this.velScalar
        )
    }

    dist(point) {
        const deltaX = this.absX - point.absX;
        const deltaY = this.absY - point.absY;
        const deltaZ = this.absZ - point.absZ;
        return Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2)
    }

    calcRelative() {
        let relX = this.absX - this.center.absX;
        let relY = this.absY - this.center.absY;
        let relZ = this.absZ - this.center.absZ;
        const relScalar = Math.sqrt(relX * relX + relY * relY + relZ * relZ);
        relX = relX / relScalar;
        relY = relY / relScalar;
        relZ = relZ / relScalar;
        this.relativePos.x = relX;
        this.relativePos.y = relY;
        this.relativePos.z = relZ;
        this.relativePos.scalar = relScalar;
    }

    render(ctx) {
        if (this.isTransforming()) {
            this.updateThetas();
            this.orbitingFigures.forEach(figure => {
                figure.updatePos();
            })
        }
        this.orbitingFigures.forEach(figure => {
            figure.render(ctx);
        })
    }
}