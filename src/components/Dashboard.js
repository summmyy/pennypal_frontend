import Nav from "./Nav";
import {Box, 
        VStack, 
        Heading, 
        HStack,
        Text,
        Flex,
        Divider,
        Avatar,
        WrapItem,
        SimpleGrid
    } from '@chakra-ui/react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";

function Dashboard(){

    ChartJS.register(ArcElement, Tooltip, Legend);
    const incomedata = {
        labels : ['Salary', 'Investments', 'Misc'],
        datasets : [
            {
                label : 'Amount',
                data : [ 5000, 2000, 1000],
                backgroundColor : ['blue', 'red', 'green'],
                borderColor : ['blue', 'red', 'green'],
                borderWidth : 1
            }
        ]
    }

    const expensesdata = {
        labels : ['Housing', 'Transportation', 'Food & Grocery','Health Care','Debt', 'Entertainment','Tech','Savings'],
        datasets : [
            {
                label : 'Amount',
                data : [ 3500, 900, 600, 200, 500, 300,500, 1500],
                backgroundColor : ['blue', 'red', 'green', 'yellow','pink', 'purple','brown', 'orange'],
                borderColor : ['blue', 'red', 'green', 'yellow','pink', 'purple','brown', 'orange'],
                borderWidth : 1
            }
        ]
    }

    const budgetdata = {
        labels : ['Housing', 'Transportation', 'Food & Grocery','Health Care','Debt', 'Entertainment','Tech', 'Savings'],
        datasets : [
            {
                label : 'Amount',
                data : [ 3000, 900, 300, 200, 500, 100, 500 ,2500],
                backgroundColor : ['blue', 'red', 'green', 'yellow','pink', 'purple','brown', 'orange'],
                borderColor : ['blue', 'red', 'green', 'yellow','pink', 'purple','brown' ,'orange'],
                borderWidth : 1
            }
        ]
    }

    return(
        <Flex>
            <Nav />
            <Box flex='1'>
                <VStack>
                    <Heading paddingTop={3}> Dashboard </Heading>
                    <Box paddingTop={3.5} width='80vw' >
                        <Divider  borderWidth='1px'  borderColor='black' />
                    </Box>
                    <Text paddingBottom={50}> Your Finances </Text>
                    </VStack>
                    <Box padding={5}>
                        <Box bgColor='#D9D9D9' paddingLeft={100} paddingRight={100} borderRadius={10} paddingTop={50} paddingBottom={50} >
                        <br />
                            <Box borderRadius={10} bgColor='#89CFF0' paddingLeft={100} paddingRight={100} >
                                <HStack>
                                    <VStack paddingLeft={100}>
                                        <Heading size='lg'>Income: </Heading>
                                        <Heading size='lg'>$8000</Heading>
                                    </VStack>
                                    <Box paddingLeft={500} paddingTop={5} paddingBottom={5} >
                                        <Doughnut data={incomedata} />
                                    </Box>
                                </HStack>
                                
                            </Box>
                            <br />
                            <Box borderRadius={10} bgColor='#89CFF0' paddingLeft={100} paddingRight={100} >
                                <HStack>
                                    <VStack paddingLeft={90}>
                                        <Heading size='lg'>Expenses: </Heading>
                                        <Heading size='lg'>$6000</Heading>
                                    </VStack>
                                    <Box paddingLeft={500} paddingTop={5} paddingBottom={5} >
                                        <Doughnut data={expensesdata} />
                                    </Box>
                                </HStack>
                                
                            </Box>
                            <br />
                            <Box borderRadius={10} bgColor='#89CFF0' paddingLeft={100} paddingRight={100} >
                                <HStack>
                                    <VStack paddingLeft={100}>
                                        <Heading size='lg'>Budget: </Heading>
                                        <Heading size='lg'>$5000</Heading>
                                    </VStack>
                                    <Box paddingLeft={500} paddingTop={5} paddingBottom={5} >
                                        <Doughnut data={budgetdata} />
                                    </Box>
                                </HStack>
                                
                            </Box>
                         <br />
                        </Box>
                    </Box>
            </Box>
        </Flex>
    )
}

export default Dashboard