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
  ButtonGroup,
  Image
} from '@chakra-ui/react'
import { useContext } from 'react'
import { sessionContext } from '../contexts/sessionContext'
import Transaction from './Transaction'

function TransactionList() {
  const { transactions } = useContext(sessionContext)

  return (
    <Card as='section' bg='#ffffff99' backdropFilter='blur(10px)' borderRadius='2xl'>
      <CardHeader pb={0}>
        <Heading as='h3' size='lg'>
          Transactions
        </Heading>
      </CardHeader>
      <CardBody maxH='70vh' overflowY='auto'>
        <List spacing={2}>
          {!transactions?.length && (
            <Flex boxSize='5rem' justify='center'>
              <Image src='empty.gif' alt='No transactions yet' />
            </Flex>
          )}
          {transactions?.length &&
            transactions
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((transaction) => (
                <Transaction transaction={transaction} key={transaction._id} />
              ))}
        </List>
      </CardBody>
    </Card>
  )
}
export default TransactionList
