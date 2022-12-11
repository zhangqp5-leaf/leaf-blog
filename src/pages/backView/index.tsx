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
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    step(ctx, {
      start: {x: WIDTH * Math.random(), y: HEIGHT},
      length: 1,
      theta: -Math.PI / 2,
    })
    step(ctx, {
      start: {x: WIDTH * Math.random(), y: 0},
      length: 1,
      theta: Math.PI / 2,
    })
    step(ctx, {
      start: {x: 0, y: HEIGHT * Math.random()},
      length: 1,
      theta: 0,
    })
    step(ctx, {
      start: {x: WIDTH, y: HEIGHT * Math.random()},
      length: 1,
      theta: Math.PI,
    })
  }
  const pendingTasks: Function[] = [];
  const step = (ctx: CanvasRenderingContext2D, b: Branch, depth=0) => {
    const end = getEndPoint(b)
    drawBranch(ctx, b);
    if ((depth < 4 || Math.random() < 0.5) && depth < WIDTH / 2) {
      pendingTasks.push(() => step(ctx, {
        start: end,
        length: b.length + (Math.random() * 2 - 1),
        theta: b.theta - 0.4 * Math.random()
      }, depth + 1))
    }
    if ((depth < 4 || Math.random() < 0.5) && depth < WIDTH / 2) {
      pendingTasks.push(() => step(ctx, {
        start: end,
        length: b.length + (Math.random() * 2 - 1),
        theta: b.theta + 0.4 * Math.random()
      }, depth + 1));
    }
  }
  const frame = () => {
    const tasks = [...pendingTasks];
    pendingTasks.length = 0;
    tasks.forEach(fn => fn())
  }
  let frameCount = 0;
  function startFrame() {
    requestAnimationFrame(() => {
      frameCount = frameCount + 1
      if (frameCount % 12 === 0) {
        frame();
      }
      startFrame()
    })
  }
  startFrame()
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
    init(ctx);
  })

  return (
    <div className={styles.back}>
      <canvas ref={el} width={window.innerWidth} height={window.innerHeight}></canvas>
    </div>
  )
};

export default BackView;