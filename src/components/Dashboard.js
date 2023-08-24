import Nav from "./Nav";
import {Box, 
        VStack, 
        Heading, 
        HStack,
        Text,
        Flex,
    } from '@chakra-ui/react'

function Dashboard(){
    return(
        <Flex>
            <Nav />
            <Box flex='1'>
                <VStack>
                    <Heading paddingTop={3}> Dashboard </Heading>
                    <HStack><Text align='end'>icon</Text></HStack>
                    <Text paddingBottom={50}> Your Finances </Text>
                        <Box bgColor='#D9D9D9' paddingLeft={100} paddingRight={100} borderRadius={10} >
                        <br />
                            <Box borderRadius={10} bgColor='#89CFF0' paddingLeft={600} paddingRight={600} >
                                <Text>Income: </Text>
                                <Text>$8000</Text>
                                
                            </Box>
                            <br />
                            <Box borderRadius={10} bgColor='#89CFF0' paddingLeft={600} paddingRight={600}>
                                <Text>Income: </Text>
                                <Text>$8000</Text>
                            </Box>
                            <br />
                            <Box borderRadius={10} bgColor='#89CFF0' paddingLeft={600} paddingRight={600}>
                                <Text>Income: </Text>
                                <Text>$8000</Text>
                            </Box>
                         <br />
                        </Box>
                </VStack>
            </Box>
        </Flex>
    )
}

export default Dashboard