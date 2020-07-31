import React from "react";
import { useSpring, animated } from "react-spring";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Footer = () => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));
  return (
    <animated.div
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}
      className="flex flex-col items-center justify-center h-40 text-gray-800"
    >
      <h1 className="text-lg">
        <span className="font-bold">RollingCode®</span> Proyecto final
      </h1>

      <p className="mt-1 text-md">
        Desarrollado por <span className="font-bold">Pablove®</span> Software
      </p>
    </animated.div>
  );
};
export default Footer;
