import { QuadraticBezierLine } from "@react-three/drei";

export default function AttackArc({
  start,
  mid,
  end,
  color = "#ff174f",
}) {
  return (
    <>
      {/* subtle outer glow */}
      <QuadraticBezierLine
        start={start}
        mid={mid}
        end={end}
        color={color}
        lineWidth={4}
        transparent
        opacity={0.08}
      />

      {/* main attack beam */}
      <QuadraticBezierLine
        start={start}
        mid={mid}
        end={end}
        color={color}
        lineWidth={1.2}
        transparent
        opacity={0.75}
      />
    </>
  );
}