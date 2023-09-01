import { Heading, 
        Box, 
        Flex,
        VStack,
        Divider,
        HStack,
        FormControl,
        FormLabel,
        Input,
        Button,
        SimpleGrid,
        Center,

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

    // eslint-disable-next-line 
    const [username, setUsername] = useState(localStorage.getItem('username'))
    // eslint-disable-next-line 
    const [password, setPassword ] = useState( localStorage.getItem('password'))
    // eslint-disable-next-line 
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
        setIncomeTotal(prevIncomeTotal => (prevIncomeTotal + numericAmount));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const numericAmount = parseFloat(amount);
        const incomeTotals = parseFloat(incomeTotal) + numericAmount
    
        if (!isNaN(numericAmount) && numericAmount !== 0) {
            const url = 'http://127.0.0.1:8000/user/income/';
    
            try {
                const response = await axios.post(url, {
                    amount: numericAmount,
                    source: source,
                    date: date,
                    income_total : incomeTotals
                },{
                    headers : {
                        Authorization : `Token ${authToken}`
                    }
                });
    
                console.log('success', response.data);
                
    
                updateIncomeTotal((numericAmount)); // Call the function to update income total
                
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

    const handleDeleteLastEntry = async () => {
        try {
            const deleteUrl = `http://127.0.0.1:8000/user/income/delete_last_entry/?username=${username}`;
    
            const response = await axios.delete(deleteUrl, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            console.log('last entry deleted:', response.data )

            const newSources = [...incomeData.labels];
            const newAmounts = [...incomeData.datasets[0].data];

            if (newSources.length > 0) {
                newSources.pop(); // Remove the last source
                const deletedAmount = newAmounts.pop(); // Remove the last amount

            setIncomeTotal(prevIncomeTotal => prevIncomeTotal - deletedAmount);
        
            updateChartData(newSources, newAmounts);
    }

        } catch (error) {
            console.error('Error deleting entry:', error);
            console.error('Response Status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    };


    // * This is supposed to be a get request to show user's previous entries *

    // const getIncomeEntries = async () => {
    //     const url = `http://localhost:8000/user/income/user_entries/?username=${username}`;

    //     try {
    //         const response = await axios.get(url, {
    //             headers: {
    //                 Authorization: `Token ${authToken}`,
    //             },
    //         });

    //         console.log('Success:', response.data);

    //         const incomeSources = response.data.map(entry => entry.source);
    //         const incomeAmounts = response.data.map(entry => entry.amount);

    //         updateChartData(incomeSources, incomeAmounts);

    //         // Get the income total from the latest entry
    //         if (response.data.length > 0) {
    //             const latestEntry = response.data[response.data.length - 1];
    //             setIncomeTotal((latestEntry.income_total));
    //         } else {
    //             // If there are no entries, set income total to 0
    //             setIncomeTotal(0);
    //         }}
    //         catch (error) {
    //         console.error('Error fetching data:', error);
    //         console.error('Response status:', error.response.status);
    //         console.error('Response data:', error.response.data);
    //     }
    // };

    // useEffect(() => {
    //     getIncomeEntries();
    // }, [username, authToken]);

    // eslint-disable-next-line 
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
            <Box flex='1'>
            <SimpleGrid columns={{ base: 1}} spacing={4} >
            <VStack>
                    <Heading paddingTop={3}> Income </Heading>
                    <Box paddingTop={{base:2 ,xl : 0,'2xl':3.5}} width={{base:'100vw',xl : '73vw','2xl':'79.25vw'}} >
                        <Divider  borderWidth='1px'  borderColor='black' />
                    </Box>
                    </VStack>
                    <Box padding={{base: 2,xl : 5,'2xl' : 5}}>
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
                                padding={2}
                                 >
                                <HStack>
                                    <VStack paddingLeft={{base:1,xl : 150,'2xl':200}}>
                                        <Heading size={{base : 'sm',xl : 'md','2xl':'lg'}}>Income: </Heading>
                                        <Heading size={{base : 'sm',xl : 'md','2xl':'lg'}}>${incomeTotal}</Heading>
                                    </VStack>
                                    <Box 
                                        paddingLeft={10} 
                                        paddingTop={5} 
                                        paddingBottom={5} 
                                        width={{base : '50vw','2xl':700}} 
                                        height={{base: '40vh','2xl':700}} >
                                        <Doughnut 
                                            data={incomeData}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                              }}
                                               />
                                    </Box>
                                </HStack>
                                <Box width={{base : '100vw','2xl':'30vw'}} paddingLeft={90} paddingBottom={5} paddingTop={5}>
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
                                        <HStack>
                                        <Button
                                        type="submit"
                                        size={{base : 'sm',xl : 'md','2xl':'lg'}}
                                        width='auto'
                                        > Submit </Button>
                                        <Button 
                                        onClick={handleDeleteLastEntry}
                                        size={{base : 'sm',xl : 'md','2xl':'lg'}}
                                        width='auto'
                                        >
                                        Delete Last Entry    
                                        </Button>    
                                        </HStack>
                                    </form> 
                                </Box>
                                
                            </Box>
                        </Box>
                      </Center>
                    </Box>
                </SimpleGrid>
            </Box>
        </Flex>
    )
}

export default Income;