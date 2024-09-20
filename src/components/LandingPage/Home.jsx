import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, useGLTF, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';

import LoginForm from './LoginForm';


function Model(props) {
    const { nodes, materials } = useGLTF("/space_rocket.glb");

    return (
        <group {...props} dispose={null}>
            <group name="Sketchfab_Scene">
                <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
                    <group name="Root">
                        <group name="planet001" position={[0, 0.02, -6.33]} rotation={[0.24, -0.55, 0.56]} scale={7} >
                            <mesh name="planet001_1" castShadow receiveShadow geometry={nodes.planet001_1.geometry} material={materials.scene} />
                            <mesh name="planet001_2" castShadow receiveShadow geometry={nodes.planet001_2.geometry} material={materials.scene} />
                        </group>
                    </group>
                </group>
            </group>
        </group>
    );
}
useGLTF.preload("/space_rocket.glb");



export default function Home({ setAuthState }) {
    return (
        <>
            <div className="bg" />
            <h1>
                Interact <span style={{ fontSize: '0.4em' }}>with</span>
                <br />
                <span>Convai AI</span>
            </h1>
            <Canvas dpr={[1.5, 2]} linear shadows>
                <fog attach="fog" args={['#272730', 16, 30]} />
                <ambientLight intensity={0.75} />
                <PerspectiveCamera makeDefault position={[0, 0, 16]} fov={75}>
                    <pointLight intensity={1} position={[-10, -25, -10]} />
                    <spotLight castShadow intensity={2.25} angle={0.2} penumbra={1} position={[-25, 20, -15]} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} />
                </PerspectiveCamera>
                <Suspense fallback={null}>
                    <Model url="/space_rocket.glb" position={[0, 0, 0]} scale={1} />
                </Suspense>
                <OrbitControls autoRotate enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} position={[0, 0, 0]} />
                <Stars radius={500} depth={50} count={1000} factor={10} />
            </Canvas>

            <div className="layer" />
            <Loader />


            <LoginForm setAuthState={setAuthState} />
        </>
    )
}
