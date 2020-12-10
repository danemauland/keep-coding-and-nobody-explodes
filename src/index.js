import "./styles/index.scss";
import Point from "./scripts/point";
import Surface from "./scripts/surface";
import Figure from "./scripts/figure";


document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 4;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;

    const centerPoint = Point.createCenterPoint({
        canvas,
        absolutePos: {
            x: canvas.width / 2,
            y: canvas.height / 2,
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
    });
    window.centerPoint = centerPoint;

    centerPoint.addOrbitingFigure(cp1(centerPoint, canvas));
    
    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        centerPoint.render(ctx);
        requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw)
})

const cp1 = (centerPoint) => {
    const bomb = new Figure();
    const point1 = new Point({
        center: centerPoint,
        absolutePos: {
            x: centerPoint.absX - 100,
            y: centerPoint.absY - 100,
            z: 100,
        },
    });
    const point2 = new Point({
        center: centerPoint,
        absolutePos: {
            x: centerPoint.absX + 100,
            y: centerPoint.absY - 100,
            z: 100,
        },
    });
    const point3 = new Point({
        center: centerPoint,
        absolutePos: {
            x: centerPoint.absX + 100,
            y: centerPoint.absY + 100,
            z: 100,
        },
    });
    const point4 = new Point({
        center: centerPoint,
        absolutePos: {
            x: centerPoint.absX - 100,
            y: centerPoint.absY + 100,
            z: 100,
        },
    });
    const point5 = new Point({
        center: centerPoint,
        absolutePos: {
            x: centerPoint.absX - 100,
            y: centerPoint.absY - 100,
            z: -100,
        },
    });
    const point6 = new Point({
        center: centerPoint,
        absolutePos: {
            x: centerPoint.absX + 100,
            y: centerPoint.absY - 100,
            z: -100,
        },
    });
    const point7 = new Point({
        center: centerPoint,
        absolutePos: {
            x: centerPoint.absX + 100,
            y: centerPoint.absY + 100,
            z: -100,
        },
    });
    const point8 = new Point({
        center: centerPoint,
        absolutePos: {
            x: centerPoint.absX - 100,
            y: centerPoint.absY + 100 ,
            z: -100,
        },
    });
    point1.calcRelative();
    point2.calcRelative();
    point3.calcRelative();
    point4.calcRelative();
    point5.calcRelative();
    point6.calcRelative();
    point7.calcRelative();
    point8.calcRelative();
    const frontSurface = new Surface({points: [point1, point2, point3, point4], fillStyle: "rgba(255,0,0,0.5)"});
    const leftSurface = new Surface({points: [point1, point4, point8, point5], fillStyle: "rgba(0,255,0,0.5)"});
    const rightSurface = new Surface({points: [point2, point3, point7, point6]});
    const topSurface = new Surface({points: [point1, point2, point6, point5], fillStyle: "rgba(255,255,0,0.5)"});
    const bottomSurface = new Surface({points: [point3, point4, point8, point7]});
    const backSurface = new Surface({points: [point5, point6, point7, point8], });
    bomb.addSurface(frontSurface);
    bomb.addSurface(leftSurface);
    bomb.addSurface(rightSurface);
    bomb.addSurface(backSurface);
    bomb.addSurface(topSurface);
    bomb.addSurface(bottomSurface);
    return bomb;
}
