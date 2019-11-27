import Plot from './plot';

/**
 * Dot plot
 */
export default class DotPlot extends Plot {
  /**
   * @returns {string} plot color
   */
  get color() {
    return this.options.color || '#012';
  }

  /**
   * @returns {number} line width
   */
  get lineWidth() {
    return this.options.width || 1;
  }

  /**
   * Renders dot plot to canvas context
   * @param {CanvasRenderingContext2D} ctx canvas context instance
   * @param {d3.scale} scale y-scale
   */
  plot(ctx, scale) {
    const {
      scale: xscale,
      data: plotdata,
      color,
      options,
    } = this;

    if (!xscale || options.hidden) return;

    const r = options.radius || Math.min(5, xscale.range()[1] * 0.04);

    ctx.save();

    ctx.fillStyle = color;
    const arcL = Math.PI * 2;
    plotdata.forEach(d => {
      if (!options.defined(d[1], d[0])) return;

      ctx.beginPath();
      if (options.horizontal) {
        ctx.arc(scale(d[0]), xscale(d[1]), r, 0, arcL);
      } else {
        ctx.arc(xscale(d[1]), scale(d[0]), r, 0, arcL);
      }
      ctx.fill();
    });

    ctx.restore();
  }
}
