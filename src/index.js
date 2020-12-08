import "./styles/index.scss";
import Point from "./scripts/point";
import Surface from "./scripts/surface";
import Figure from "./scripts/figure";


document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 4;
    const ctx = canvas.getContext("2d");

    const bomb = new Figure();
    const centerPoint = Point.createCenterPoint({
        absolutePos: {
            x: canvas.width / 2,
            y: canvas.height / 2,
            z: 0,
        },
        rotation: {
            velocity: {
                radius: 0,
                theta: 0,
                phi: 1,
            },
            acceleration: {
                radius: 0,
                theta: 0,
                phi: 0,
            }
        },
        orbitingFigures: [bomb],
    });
    window.centerPoint = centerPoint;
    const point1 = new Point({
        center: centerPoint,
        absolutePos: {
            x: canvas.width / 3,
            y: canvas.height / 3,
            z: 0,
        },
    });
    const point2 = new Point({
        center: centerPoint,
        absolutePos: {
            x: canvas.width / 3 * 2,
            y: canvas.height / 3,
            z: 0,
        },
    });
    const point3 = new Point({
        center: centerPoint,
        absolutePos: {
            x: canvas.width / 3 * 2,
            y: canvas.height / 3 * 2,
            z: 0,
        },
    });
    const point4 = new Point({
        center: centerPoint,
        absolutePos: {
            x: canvas.width / 3,
            y: canvas.height / 3 * 2,
            z: 0,
        },
    });
    point1.calcRelative();
    point2.calcRelative();
    point3.calcRelative();
    point4.calcRelative();
    const cornerPoints = [point1, point2, point3, point4];
    const surface = new Surface({points: cornerPoints});
    bomb.addSurface(surface);
    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        centerPoint.render(ctx)
    }, 20)
})