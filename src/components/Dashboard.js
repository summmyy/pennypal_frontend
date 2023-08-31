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
        Button,
        Container,
        Center
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
                    label: 'Amount'
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
                    label: 'Amount'
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
                    label: 'Amount'
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
        <Flex flexDirection={{base :'column',xl : 'row', '2xl' : 'row'}} >
            <Nav />
            <Box flex='1'  >
            <SimpleGrid columns={{ base: 1}} spacing={4} >
                <VStack>
                    <Heading paddingTop={3}> Dashboard </Heading>
                    <Box paddingTop={{base:2 ,xl : 0,'2xl':3.5}} width={{base:'100vw',xl : '73vw','2xl':'79.25vw'}} >
                        <Divider  borderWidth='1px'  borderColor='black' />
                    </Box>
                    <Text as='b' paddingBottom={50}> {username} Finances </Text>
                    </VStack>
                    <Box padding={{base: 2,xl : 5,'2xl' : 5}} >
                        <Center>
                        <Box 
                            bgColor='#D9D9D9' 
                            paddingLeft={{base:1,'2xl':100}} 
                            paddingRight={{base:1,'2xl':100}} 
                            borderRadius={10} 
                            paddingTop={50} 
                            paddingBottom={50} 
                            width={{base : '100vw',xl : '70vw','2xl':'79vw'}}
                            >
                        <br />
                            <Box 
                                borderRadius={10} 
                                bgColor='#89CFF0' 
                                paddingLeft={{base:1,'2xl':100}} 
                                paddingRight={{base:1,'2xl':100}} 
                                padding={2} >
                                <HStack>
                                    <VStack paddingLeft={{base:1,xl : 100,'2xl':100}}>
                                        <Heading size={{base : 'sm',xl : 'md','2xl':'lg'}}>Income: </Heading>
                                        <Heading size={{base : 'sm',xl: 'md','2xl':'lg'}}>${incomeTotal}</Heading>
                                        <Box paddingTop={70}>
                                             <Button onClick={handleDeleteIncomeEntries} size={{base : 'sm',xl : 'md','2xl':'lg'}}> Reset Income </Button>
                                        </Box>
                                    </VStack>
                                    <Box 
                                        paddingLeft={{base:1,xl : 200,'2xl':500}} 
                                        paddingTop={5} 
                                        paddingBottom={5}  
                                        width={{base : '50vw',xl : '70vw','2xl':'80vw'}}  
                                        height={{base : '40vh',xl : '40vh','2xl':'40vh'}}   >
                                        <Doughnut 
                                            data={incomeData}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                              }}
                                            />
                                    </Box>
                                </HStack>
                                
                            </Box>
                            <br />
                            <Box 
                                borderRadius={10} 
                                bgColor='#89CFF0' 
                                paddingLeft={{base:1,'2xl':100}} 
                                paddingRight={{base:1,'2xl':100}} 
                                padding={2} >
                                <HStack>
                                    <VStack paddingLeft={{base:1,xl : 100,'2xl':100}}>
                                        <Heading size={{base : 'sm',xl : 'md','2xl':'lg'}}>Expenses: </Heading>
                                        <Heading size={{base : 'sm',xl : 'md','2xl':'lg'}}>${expensesTotal}</Heading>
                                        <Box paddingTop={70}>
                                             <Button onClick={handleDeleteExpensesEntries} size={{base : 'sm',xl : 'md','2xl':'lg'}}> Reset Income </Button>
                                        </Box>
                                    </VStack>
                                    <Box 
                                        paddingLeft={{base:1,xl : 200,'2xl':500}} 
                                        paddingTop={5} paddingBottom={5} 
                                        width={{base : '50vw',xl : '70vw','2xl':'80vw'}}  
                                        height={{base : '40vh',xl : '40vh','2xl':'40vh'}} >
                                        <Doughnut 
                                            data={expensesData}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                              }}
                                            />
                                    </Box>
                                </HStack>
                                
                            </Box>
                            <br />
                            <Box 
                                borderRadius={10} 
                                bgColor='#89CFF0' 
                                paddingLeft={{base:1,'2xl':100}} 
                                paddingRight={{base:1,'2xl':100}} 
                                padding={2} >
                                <HStack>
                                    <VStack paddingLeft={{base:1,xl : 100,'2xl':100}}>
                                        <Heading size={{base : 'sm',xl : 'md','2xl':'lg'}}>Budget: </Heading>
                                        <Heading size={{base : 'sm',xl : 'md','2xl':'lg'}}>${budgetTotal}</Heading>
                                        <Box paddingTop={70}>
                                             <Button onClick={handleDeleteBudgetEntries} size={{base : 'sm',xl : 'md','2xl':'lg'}} > Reset Income </Button>
                                        </Box>
                                    </VStack>
                                    <Box 
                                        paddingLeft={{base:1,xl : 200,'2xl':500}} 
                                        paddingTop={5} 
                                        paddingBottom={5} 
                                        width={{base : '50vw',xl : '70vw','2xl':'80vw'}}  
                                        height={{base : '40vh',xl : '40vh','2xl':'40vh'}} >
                                        <Doughnut 
                                            data={budgetData}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                              }}
                                            />
                                    </Box>
                                </HStack>
                                
                            </Box>
                         <br />
                        </Box>
                        </Center>
                    </Box>
                </SimpleGrid>
            </Box>
        </Flex>
    )
}

export default Dashboard