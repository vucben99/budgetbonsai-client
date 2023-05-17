import { useEffect, useContext } from 'react'
import { SimpleGrid, Container, Heading } from '@chakra-ui/react'
import { sessionContext } from '../contexts/sessionContext'
import NewTransaction from '../components/NewTransaction'
import TransactionList from '../components/TransactionList'
import Stats from '../components/Stats'
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
    <Container as='main' maxW='1600px' color='white' mt='80px' borderRadius='2xl' p={5}>
      <Heading mb={5} fontSize={40}>
        Dashboard
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6} minHeight='70vh'>
        <TransactionList />
        <NewTransaction />
        <Stats />
      </SimpleGrid>
    </Container>
  )
}
export default Dashboard
