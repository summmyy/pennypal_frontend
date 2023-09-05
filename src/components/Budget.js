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
    SimpleGrid,
    Center,
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

    const [username, setUsername] = useState(localStorage.getItem('username')) // retrieved this from Login component
    // const [password, setPassword ] = useState( localStorage.getItem('password'))
    const [authToken, setAuthToken] = useState( localStorage.getItem('auth_token'))

    ChartJS.register(ArcElement, Tooltip, Legend);

    const [budgetData, setBudgetData] = useState({
        labels : [],
        datasets : [
            {
                label : 'Amount',
                data : [ ],
            }
        ]
    })

    const updateChartData = (categories, amounts) => {
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

    const updateIncomeTotal = (numericAmount) => {
        setIncomeTotal(prevIncomeTotal => prevIncomeTotal + numericAmount);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const numericAmount = parseFloat(amount);
        const incomeTotals = parseFloat(incomeTotal) + numericAmount

        if (!isNaN(numericAmount) && numericAmount !== 0) {
            const url = 'https://pennypal.up.railway.app/user/budget/';

            try {
                const response = await axios.post(url, {
                    allocated_amount: numericAmount,
                    category: category,
                    time_period: timePeriod,
                    budget_total : incomeTotals
                },{
                    headers : {
                        Authorization : `Token ${authToken}`
                    }
                });

                console.log('success', response.data);

                updateIncomeTotal(numericAmount); // Call the function to update income total

                // This is for updating the doughnut chart according to user's entries
                const newCategories = [...budgetData.labels, category];
                const newAmounts = [...budgetData.datasets[0].data, numericAmount];
                updateChartData(newCategories, newAmounts);

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

    const handleDeleteLastEntry = async () => {
        try {
            const deleteUrl = `https://pennypal.up.railway.app/user/budget/delete_last_entry/?username=${username}`;
    
            const response = await axios.delete(deleteUrl, {
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            });
            console.log('last entry deleted:', response.data )

            const newSources = [...budgetData.labels];
            const newAmounts = [...budgetData.datasets[0].data];

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
            <SimpleGrid columns={{ base: 1}} spacing={4}>
            <VStack>
                    <Heading paddingTop={3}> Expenses </Heading>
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
                            width={{base : '100vw',xl : '70vw','2xl':'79vw'}} >
                        <br />
                            <Box 
                                borderRadius={10} 
                                bgColor='#89CFF0' 
                                paddingLeft={{base:1,'2xl':100}} 
                                paddingRight={{base:1,'2xl':100}} 
                                padding={2} >
                                <HStack>
                                    <VStack paddingLeft={{base:1,xl : 150,'2xl':200}}>
                                        <Heading size={{base : 'sm',xl : 'md','2xl':'lg'}}>Budget: </Heading>
                                        <Heading size={{base : 'sm',xl : 'md','2xl':'lg'}}>${incomeTotal}</Heading>
                                    </VStack>
                                    <Box 
                                        paddingLeft={10} 
                                        paddingTop={5} 
                                        paddingBottom={5} 
                                        width={{base : '50vw','2xl':700}} 
                                        height={{base: '40vh','2xl':700}} >
                                        <Doughnut 
                                            data={budgetData}
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

export default Budget;