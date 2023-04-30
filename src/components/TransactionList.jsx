import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Heading,
  List,
  ListItem,
  Spacer,
  Flex,
  Text,
  VStack,
  IconButton,
  ButtonGroup
} from '@chakra-ui/react'
import { AiFillEdit as EditBtn, AiFillDelete as DelBtn } from 'react-icons/ai'
import { useContext } from 'react'
import { sessionContext } from '../contexts/sessionContext'
import deleteTransaction from '../api/deleteTransaction'

function TransactionList() {
  async function handleDelete(_id) {
    try {
      console.log(_id)
      const isDeleted = await deleteTransaction(_id)
      if (isDeleted) {
        setTransactions((prev) => prev.filter((transaction) => transaction._id !== _id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const { transactions, setTransactions } = useContext(sessionContext)

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
                <Flex spacing={1}>
                  <VStack align='flex-start' spacing={0}>
                    <Text fontSize='lg'>{transaction.name}</Text>
                    <Text fontSize='sm'>{transaction.category}</Text>
                  </VStack>
                  <Spacer />
                  <VStack align='flex-end' spacing={0}>
                    <Text
                      color={transaction.type === 'income' ? 'green.500' : 'red.400'}
                      fontWeight='bold'
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {transaction.amount.toLocaleString()}
                      {` ${transaction.currency}`}
                    </Text>
                    <Text fontSize='sm' color='gray.500'>
                      {new Date(transaction.date).toLocaleDateString() + ' '}
                      {new Date(transaction.date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Text>
                  </VStack>
                </Flex>
                <ButtonGroup display='flex' size='xs' justifyContent='flex-end'>
                  <IconButton icon={<EditBtn />} colorScheme='whatsapp' aria-label='Edit' />
                  <IconButton
                    icon={<DelBtn />}
                    colorScheme='red'
                    aria-label='Delete'
                    onClick={() => handleDelete(transaction._id)}
                  />
                </ButtonGroup>
              </ListItem>
            ))}
        </List>
      </CardBody>
    </Card>
  )
}
export default TransactionList
