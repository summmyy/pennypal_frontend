import { Box, 
        HStack, 
        VStack, 
        Text, 
        IconButton, 
        Heading, 
        Button, 
        Link,
        useDisclosure,
        Collapse
    } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'



function Nav(){

    const { isOpen, onToggle } = useDisclosure()

    return(
        <Box>
        <Box width="20vw" bgColor='#89CFF0'>
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
                    <Heading paddingRight={20}> PennyPal</Heading>
                </HStack>
        </Box>
                <Collapse in={isOpen} animateOpacity>
                <Box  width="20vw" bgColor='#89CFF0' height='100vh'>
                    <VStack>
                        <Box paddingBottom={5}>
                            <Button width='20vw'padding={6} borderRadius={0} >
                                <ChakraLink as={ReactRouterLink} to='/'>
                                    <Text>Dashboard</Text>
                                </ChakraLink>
                            </Button>
                        </Box>
                        <Box paddingBottom={5} >
                            <Button width='20vw'padding={6} borderRadius={0} >
                                <ChakraLink as={ReactRouterLink} to='/'>
                                    <Text>Income</Text>
                                </ChakraLink>
                            </Button>
                        </Box>
                        <Box paddingBottom={5}>
                            <Button width='20vw'padding={6} borderRadius={0} >
                                <ChakraLink as={ReactRouterLink} to='/'>
                                    <Text>Expenses</Text>
                                </ChakraLink>
                            </Button>
                        </Box>
                        <Box paddingBottom={5}>
                            <Button width='20vw'padding={6} borderRadius={0} >
                                <ChakraLink as={ReactRouterLink} to='/'>
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