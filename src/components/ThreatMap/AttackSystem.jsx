import AttackArc from "./AttackArc";
import MovingPacket from "./MovingPacket";
const beamColors=[
"#ff003c",
"#ff3355",
"#ff0055",
"#ff4466"
];
const attacks = [
  {
    id: 1,
    start: [-1.35, 0.55, 0.75],
    mid: [-0.3, 2.25, 1.15],
    end: [1.25, 0.45, 0.9],
    speed: 0.12,
    delay: 0,
  },
  {
    id: 2,
    start: [1.2, 0.3, 0.95],
    mid: [0.2, 2.0, 1.3],
    end: [-1.25, 0.1, 0.9],
    speed: 0.15,
    delay: 0.2,
  },
  {
    id: 3,
    start: [-1.15, -0.45, 1.0],
    mid: [0, 1.7, 1.45],
    end: [1.25, -0.25, 0.85],
    speed: 0.18,
    delay: 0.4,
  },
  {
    id: 4,
    start: [0.9, -0.75, 1.0],
    mid: [-0.2, 1.65, 1.5],
    end: [-1.15, 0.55, 0.9],
    speed: 0.13,
    delay: 0.6,
  },
  {
    id: 5,
    start: [-0.65, 1.2, 0.9],
    mid: [0.6, 2.1, 1.3],
    end: [1.3, -0.15, 0.8],
    speed: 0.2,
    delay: 0.8,
  },
  {
    id: 6,
    start: [1.25, 0.65, 0.75],
    mid: [0, 2.35, 1.1],
    end: [-0.85, -0.85, 0.95],
    speed: 0.16,
    delay: 0.1,
  },
  {
    id: 7,
    start: [-1.3, 0.15, 0.9],
    mid: [0.4, 1.9, 1.45],
    end: [0.95, 0.9, 0.85],
    speed: 0.14,
    delay: 0.35,
  },
  {
    id: 8,
    start: [-0.4, -1.15, 0.9],
    mid: [0.8, 1.45, 1.5],
    end: [1.2, 0.5, 0.85],
    speed: 0.19,
    delay: 0.55,
  },
  {
    id: 9,
    start: [0.35, 1.25, 0.85],
    mid: [-0.8, 2.15, 1.35],
    end: [-1.25, -0.2, 0.9],
    speed: 0.17,
    delay: 0.75,
  },
  {
    id: 10,
    start: [1.15, -0.55, 0.95],
    mid: [0.1, 1.9, 1.55],
    end: [-1.05, 0.7, 0.85],
    speed: 0.21,
    delay: 0.9,
  },
  
];

export default function AttackSystem() {
  return (
    <group>
      {attacks.map((attack) => (
        <group key={attack.id}>

          <AttackArc
            start={attack.start}
            mid={attack.mid}
            end={attack.end}
          />

          <MovingPacket
            start={attack.start}
            mid={attack.mid}
            end={attack.end}
            speed={attack.speed}
            delay={attack.delay}
          />

        </group>
      ))}
    </group>
    
  );
}