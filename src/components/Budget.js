import { Heading,
    Box, 
    Flex,
    VStack,
    Divider,
    Text, 
    HStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Textarea,
    Select,
     } from "@chakra-ui/react";
import Nav from "./Nav";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { useState } from "react";
import axios from "axios";



function Budget(){

    const [incomeTotal, setIncomeTotal] = useState(0);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [timePeriod, setTimePeriod] = useState('');

    const updateIncomeTotal = (numericAmount) => {
        setIncomeTotal(prevIncomeTotal => prevIncomeTotal + numericAmount);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const numericAmount = parseFloat(amount);

        if (!isNaN(numericAmount) && numericAmount !== 0) {
            const url = 'http://127.0.0.1:8000/user/budget/';

            try {
                const response = await axios.post(url, {
                    allocated_amount: numericAmount,
                    category: category,
                    time_period: timePeriod,
                });

                console.log('success', response.data);

                updateIncomeTotal(numericAmount); // Call the function to update income total

                setAmount('');
                setCategory('');
                setTimePeriod('');
            } catch (error) {
                console.error('Error sending data:', error);
                console.error('Response Status:', error.response.status);
                console.error('Response data:', error.response.data);
            }
        }
    };

    ChartJS.register(ArcElement, Tooltip, Legend);
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
                    <Heading paddingTop={3}> Expenses </Heading>
                    <Box paddingTop={3.5} width='80vw' >
                        <Divider  borderWidth='1px'  borderColor='black' />
                    </Box>
                    </VStack>
                    <Box padding={5}>
                        <Box bgColor='#D9D9D9' paddingLeft={100} paddingRight={100} borderRadius={10} paddingTop={50} paddingBottom={50} >
                        <br />
                            <Box borderRadius={10} bgColor='#89CFF0' paddingLeft={100} paddingRight={100} >
                                <HStack>
                                    <VStack paddingLeft={200}>
                                        <Heading size='lg'>Budget: </Heading>
                                        <Heading size='lg'>${incomeTotal}</Heading>
                                    </VStack>
                                    <Box paddingLeft={10} paddingTop={5} paddingBottom={5} width={700} height={700} >
                                        <Doughnut data={budgetdata} />
                                    </Box>
                                </HStack>
                                <Box width='30vw' paddingLeft={90} paddingBottom={5} paddingTop={5}>
                                    <form onSubmit={handleSubmit}>
                                        <FormControl>
                                            <FormLabel>Amount: </FormLabel>
                                                <Input
                                                htmlSize={15}
                                                width='auto'
                                                isRequired
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                />
                                             <FormLabel paddingTop={5}>Category: </FormLabel>
                                                <Input
                                                htmlSize={15}
                                                width='auto'
                                                isRequired
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                />
                                             <FormLabel paddingTop={5}>Time Period: </FormLabel>
                                                <Select 
                                                placeholder="Select frequency"
                                                width={60}
                                                value={timePeriod}
                                                onChange={(e) => setTimePeriod(e.target.value)}
                                                >
                                                <option value='weekly'>Weekly</option>
                                                <option value='monthly'>Monthly</option>
                                                <option value='yearly'>Yearly</option>
                                                </Select>
                                        </FormControl>
                                        <br />
                                        <Button
                                        type="submit"
                                        > Submit </Button>
                                    </form>
                                </Box>
                                
                            </Box>
                        </Box>
                    </Box>
            </Box>
        </Flex>
    )
}

export default Budget;