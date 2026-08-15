import { QuadraticBezierLine } from "@react-three/drei";

export default function AttackArc({
  start,
  mid,
  end,
  color = "#ff003c",
}) {
  return (
    <>
      {/* Outer Glow */}
      <QuadraticBezierLine
        start={start}
        mid={mid}
        end={end}
        color={color}
        lineWidth={6}
        transparent
        opacity={0.06}
      />

      {/* Main Beam */}
      <QuadraticBezierLine
        start={start}
        mid={mid}
        end={end}
        color={color}
        lineWidth={2}
        transparent
        opacity={0.35}
      />

      {/* White Core */}
      <QuadraticBezierLine
        start={start}
        mid={mid}
        end={end}
        color="#ffffff"
        lineWidth={0.6}
        transparent
        opacity={0.95}
      />
    </>
  );
}