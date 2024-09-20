import React from 'react';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
} from '@mantine/core';
import { GoogleIcon } from '../SocialButtons/GoogleIcon';
import { IconBrandGoogle, IconBrandFacebook } from '@tabler/icons-react';

import { auth, provider } from "../../config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const LoginForm = ({ setAuthState }) => {
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    return (
        <div className="loginForm">
            <Paper radius="md" p="xl" withBorder className="content">
                <Text size="xl" weight={'bold'}>
                    Welcome here, {type} with
                </Text>

                <Group grow mb="md" mt="md">
                    <Button onClick={() => { signInWithPopup(auth, provider) }} leftIcon={<GoogleIcon />} variant="default" color="gray" radius="xl" styles={(theme) => ({
                        root: {
                            backgroundColor: "rgba(0,0,0,0.4)",
                            fontSize: "1rem",
                            color: "#fff",
                            ":hover": {
                                backgroundColor: "rgba(0,0,0,0.5)",
                                fontSize: "1rem",
                                color: "#fff",
                            }
                        },
                    })}>Google</Button>
                </Group>

                <Divider label="Or continue with email" labelPosition="center" my="lg" />

                <form autoComplete="off" onSubmit={form.onSubmit(() => {
                    if (type === 'login') {
                        signInWithEmailAndPassword(auth, form.values.email, form.values.password)
                            // .then((userCredentials) => { setAuthState(userCredentials) })
                            .catch((err) => { alert(err) })
                    } else {
                        createUserWithEmailAndPassword(auth, form.values.email, form.values.password)
                            // .then((userCredentials) => { setAuthState(userCredentials) })
                            .catch((err) => { alert(err) })
                    }
                })}>
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                autoComplete="off"
                                label="Name"
                                placeholder="Your name"
                                value={form.values.name}
                                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                radius="md"
                                styles={(theme) => ({
                                    label: {
                                        color: "#fff"
                                    },
                                    input: {
                                        backgroundColor: "rgba(0,0,0,0.4)",
                                        color: "#fff"
                                    }
                                })}
                            />
                        )}

                        <TextInput
                            autoComplete="off"
                            required
                            label="Email"
                            placeholder="user@convai.dev"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                            radius="md"
                            styles={(theme) => ({
                                label: {
                                    color: "#fff"
                                },
                                input: {
                                    backgroundColor: "rgba(0,0,0,0.4)",
                                    color: "#fff"
                                }
                            })}
                        />

                        <PasswordInput
                            autoComplete="off"
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                            radius="md"
                            styles={(theme) => ({
                                label: {
                                    color: "#fff"
                                },
                                input: {
                                    backgroundColor: "rgba(0,0,0,0.4)",
                                },
                                innerInput: {
                                    color: "#fff"
                                }
                            })}
                        />

                        {type === 'register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                                styles={(theme) => ({
                                    label: {
                                        color: "#fff"
                                    }
                                })}
                            />
                        )}
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => toggle()}
                            size="xs"
                        >
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit" radius="xl">
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper>
        </div>
    )
}

export default LoginForm;