import { QuadraticBezierLine } from "@react-three/drei";

export default function AttackArc({
    start,
    mid,
    end,
    color="#ff003c"
}){

return(

<>

<QuadraticBezierLine
start={start}
mid={mid}
end={end}
lineWidth={7}
color={color}
transparent
opacity={0.05}
/>

<QuadraticBezierLine
start={start}
mid={mid}
end={end}
lineWidth={2.3}
color={color}
transparent
opacity={0.32}
/>

<QuadraticBezierLine
start={start}
mid={mid}
end={end}
lineWidth={0.8}
color="#ffffff"
transparent
opacity={0.95}
/>

</>

);

}