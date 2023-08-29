import { Box, 
        HStack, 
        VStack, 
        Text, 
        IconButton, 
        Heading, 
        Button, 
        useDisclosure,
        Collapse,
        WrapItem,
        Avatar
    } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { useAuth } from './AuthContext';
import axios from "axios";
import { useState } from "react";





function Nav(){

    const { isOpen: NavOpen, onToggle: NavToggle } = useDisclosure()
    const { isOpen: AvatarOpen, onToggle: AvatarToggle } = useDisclosure()
    const { isLoggedIn, setIsLoggedIn } = useAuth();



    const navigate = useNavigate();
    const [username, setUsername] = useState(localStorage.getItem('username')) // retrieved this from Login component
    const [password, setPassword ] = useState( localStorage.getItem('password'))
    const [authToken, setAuthToken] = useState( localStorage.getItem('auth_token'))

    const handleLogout = async (event) => {
        event.preventDefault();
        const url = 'http://127.0.0.1:8000/auth/token/logout'
        try{
        const response = await axios.post(url,{
                username : username,
                password : password
        },{
           headers : {
            Authorization : `Token ${authToken}`
           }
        })
        
        console.log('success:', response.data)

        navigate('/')

        setIsLoggedIn(false)
        setUsername('')
        setPassword('')
        setAuthToken('')


        }
        catch(error){
            console.error('error logging out', error);
            console.error('Response status:', error.response.status)
            console.error('Response data:', error.response.data)
        }
    }


    return(
        <Box>
        <Box width="20vw" bgColor='#89CFF0' height='8vh'>
                <HStack paddingTop={3} paddingBottom={10} paddingLeft={5}>
                    <Box paddingRight={10}>
                    <IconButton
                        color='black'
                        bgColor='#D9D9D9'
                        size='lg'
                        onClick={NavToggle}
                        icon={ <HamburgerIcon />}
                     />
                     </Box>
                     <ChakraLink as={ReactRouterLink} to='/dashboard' _hover={{ textDecoration: "none" }} >
                         <Heading paddingRight={10}> PennyPal </Heading>
                    </ChakraLink>
                        <WrapItem  >
                            {isLoggedIn && (
                                <Avatar 
                                size='md' 
                                onClick={AvatarToggle}
                                name={username} 
                                _hover={{ cursor : 'pointer'}}
                                /> )}
                                {!isLoggedIn && (
                                    <Avatar 
                                size='md' 
                                onClick={AvatarToggle}
                                // name={username}
                                _hover={{ cursor : 'pointer'}} /> )}
                                <Collapse in={AvatarOpen} animateOpacity>
                                    <Box width="40vw" >
                                        <HStack>
                                            {isLoggedIn && (
                                            <Box paddingLeft={10}>
                                                <ChakraLink as={ReactRouterLink} to='/' _hover={{ textDecoration: "none" }} >
                                                    <Button 
                                                    bgColor='#D9D9D9'
                                                    onClick={handleLogout} 
                                                    >Logout</Button>
                                                </ChakraLink>
                                            </Box>
                                            )} 
                                            {!isLoggedIn && (
                                            <>
                                                <Box paddingLeft={10}>
                                                    <ChakraLink as={ReactRouterLink} to='/' _hover={{ textDecoration: "none" }}>
                                                        <Button 
                                                        bgColor='#D9D9D9' 
                                                        >Login</Button>
                                                    </ChakraLink>
                                                </Box>
                                                <Box paddingLeft={3}>
                                                    <ChakraLink as={ReactRouterLink} to='/sign-up' _hover={{ textDecoration: "none" }}>
                                                        <Button  
                                                        bgColor='#D9D9D9'
                                                        >Sign Up</Button>
                                                    </ChakraLink>
                                                </Box>
                                            </>
                                            )}
                                        </HStack>
                                    </Box>
                                </Collapse>
                        </WrapItem>
                </HStack>
        </Box>
                <Collapse in={NavOpen} animateOpacity>
                <Box  width="20vw" bgColor='#89CFF0' height='140vh'>
                    <VStack>
                        <Box paddingBottom={5}>
                            <Button width='20vw'padding={6} borderRadius={0} onClick={(event) => {
                                event.preventDefault()
                                navigate('/dashboard')
                                } } >
                                <ChakraLink as={ReactRouterLink} to='/' _hover={{ textDecoration: "none" }}>
                                    <Text>Dashboard</Text>
                                </ChakraLink>
                            </Button>
                        </Box>
                        <Box paddingBottom={5} >
                            <Button width='20vw'padding={6} borderRadius={0} onClick={(event) => {
                                event.preventDefault()
                                navigate('/income')
                                } } >
                                <ChakraLink as={ReactRouterLink} to='/income' _hover={{ textDecoration: "none" }}>
                                    <Text>Income</Text>
                                </ChakraLink>
                            </Button>
                        </Box>
                        <Box paddingBottom={5}>
                            <Button width='20vw'padding={6} borderRadius={0} onClick={(event) => {
                                event.preventDefault()
                                navigate('/expenses')
                                } }>
                                <ChakraLink as={ReactRouterLink} to='/expenses' _hover={{ textDecoration: "none" }}>
                                    <Text>Expenses</Text>
                                </ChakraLink>
                            </Button>
                        </Box>
                        <Box paddingBottom={5}>
                            <Button width='20vw'padding={6} borderRadius={0} onClick={(event) => {
                                event.preventDefault()
                                navigate('/budget')
                                } } >
                                <ChakraLink as={ReactRouterLink} to='/budget' _hover={{ textDecoration: "none" }}>
                                    <Text>Budget</Text>
                                </ChakraLink>
                            </Button>
                        </Box>
            </VStack>
        </Box>
        </Collapse>
        </Box>
    )
}

export default Nav;