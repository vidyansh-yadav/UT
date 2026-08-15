import { EffectComposer,Bloom } from "@react-three/postprocessing";

export default function BloomEffects(){

    return(

        <EffectComposer>

            <Bloom

                intensity={0.8}

                luminanceThreshold={0.1}

                mipmapBlur

            />

        </EffectComposer>

    )

}