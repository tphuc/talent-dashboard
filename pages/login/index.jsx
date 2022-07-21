import { Box } from 'components/Box';
import Button from 'components/Button';
import { Center } from 'components/Flex';
import { Input, InputPassword } from 'components/Input';
import { Seperator } from 'components/Seperator';
import { H1, H3, Text } from 'components/Text';
import Link from 'next/link';
import React from 'react';
import { RiGoogleFill, RiGoogleLine, RiLinkedinFill } from 'react-icons/ri';

import { useSession, signIn, signOut, } from "next-auth/react"
import { useForm } from 'react-hook-form';
import { useToasts } from 'components/Toast';
import { useRouter } from 'next/router';

export default function Login() {
    const toast = useToasts();
    const router = useRouter();
    const { register, handleSubmit } = useForm();


    const onSubmit = async (data) => {
        const { user_name, password } = data;
        if (!user_name || !password) {
            toast.add('Empty email or password', { variant: "error" });
            return
        };

        let res = await signIn('credentials', { user_name, password, redirect: false, callbackUrl: "/" })
        console.log(res)
        if (res?.error) {
            toast.add('Invalid email or password')
            return
        }
        else{
            router.push('/')
        }


    }


    return <Box css={{
        position: "relative",
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "$violet9",
    }}>

        <Box css={{ width: '800px', maxWidth: "100vw", background: "$mauve1", minHeight: "100vh" }}>
            <Center css={{ width: "100%", height: '100vh', flexDirection: "column" }}>
                <H1 css={{ color: "$mauve12", px: "$3", }}>Welcome to Insource Talent</H1>
                <Box css={{
                    width: 600,
                    padding: "$2 $4",
                    borderRadius: "$5",
                    maxWidth: '95vw',
                    background: "$mauve1",
                    '@mobile': {
                        padding: "$3 $5"
                    },
                    '@bp3': {
                        padding: "$4 $7",
                    }

                }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Button variant='violet' css={{ my: '$1', width: "100%" }} size='lg' endEnhancer={<RiGoogleFill />}>Continue with Google</Button>
                        <Seperator css={{ my: "$2" }}></Seperator>
                        <H3>Account detail</H3>

                        <Input {...register('user_name')} css={{ width: "100%", my: "$1" }} size='lg' placeholder='johndoe@gmail.com'></Input>
                        <InputPassword {...register('password')} css={{ width: "100%", my: "$1" }} size='lg' placeholder='password' ></InputPassword>
                        <Button type='submit' css={{ width: "100%", my: '$2' }} variant='orangeAlt' size='lg'>Login with email</Button>
                        <Text css={{ textAlign: "center" }}>
                            {"Don't have an account yet?"} ? <Link href='/sign-up'>Sign up</Link>
                        </Text>
                    </form>
                </Box>
            </Center>
        </Box>


    </Box>
};






