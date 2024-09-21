import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, Environment, OrbitControls, Html } from '@react-three/drei';
import { MariaWorrierModel } from '../Characters/MariaWorrier';
// import { ConvaiClient } from 'convai-web-sdk';
import { SETTINGS } from '../../constants';
import { NancyModel } from '../Characters/Nancy';
import { ExplorerModel } from '../Characters/Explorer';

// const convaiClient = new ConvaiClient({
//     apiKey: SETTINGS['CONVAI-API-KEY'],
//     characterId: SETTINGS['CHARACTER-ID@maria'],
//     enableAudio: true, // use false for text only.
// });


export default function MariaWorrierScene({ setMessages, messages, backgroundNo, dance, jump, punch, kick, special }) {
    const [userText, setUserText] = useState("Press & Hold Spacebar to Talk!");
    const finalizedUserText = useRef();
    const [npcText, setNpcText] = useState("");
    const npcTextRef = useRef();

    const [isTalking, setIsTalking] = useState(false);
    const [keyPressed, setKeyPressed] = useState(false);

    const [conv, setConv] = useState({ user: "", machine: "" });
    const [background, setBackground] = useState("snowy_forest.hdr");

    // convaiClient.setResponseCallback((response) => {
    //     if (response.hasUserQuery()) {
    //         var transcript = response.getUserQuery();
    //         var isFinal = transcript.getIsFinal();
    //         if (isFinal) {
    //             finalizedUserText.current += " " + transcript.getTextData();
    //             transcript = "";
    //         }
    //         if (transcript) {
    //             setUserText(finalizedUserText.current + transcript.getTextData());
    //         } else {
    //             setUserText(finalizedUserText.current);
    //         }
    //     }
    //     if (response.hasAudioResponse()) {
    //         var audioResponse = response?.getAudioResponse();
    //         npcTextRef.current += " " + audioResponse.getTextData();
    //         setNpcText(npcTextRef.current);
    //     }
    // });

    // convaiClient.onAudioPlay(() => {
    //     setIsTalking(true);
    // });

    // convaiClient.onAudioStop(() => {
    //     setIsTalking(false);
    // });



    // function handleSpacebarPress(event) {
    //     if (event.keyCode === 32 && !keyPressed) {
    //         setKeyPressed(true);
    //         finalizedUserText.current = "";
    //         npcTextRef.current = "";
    //         setUserText("");
    //         setNpcText("");
    //         convaiClient.startAudioChunk();
    //     }
    // }

    // function handleSpacebarRelease(event) {
    //     if (event.keyCode === 32 && keyPressed) {
    //         setKeyPressed(false);
    //         convaiClient.endAudioChunk();
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener('keydown', handleSpacebarPress);
    //     window.addEventListener('keyup', handleSpacebarRelease);
    //     return () => {
    //         window.removeEventListener('keydown', handleSpacebarPress);
    //         window.removeEventListener('keyup', handleSpacebarRelease);
    //     };
    // }, [keyPressed]);


    // ********* Chat Bubble *********
    useEffect(() => {
        setConv({ user: userText, machine: npcText })
    }, [npcText])

    useEffect(() => {
        let len = messages["maria"].length;
        let lastMessage = messages["maria"][len - 1]

        if (conv["user"] && conv["machine"]) {
            if (len == 0 || lastMessage["user"] !== conv["user"]) {
                setMessages({ ...messages, maria: [...messages["maria"], conv] })
            }
            else {
                let newMessages = messages["maria"].slice(0, len - 1);
                setMessages({ ...messages, maria: [...newMessages, conv] })
            }
        }
    }, [conv])
    // ********* *********


    useEffect(() => {
        if (backgroundNo === 1) {
            setBackground("snowy_forest.hdr");
        }
        else if (backgroundNo === 2) {
            setBackground("village_farm.hdr");
        }
        else if (backgroundNo === 3) {
            setBackground("lake_side.hdr");
        }
        else if (backgroundNo === 4) {
            setBackground("backyard_garden.hdr");
        }
        else if (backgroundNo === 5) {
            setBackground("meadow_at_night.hdr");
        }

        console.log(backgroundNo);
    }, [backgroundNo]);


    return (
        <>
            <Canvas shadows camera={{ position: [0, 0, 15], fov: 30 }}>
                <Environment files={background} ground={{ height: 5, radius: 30, scale: 20 }} />
                <MariaWorrierModel position={[0, -0.5, 5]} scale={2} animationName={isTalking ? "talk" : "idle"} dance={dance} jump={jump} punch={punch} kick={kick} special={special} />
                <ExplorerModel position={[3, -0.5, 3]} scale={1.8} animationName={isTalking ? "talk" : "idle"} />
                <NancyModel position={[-3, -0.5, 3]} scale={22} animationName={isTalking ? "talk" : "idle"} />

                <Html position={[-1.5, -0.75, 3]}>
                    {userText && (<div style={{
                        width: '100%', height: '100%', overflow: 'auto', borderRadius: '10px',
                        background: 'rgba(115, 117, 109, 0.6)', padding: '10px', textAlign: 'center'
                    }}>
                        <p style={{ maxHeight: '300px', width: '300px', userSelect: 'none' }}>{userText}<div style={{ color: '#FD5656', fontWeight: 'bold' }}>(Unavailable currently as the API used here is not working !!!)</div></p>
                    </div>)}
                </Html>
                <Html position={[1, 3, 3]}>
                    {npcText && (<div style={{
                        width: '100%', height: '100%', overflow: 'auto', borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.7)', padding: '10px', textAlign: 'center'
                    }}>
                        <p style={{ maxHeight: '300px', width: '300px' }}>{npcText}</p>
                    </div>)}
                </Html>
                <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2.25} />
            </Canvas>
            {/* <Loader /> */}
        </>
    );
}

