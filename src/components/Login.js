import { 
    Text,
    Box,
    Heading,
    VStack,
    Center,
    Input,
    Button,
    FormControl,
    FormLabel,
    HStack,

    
 } from "@chakra-ui/react"
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import axios from "axios"
import { useState } from "react"

function Login(){

    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        const url = 'http://127.0.0.1:8000/auth/token/login'

        try{
            const response = await axios.post(url, {
                username : username,
                password : password
            })

            console.log('success', response.data)

            const authToken = response.data.auth_token;

            navigate('/')
            window.location.reload()

            // use this to store the value of username so it can be accessed in other parts of the app
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('auth_token', authToken)

            setUsername('')
            setPassword('')

        }
        catch(error){
            console.error('Login error:', error);
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
    }

return(
    <>
         <Box paddingTop={200}>
                <Center>
                    <Box bgColor='#89CFF0' width='30vw' paddingBottom={20} paddingTop={10} borderRadius={8}>
                        <VStack>
                            <Heading> Login </Heading>
                            <br/>
                                <form onSubmit={handleSubmit}>
                                    <FormControl>
                                        <FormLabel paddingTop={5}> Username: </FormLabel>
                                        <Input 
                                        type="string"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        />
                                        <FormLabel paddingTop={5}> Password: </FormLabel>
                                        <Input 
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <Box paddingTop={10}>
                                            <Button
                                            width={250}
                                            type="submit"
                                            >
                                                Sign In
                                            </Button>
                                        </Box>
                                    </FormControl>
                                </form>
                                <HStack>
                                    <Text> New to PennyPal? </Text>
                                    <ChakraLink as={ReactRouterLink} to='/sign-up'>
                                        <Text>  Sign Up</Text>
                                    </ChakraLink>
                                </HStack>
                        </VStack>
                    </Box>
                </Center>
            </Box>
    </>
)
}

export default Login;