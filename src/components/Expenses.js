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
         } from "@chakra-ui/react";
import Nav from "./Nav";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { useState } from "react";
import axios from "axios";

function Expenses(){

    const [incomeTotal, setIncomeTotal] = useState(0);
    const [amount, setAmount] = useState();
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const [username, setUsername] = useState(localStorage.getItem('username')) // retrieved this from Login component
    // const [password, setPassword ] = useState( localStorage.getItem('password'))
    const [authToken, setAuthToken] = useState( localStorage.getItem('auth_token'))

    ChartJS.register(ArcElement, Tooltip, Legend);

    const [expensesData, setExpensesData] = useState({
        labels : [],
        datasets : [
            {
                label : 'Amount',
                data : [ ],
            }
        ]
    })

    const updateChartData = (categories, amounts) => {
        setExpensesData({
            labels: categories,
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
        const incomeTotals = parseFloat(incomeTotal) + numericAmount

        if (!isNaN(numericAmount) && numericAmount !== 0) {
            const url = 'http://127.0.0.1:8000/user/transactions/';

            try {
                const response = await axios.post(url, {
                    amount: numericAmount,
                    date: date,
                    category: category,
                    description : description,
                    transaction_total : incomeTotals
                },{
                    headers : {
                        Authorization : `Token ${authToken}`
                    }
                });

                console.log('success', response.data);

                updateIncomeTotal(numericAmount); // Call the function to update income total

                const newCategories = [...expensesData.labels, category];
                const newAmounts = [...expensesData.datasets[0].data, numericAmount];
                updateChartData(newCategories, newAmounts);

                setAmount('');
                setCategory('');
                setDescription('');
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
                                        <Heading size='lg'>Expenses: </Heading>
                                        <Heading size='lg'>${incomeTotal}</Heading>
                                    </VStack>
                                    <Box paddingLeft={10} paddingTop={5} paddingBottom={5} width={700} height={700} >
                                        <Doughnut data={expensesData} />
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
                                            type="number"
                                            onChange={(e) => setAmount(e.target.value)}
                                            />
                                             <FormLabel paddingTop={5}>Category: </FormLabel>
                                            <Input
                                            htmlSize={15}
                                            width='auto'
                                            isRequired
                                            value={category}
                                            type="string"
                                            onChange={(e) => setCategory(e.target.value)}
                                            />
                                             <FormLabel paddingTop={5}>Description: </FormLabel>
                                           <Textarea 
                                           placeholder="Describe your transaction"
                                           value={description}
                                           onChange={(e) => setDescription(e.target.value)}
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

export default Expenses;