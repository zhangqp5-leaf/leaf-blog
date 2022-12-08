import React, {useState, useEffect, useRef} from "react";
import styles from './index.module.less';

const BackView = () => {

  const el = useRef<HTMLCanvasElement>(null);
  const WIDTH = window.innerWidth, HEIGHT = window.innerHeight;

  interface Point {
    x: number,
    y: number,
  };

  interface Branch {
    start: Point,
    length: number,
    theta: number,
  };

  const init = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#000';
    const branch = {
      start: {x: WIDTH / 2, y: HEIGHT},
      length: 100,
      theta: -Math.PI / 2,
    }
    const end = getEndPoint(branch)
    drawBranch(ctx, branch);
    const leftBranch = {
      start: end,
      length: 100,
      theta: branch.theta - 0.1
    }
    drawBranch(ctx, leftBranch);
    const rightBranch = {
      start: end,
      length: 100,
      theta: branch.theta + 0.1
    }
    drawBranch(ctx, rightBranch);
  }
  const lineTo = (ctx: CanvasRenderingContext2D, p1: Point, p2: Point) => {
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
  }
  const getEndPoint = (b: Branch) => {
    return {
      x: b.start.x + b.length * Math.cos(b.theta),
      y: b.start.y + b.length * Math.sin(b.theta),
    }
  }
  const drawBranch = (ctx: CanvasRenderingContext2D, b: Branch) => {
    lineTo(ctx, b.start, getEndPoint(b));
  }

  useEffect(() => {
    const canvas = el.current!;
    const ctx = canvas.getContext('2d')!;
    console.log(canvas);
    init(ctx);
  })

  return (
    <div className={styles.back}>
      <canvas ref={el} width={window.innerWidth} height={window.innerHeight}></canvas>
    </div>
  )
};

export default BackView;