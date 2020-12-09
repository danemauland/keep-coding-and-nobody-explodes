var merge = require('lodash.merge');

export default class Figure {
    constructor(options) {
        this.options = {
            surfaces: [],
        }
        merge(this.options, options)
    }

    get surfaces() {
        return this.options.surfaces;
    }
    
    addSurface(surface) {
        this.options.surfaces.push(surface);
    }

    updatePos() {
        let updatedPoints = {};
        this.surfaces.forEach(surface => {
            surface.updatePos(updatedPoints);
        })
    }

    render(ctx) {
        this.surfaces.forEach(surface => {
            surface.render(ctx);
        })
    }

}