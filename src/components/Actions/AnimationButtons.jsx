import React from 'react';
import { Button } from '@mantine/core';
import styles from "../Styles/AnimationButtons.module.css";


const AnimationButtons = ({ dance, jump, punch, kick, special, setDance, setJump, setPunch, setKick, setSpecial }) => {
    return (
        <div className={styles.container}>
            <button className={styles.btn} onClick={() => { setDance(!dance) }}><img src="/dance.svg" alt="" /></button>
            <button className={styles.btn} onClick={() => { setJump(!jump) }}><img src="/jump.svg" alt="" /></button>
            <button className={styles.btn} onClick={() => { setPunch(!punch) }}><img src="/punch.svg" alt="" /></button>
            <button className={styles.btn} onClick={() => { setKick(!kick) }}><img src="/kick.svg" alt="" /></button>
            <button className={styles.btn} onClick={() => { setSpecial(!special) }}><img src="/sword.svg" alt="" /></button>
        </div>
    )
}

export default AnimationButtons;