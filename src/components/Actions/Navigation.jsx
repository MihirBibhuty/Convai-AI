import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from "../Styles/Navigation.module.css";

import { useDisclosure } from '@mantine/hooks';
import { useMantineTheme, Modal, Input, Select, Button, Burger } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

import { deleteFromLocalStorage } from '../Store';

const Navigation = ({ setBackgroundNo, signOut }) => {
    const [opened, { open, close, toggle }] = useDisclosure(false);
    const label = opened ? 'Close navigation' : 'Open navigation';
    const ref = useRef(null);

    const handleSelect = () => {
        if (ref.current.value == "Snowy Forest") {
            setBackgroundNo(1);
        }
        else if (ref.current.value == "Village Farm Area") {
            setBackgroundNo(2);
        }
        else if (ref.current.value == "Lake Side Mountain") {
            setBackgroundNo(3);
        }
        else if (ref.current.value == "Backyard Garden") {
            setBackgroundNo(4);
        }
        else if (ref.current.value == "Meadow At Night") {
            setBackgroundNo(5);
        }

        // console.log(ref.current.value);
    }

    return (
        <div className={styles.nav}>
            {/* <ul className={styles.wrapper}>
                <li>
                    <Link to="/" style={{ textDecoration: "none", color: "#000", fontWeight: "800", fontSize: "1.5rem" }}>Explorer</Link>
                </li>
                <li>
                    <Link to="/nancy" style={{ textDecoration: "none", color: "#000", fontWeight: "800", fontSize: "1.5rem" }}>Nancy Girl</Link>
                </li>
                <li>
                    <Link to="/nancy" style={{ textDecoration: "none", color: "#000", fontWeight: "800", fontSize: "1.5rem" }}>Duplicate</Link>
                </li>
            </ul> */}

            {/* <div className={styles.wrapper}>
                <button onClick={() => setDancing(!dancing)}>Dance</button>
                <button onClick={() => console.log(dancing)} >Dance</button>
                <button>Dance</button>
            </div> */}
            {/* <Button onClick={signOut} style={{ cursor: "pointer" }}>Logout</Button>
            <Button onClick={deleteFromLocalStorage} style={{ cursor: "pointer" }}>Clear</Button> */}

            <nav class='menu'>
                <input class='menu-toggler' id='menu-toggler' type='checkbox' />
                <label for='menu-toggler'></label>
                <ul>
                    <li class='menu-item'>
                        <Link to="/"><img src="/ExplorerImg.png" height="200%" width="100%" style={{ objectFit: "cover" }} /></Link>
                    </li>
                    <li class='menu-item'>
                        <Link to="/"></Link>
                    </li>
                    <li class='menu-item'>
                        <Link to="/"></Link>
                    </li>
                    <li class='menu-item'>
                        <Link onClick={open}><img src="/SettingsImg.png" height="100%" /></Link>
                        <Modal
                            opened={opened}
                            onClose={close}
                            title="Settings"
                            overlayProps={{ color: 'dark', opacity: 0.55, blur: 5 }}
                            style={{ display: "flex", flexDirection: "column" }}
                            styles={(theme) => ({
                                title: {
                                    width: "100%",
                                    textAlign: "center",
                                    fontSize: "2rem",
                                    fontWeight: "600",
                                },
                                body: {
                                    marginTop: "2rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "2rem",
                                    overflow: "hidden",
                                    minHeight: "20rem"
                                }
                            })}
                        >
                            <Select
                                ref={ref}
                                onSelect={handleSelect}
                                label="Select Environment"
                                placeholder="Pick one"
                                data={[
                                    { value: '1', label: 'Snowy Forest' },
                                    { value: '2', label: 'Village Farm Area' },
                                    { value: '3', label: 'Lake Side Mountain' },
                                    { value: '4', label: 'Backyard Garden' },
                                    { value: '5', label: 'Meadow At Night' },
                                ]}
                                // clearable
                                dropdownPosition="bottom"
                            />
                            <Button variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} onClick={signOut} style={{ cursor: "pointer" }}>Logout</Button>
                            <Button variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} onClick={deleteFromLocalStorage} style={{ cursor: "pointer" }}>Reset Chat</Button>
                        </Modal>
                    </li>
                    <li class='menu-item'>
                        <Link to="/maria"><img src="/MariaImg.png" height="100%" /></Link>
                    </li>
                    <li class='menu-item'>
                        <Link to="/nancy"><img src="/NancyImg.png" height="100%" /></Link>
                    </li>
                </ul>
            </nav>



        </div>
    )
}

export default Navigation;