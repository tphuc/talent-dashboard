import { Box } from 'components/Box';
import Button from 'components/Button';
import { Center } from 'components/Flex';
import { Input, InputPassword } from 'components/Input';
import { Seperator } from 'components/Seperator';
import { H1, H3, Text } from 'components/Text';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RiGoogleFill, RiGoogleLine, RiLinkedinFill } from 'react-icons/ri';


export default function SignUp() {

    const { register, handleSubmit } = useForm();
    

    const onSubmit = (d) => {
        console.log(d)
    }

    return <Box css={{
        position: "relative",
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "$violet9",
    }}>


        <Box css={{width:'800px', maxWidth:"100vw", background:"$mauve1", minHeight:"100vh"}}>
        <Center css={{ width: "100%", height: '100vh', flexDirection: "column" }}>
            <H1 css={{ color: "$mauve1", px: "$3", mt: "$5" }}>Try Insource Talent for free</H1>
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
                <H1 css={{ textAlign: "center", color: "$mauve12" }}>Create Account</H1>
                <H3 css={{ my: '$1' }}>Social Registration</H3>
                <Button variant='violet' css={{ my: '$1', width: "100%" }} size='lg' endEnhancer={<RiGoogleFill />}>Sign up with Google</Button>
                <Button variant='violet' css={{ width: "100%", my: '$1' }} size='lg' endEnhancer={<RiLinkedinFill />}>Sign up with Linkedn</Button>
                <Seperator css={{ my: "$2" }}></Seperator>
                <H3 css={{ my: '$1' }}>Account detail</H3>
                <Input {...register('fullname')} css={{ width: "100%", my: "$1" }} size='lg' placeholder='Enter your username'></Input>
                <Input {...register('email')} css={{ width: "100%", my: "$1" }} size='lg' placeholder='johndoe@gmail.com' ></Input>
                <InputPassword {...register('password')} css={{ width: "100%", my: "$1" }} size='lg' placeholder='password' ></InputPassword>
                <Button type='submit' css={{ width: "100%", my: '$2' }} variant='orangeAlt' size='lg'>Sign up with email</Button>
                <Text css={{textAlign:"center"}}>
                    Already have an account ? <Link href='/login'>Login</Link>
                </Text>
                </form>
            </Box>
        </Center>
        </Box>

    </Box>
};






