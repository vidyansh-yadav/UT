V7.7 Cyber Operator collision fix.

Replace:
src/components/CyberOperator/CyberOperator.jsx
src/components/CyberOperator/CyberOperator.css
src/components/CyberOperator/OperatorScene.jsx
src/components/CyberOperator/OperatorController.jsx

Keep:
public/models/operator/operator.glb

Main fixes:
- Chair back rotated to the camera-facing side.
- Chair is visible with graphite/teal material and green accent.
- Desk, keyboard, mouse and CPU are brighter and easier to read.
- Lightweight AABB collision keeps the operator from crossing the desk.
- Walk clip supplies body motion; outer transform supplies collision-safe locomotion.
- Sit position is fixed at the chair seat, not inside the desk.
- Cinematic camera stays on a 3/4 rear view so operator, chair and workstation remain visible.
- No extra physics package or heavy asset.
