import { Container, Card, CardHeader, CardBody, Heading, List, ListItem, Spacer, Text, VStack } from '@chakra-ui/react'
import { useContext } from 'react'
import { sessionContext } from '../contexts/sessionContext'

function TransactionList() {
  const { transactions } = useContext(sessionContext)

  return (
    <Card as='section' bg='whiteAlpha.600' backdropFilter='blur(10px)' borderRadius='2xl'>
      <CardHeader>
        <Heading as='h3' size='lg'>
          Transactions
        </Heading>
      </CardHeader>
      <CardBody maxH='70vh' overflowY='auto'>
        <List spacing={2}>
          {!transactions?.length && <Text>No transactions yet.</Text>}
          {transactions?.length &&
            transactions.map((transaction) => (
              <ListItem key={transaction._id} bg='gray.200' p={3} borderRadius='lg'>
                <Container display='flex' gap={1}>
                  <VStack align='flex-start' spacing={0}>
                    <Text fontSize='lg'>{transaction.name}</Text>
                    <Text fontSize='sm'>{transaction.category}</Text>
                  </VStack>
                  <Spacer />
                  <Text
                    color={transaction.type === 'income' ? 'green.500' : 'red.400'}
                    fontWeight='bold'
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {transaction.amount.toLocaleString()}
                    {` ${transaction.currency}`}
                  </Text>
                </Container>
              </ListItem>
            ))}
        </List>
      </CardBody>
    </Card>
  )
}
export default TransactionList
