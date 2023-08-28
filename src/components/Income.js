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

     } from "@chakra-ui/react";
import Nav from "./Nav";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { useState } from "react";
import axios from "axios";


function Income() {
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [amount, setAmount] = useState('');
    const [source, setSource] = useState('');
    const [date, setDate] = useState('');

    ChartJS.register(ArcElement, Tooltip, Legend);

    const [incomeData, setIncomeData] = useState({
        labels : [],
        datasets : [
            {
                label : 'Amount',
                data : [ ],
            }
        ]
    })

    const updateChartData = (sources, amounts) => {
        setIncomeData({
            labels: sources,
            datasets: [
                {
                    data: amounts,
                    backgroundColor: ['blue', 'red', 'green','purple', 'yellow', 'pink'],
                    borderColor: ['blue', 'red', 'green','purple', 'yellow', 'pink'],
                    borderWidth: 1,
                },
            ],
        });
    };

    const updateIncomeTotal = (numericAmount) => {
        setIncomeTotal(prevIncomeTotal => prevIncomeTotal + numericAmount);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const numericAmount = parseFloat(amount);
    
        if (!isNaN(numericAmount) && numericAmount !== 0) {
            const url = 'http://127.0.0.1:8000/user/income/';
    
            try {
                const response = await axios.post(url, {
                    amount: numericAmount,
                    source: source,
                    date: date,
                });
    
                console.log('success', response.data);
    
                updateIncomeTotal(numericAmount); // Call the function to update income total
                
                // Update chart data by adding the new source and amount
                const newSources = [...incomeData.labels, source];
                const newAmounts = [...incomeData.datasets[0].data, numericAmount];
                updateChartData(newSources, newAmounts);
    
                setAmount('');
                setSource('');
                setDate('');
            } catch (error) {
                console.error('Error sending data:', error);
                console.error('Response Status:', error.response.status);
                console.error('Response data:', error.response.data);
            }
        }
    };



    return(
        <Flex>
            <Nav />
            <Box flex='1'>
            <VStack>
                    <Heading paddingTop={3}> Income </Heading>
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
                                        <Heading size='lg'>Income: </Heading>
                                        <Heading size='lg'>${incomeTotal}</Heading>
                                    </VStack>
                                    <Box paddingLeft={10} paddingTop={5} paddingBottom={5} width={700} height={700} >
                                        <Doughnut data={incomeData} />
                                    </Box>
                                </HStack>
                                <Box width='30vw' paddingLeft={90} paddingBottom={5} paddingTop={5}>
                                    <form onSubmit={handleSubmit}>
                                        <FormControl>
                                            <FormLabel>Amount: </FormLabel>
                                            <Input
                                            type="number"
                                            htmlSize={15}
                                            width='auto'
                                            isRequired
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            />
                                             <FormLabel paddingTop={5}>Source: </FormLabel>
                                            <Input
                                            type="string"
                                            htmlSize={15}
                                            width='auto'
                                            isRequired
                                            value={source}
                                            onChange={(e) => setSource(e.target.value)}
                                            />
                                             <FormLabel paddingTop={5}>Date: </FormLabel>
                                            <Input
                                            htmlSize={15}
                                            width='auto'
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            />
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

export default Income;