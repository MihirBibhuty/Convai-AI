import React, { useEffect } from 'react';
import styles from "../Styles/MessagingBox.module.css";

import { useDisclosure } from '@mantine/hooks';
import { Drawer, Group, Button } from '@mantine/core';
import { IconChartArea } from '@tabler/icons-react';

import { useLocation } from 'react-router-dom';


const MessagingBox = ({ messages }) => {
    const [opened, { open, close }] = useDisclosure(false);
    let location = useLocation();

    return (
        <>
            <Drawer
                position="right"
                opened={opened}
                onClose={close}
                title="Chat History"
                overlayProps={{ opacity: 0.4, blur: 2 }}
                className={styles.messagingBox}
                styles={(theme) => ({
                    header: {
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                    },
                    title: {
                        color: "#fff",
                        fontSize: "1.5rem",
                        fontWeight: "600",
                    },
                    content: {
                        backgroundColor: "rgba(11, 130, 100, 0.5)",
                    }
                })}
            >
                {
                    location.pathname === "/" &&
                    messages["default"].map((item, id) => {
                        return (
                            <React.Fragment key={id}>
                                <div className={styles.user}>
                                    <p className={styles.p}>
                                        {item.user}
                                    </p>
                                </div>
                                <div className={styles.machine}>
                                    <p className={styles.p}>
                                        {item.machine}
                                    </p>
                                </div>
                            </React.Fragment>
                        )
                    })
                }
                {
                    location.pathname === "/nancy" &&
                    messages["nancy"].map((item, id) => {
                        return (
                            <React.Fragment key={id}>
                                <div className={styles.user}>
                                    <p className={styles.p}>
                                        {item.user}
                                    </p>
                                </div>
                                <div className={styles.machine}>
                                    <p className={styles.p}>
                                        {item.machine}
                                    </p>
                                </div>
                            </React.Fragment>
                        )
                    })
                }
                {
                    location.pathname === "/maria" &&
                    messages["maria"].map((item, id) => {
                        return (
                            <React.Fragment key={id}>
                                <div className={styles.user}>
                                    <p className={styles.p}>
                                        {item.user}
                                    </p>
                                </div>
                                <div className={styles.machine}>
                                    <p className={styles.p}>
                                        {item.machine}
                                    </p>
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            </Drawer>

            <Group position="center" style={{ position: "fixed", right: 0, zIndex: 2, margin: "5px 0" }}>
                <button onClick={open} className={styles.btn}><img src="/message.svg" alt="" /></button>
            </Group>
        </>
    )
}

export default MessagingBox;