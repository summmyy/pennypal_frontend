import { Box, 
        HStack, 
        VStack, 
        Text, 
        IconButton, 
        Heading, 
        Button, 
        Link,
        useDisclosure,
        Collapse,
        WrapItem,
        Avatar
    } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'



function Nav(){

    const { isOpen, onToggle } = useDisclosure()

    const navigate = useNavigate();


    return(
        <Box>
        <Box width="20vw" bgColor='#89CFF0' height='8vh'>
                <HStack paddingTop={3} paddingBottom={10} paddingLeft={5}>
                    <Box paddingRight={10}>
                    <IconButton
                        color='black'
                        bgColor='#D9D9D9'
                        size='lg'
                        onClick={onToggle}
                        icon={ <HamburgerIcon />}
                     />
                     </Box>
                    <Heading paddingRight={10}> PennyPal</Heading>
                    <WrapItem  >
                            <Avatar size='sm' />
                        </WrapItem>
                </HStack>
        </Box>
                <Collapse in={isOpen} animateOpacity>
                <Box  width="20vw" bgColor='#89CFF0' height='140vh'>
                    <VStack>
                        <Box paddingBottom={5}>
                            <Button width='20vw'padding={6} borderRadius={0} onClick={(event) => {
                                event.preventDefault()
                                navigate('/')
                                } } >
                                <ChakraLink as={ReactRouterLink} to='/'>
                                    <Text>Dashboard</Text>
                                </ChakraLink>
                            </Button>
                        </Box>
                        <Box paddingBottom={5} >
                            <Button width='20vw'padding={6} borderRadius={0} onClick={(event) => {
                                event.preventDefault()
                                navigate('/income')
                                } } >
                                <ChakraLink as={ReactRouterLink} to='/income'>
                                    <Text>Income</Text>
                                </ChakraLink>
                            </Button>
                        </Box>
                        <Box paddingBottom={5}>
                            <Button width='20vw'padding={6} borderRadius={0} onClick={(event) => {
                                event.preventDefault()
                                navigate('/expenses')
                                } }>
                                <ChakraLink as={ReactRouterLink} to='/expenses'>
                                    <Text>Expenses</Text>
                                </ChakraLink>
                            </Button>
                        </Box>
                        <Box paddingBottom={5}>
                            <Button width='20vw'padding={6} borderRadius={0} onClick={(event) => {
                                event.preventDefault()
                                navigate('/budget')
                                } } >
                                <ChakraLink as={ReactRouterLink} to='/budget'>
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