var merge = require('lodash.merge');
export default class Surface {
    constructor(options) {
        this.options = {
            points: [],
            fillStyle: "rgba(0,0,0,0)",
            strokeStyle: "rgba(0,0,0,1)",
        }
        merge(this.options, options);
    }

    get points() {
        return this.options.points;
    }

    addPoint(point) {
        this.points.push(point);
    }

    setFillStyle(style) {
        this.options.fillStyle = style;
    }

    setStrokeStyle(style) {
        this.options.strokeStyle = style;
    }

    updatePos(updatedPoints) {
        this.points.forEach(point => {
            if (!updatedPoints[point.id]) {
                point.updatePos();
                updatedPoints[point.id] = true;
            }
        })
    }

    render(ctx) {
        debugger;
        ctx.beginPath();
        //TODO: update to use 2D projected coordinates
        // if (this.options.id === "1") console.log(this.points[0].dist(window.centerPoint));
        ctx.moveTo(this.points[0].proX, this.points[0].proY);
        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].proX, this.points[i].proY)
        }
        ctx.closePath();
        ctx.strokeStyle = this.options.strokeStyle;
        ctx.fillStyle = this.options.fillStyle;
        ctx.fill();
        ctx.stroke();
    }
}