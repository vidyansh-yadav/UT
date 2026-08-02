import { EffectComposer,Bloom } from "@react-three/postprocessing";

export default function BloomEffects(){

    return(

        <EffectComposer>

            <Bloom

                intensity={0.55}

                luminanceThreshold={0.25}

                mipmapBlur

            />

        </EffectComposer>

    )

}