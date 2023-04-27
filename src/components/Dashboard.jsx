import { useEffect, useContext } from 'react'
import {
  SimpleGrid,
  Flex,
  Container,
  Text,
  Heading,
  Card,
  CardHeader,
  CardBody,
  List,
  ListItem,
  Spacer
} from '@chakra-ui/react'
import { sessionContext } from '../contexts/sessionContext'
import NewTransaction from './NewTransaction'
import getAllTransactions from '../api/getAllTransactions'

function Dashboard() {
  const { transactions, setTransactions } = useContext(sessionContext)

  useEffect(() => {
    document.title = 'Dashboard - BudgetBonsai'
    async function getAndSetAllTransactions() {
      const data = await getAllTransactions()
      setTransactions(data)
    }
    getAndSetAllTransactions()
  }, [])

  return (
    <Container as='main' maxW='1600px'>
      <Heading my='5'>Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
        <Card as='section' bg='gray.100' boxShadow='0 0 5px gray' borderRadius='lg'>
          <CardHeader>
            <Heading as='h3' size='lg'>
              Transactions
            </Heading>
          </CardHeader>
          <CardBody>
            <List>
              {!transactions.length && <Text>No transactions yet.</Text>}
              {transactions.length &&
                transactions.map((transaction) => (
                  <ListItem key={transaction._id}>
                    <Flex gap={1}>
                      <Text>{transaction.name}</Text>
                      <Spacer />
                      <Text color={transaction.type === 'income' ? 'green.500' : 'red.400'}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {transaction.amount.toLocaleString()}
                      </Text>
                      <Text>{transaction.currency}</Text>
                    </Flex>
                  </ListItem>
                ))}
            </List>
          </CardBody>
        </Card>
        <NewTransaction />
        <Card
          as='section'
          bg='gray.100'
          boxShadow='0 0 5px gray'
          borderRadius='lg'
          gridColumn={{ base: 'span 1', md: 'span 2', xl: 'span 1' }}
        ></Card>
      </SimpleGrid>
    </Container>
  )
}
export default Dashboard
