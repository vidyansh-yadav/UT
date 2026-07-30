import { Html } from "@react-three/drei";

export default function CountryLabels(){

    return(
        <>

        <Html position={[1.35,0.45,1.25]}>
            <div className="country-label">
                🇮🇳 India
            </div>
        </Html>

        <Html position={[-1.4,0.55,-1.1]}>
            <div className="country-label">
                🇺🇸 USA
            </div>
        </Html>

        <Html position={[1.55,1.0,0.7]}>
            <div className="country-label">
                🇩🇪 Germany
            </div>
        </Html>

        <Html position={[-0.95,-0.65,.6]}>
            <div className="country-label">
                🇸🇬 Singapore
            </div>
        </Html>

        </>
    )

}