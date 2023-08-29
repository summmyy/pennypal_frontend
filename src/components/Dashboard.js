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
        SimpleGrid,
        Button
    } from '@chakra-ui/react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard(){

    const [incomeTotal, setIncomeTotal] = useState(0);
    const [expensesTotal, setExpensesTotal] = useState(0);
    const [budgetTotal, setBudgetTotal] = useState(0);

    const [username, setUsername] = useState(localStorage.getItem('username')) // retrieved this from Login component
    // const [password, setPassword ] = useState( localStorage.getItem('password'))
    const [authToken, setAuthToken] = useState( localStorage.getItem('auth_token'))


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

    const updateIncomeData = (sources, amounts) => {
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

    const [expensesData, setExpensesData] = useState({
        labels : [],
        datasets : [
            {
                label : 'Amount',
                data : [ ],
            }
        ]
    })

    const updateExpensesData = (categories, amounts) => {
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

    const [budgetData, setBudgetData] = useState({
        labels : [],
        datasets : [
            {
                label : 'Amount',
                data : [ ],
            }
        ]
    })

    const updateBudgetData = (categories, amounts) => {
        setBudgetData({
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

    const getIncomeEntries = async () => {
        const url = `http://localhost:8000/user/income/user_entries/?username=${username}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });

            console.log('Success:', response.data);

            const incomeSources = response.data.map(entry => entry.source);
            const incomeAmounts = response.data.map(entry => entry.amount);

            updateIncomeData(incomeSources, incomeAmounts);

            // Get the income total from the latest entry
            if (response.data.length > 0) {
                const latestEntry = response.data[response.data.length - 1];
                setIncomeTotal((latestEntry.income_total));
            } else {
                // If there are no entries, set income total to 0
                setIncomeTotal(0);
            }}
            catch (error) {
            console.error('Error fetching data:', error);
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    };

    const getExpensesEntries = async () => {
        const url = `http://localhost:8000/user/transactions/user_entries/?username=${username}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });

            console.log('Success:', response.data);

            const expenseCategory = response.data.map(entry => entry.category);
            const expenseAmounts = response.data.map(entry => entry.amount);

            updateExpensesData(expenseCategory, expenseAmounts);

            // Get the income total from the latest entry
            if (response.data.length > 0) {
                const latestEntry = response.data[response.data.length - 1];
                setExpensesTotal((latestEntry.transaction_total));
            } else {
                // If there are no entries, set income total to 0
                setExpensesTotal(0);
            }}
            catch (error) {
            console.error('Error fetching data:', error);
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    };

    const getBudgetEntries = async () => {
        const url = `http://localhost:8000/user/budget/user_entries/?username=${username}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });

            console.log('Success:', response.data);

            const budgetCategory = response.data.map(entry => entry.category);
            const budgetAmount = response.data.map(entry => entry.allocated_amount);

            updateBudgetData(budgetCategory, budgetAmount);

            // Get the income total from the latest entry
            if (response.data.length > 0) {
                const latestEntry = response.data[response.data.length - 1];
                setBudgetTotal((latestEntry.budget_total));
            } else {
                // If there are no entries, set income total to 0
                setBudgetTotal(0);
            }}
            catch (error) {
            console.error('Error fetching data:', error);
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    };

    useEffect(() => {
        getIncomeEntries();
    }, [username, authToken]);

    useEffect(() => {
        getExpensesEntries();
    }, [username, authToken]);

    useEffect(() => {
        getBudgetEntries();
    }, [username, authToken]);

    const handleDeleteIncomeEntries = async () => {
        const deleteUrl = `http://localhost:8000/user/income/user_entries/?username=${username}`;
    
        try {
            const response = await axios.delete(deleteUrl, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });

            console.log('success :' , response.data)
    
            // Refresh the data after deletion
            getIncomeEntries();
        } catch (error) {
            console.error('Error deleting entries:', error);
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    };

    const handleDeleteExpensesEntries = async () => {
        const deleteUrl = `http://localhost:8000/user/transactions/user_entries/?username=${username}`;
    
        try {
            const response = await axios.delete(deleteUrl, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });

            console.log('success :' , response.data)
    
            // Refresh the data after deletion
            getExpensesEntries();
        } catch (error) {
            console.error('Error deleting entries:', error);
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    };

    const handleDeleteBudgetEntries = async () => {
        const deleteUrl = `http://localhost:8000/user/budget/user_entries/?username=${username}`;
    
        try {
            const response = await axios.delete(deleteUrl, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });

            console.log('success :' , response.data)
    
            // Refresh the data after deletion
            getBudgetEntries();
        } catch (error) {
            console.error('Error deleting entries:', error);
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    };

    const breakpoints = {
        base: "0em", // 0px
        sm: "30em", // ~480px. em is a relative unit and is dependant on the font size.
        md: "48em", // ~768px
        lg: "62em", // ~992px
        xl: "80em", // ~1280px
        "2xl": "96em", // ~1536px
      };

    return(
        <Flex>
            <Nav />
            <Box flex='1'>
                <VStack>
                    <Heading paddingTop={3}> Dashboard </Heading>
                    <Box paddingTop={3.5} width='80vw' >
                        <Divider  borderWidth='1px'  borderColor='black' />
                    </Box>
                    <Text as='b' paddingBottom={50}> {username} Finances </Text>
                    </VStack>
                    <Box padding={5}>
                        <Box bgColor='#D9D9D9' paddingLeft={100} paddingRight={100} borderRadius={10} paddingTop={50} paddingBottom={50} >
                        <br />
                            <Box borderRadius={10} bgColor='#89CFF0' paddingLeft={100} paddingRight={100} >
                                <HStack>
                                    <VStack paddingLeft={100}>
                                        <Heading size='lg'>Income: </Heading>
                                        <Heading size='lg'>${incomeTotal}</Heading>
                                        <Box paddingTop={70}>
                                             <Button onClick={handleDeleteIncomeEntries}> Reset Income </Button>
                                        </Box>
                                    </VStack>
                                    <Box paddingLeft={500} paddingTop={5} paddingBottom={5} >
                                        <Doughnut data={incomeData} />
                                    </Box>
                                </HStack>
                                
                            </Box>
                            <br />
                            <Box borderRadius={10} bgColor='#89CFF0' paddingLeft={100} paddingRight={100} >
                                <HStack>
                                    <VStack paddingLeft={90}>
                                        <Heading size='lg'>Expenses: </Heading>
                                        <Heading size='lg'>${expensesTotal}</Heading>
                                        <Box paddingTop={70}>
                                             <Button onClick={handleDeleteExpensesEntries}> Reset Income </Button>
                                        </Box>
                                    </VStack>
                                    <Box paddingLeft={500} paddingTop={5} paddingBottom={5} >
                                        <Doughnut data={expensesData} />
                                    </Box>
                                </HStack>
                                
                            </Box>
                            <br />
                            <Box borderRadius={10} bgColor='#89CFF0' paddingLeft={100} paddingRight={100} >
                                <HStack>
                                    <VStack paddingLeft={100}>
                                        <Heading size='lg'>Budget: </Heading>
                                        <Heading size='lg'>${budgetTotal}</Heading>
                                        <Box paddingTop={70}>
                                             <Button onClick={handleDeleteBudgetEntries}> Reset Income </Button>
                                        </Box>
                                    </VStack>
                                    <Box paddingLeft={500} paddingTop={5} paddingBottom={5} >
                                        <Doughnut data={budgetData} />
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