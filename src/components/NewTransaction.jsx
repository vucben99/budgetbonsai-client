import postNewTransaction from '../api/postNewTransaction'
import useInput from '../hooks/useInput'
import {
  SimpleGrid,
  Flex,
  Container,
  Text,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  List,
  ListItem,
  Spacer,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import { sessionContext } from '../contexts/sessionContext'

function NewTransaction() {
  const { transactions, setTransactions } = useContext(sessionContext)

  const name = useInput()
  const amount = useInput()
  const currency = useInput()
  const type = useInput()

  async function handleAddNewTransaction(e) {
    e.preventDefault()
    try {
      const transactionToPost = {
        name: name.value,
        amount: amount.value,
        currency: currency.value,
        type: type.value,
        date: new Date().toISOString(),
        category: 'Food'
      }
      const newTransaction = await postNewTransaction(transactionToPost)
      if (newTransaction) {
        setTransactions([newTransaction, ...transactions])
        name.setValue('')
        amount.setValue('')
        currency.setValue('')
        type.setValue('')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Card as='section' bg='gray.100' boxShadow='0 0 5px gray' borderRadius='lg'>
      <CardHeader>
        <Heading as='h3' size='lg'>
          New transaction
        </Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleAddNewTransaction}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type='text' placeholder='Name' value={name.value} onChange={name.onChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Amount</FormLabel>
            <Input
              type='number'
              placeholder='Amount'
              value={amount.value}
              onChange={amount.onChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Currency</FormLabel>
            <Select
              placeholder='Select currency'
              value={currency.value}
              onChange={currency.onChange}
            >
              <option value='HUF'>HUF</option>
              <option value='EUR'>EUR</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Type</FormLabel>
            <Select placeholder='Transaction type' value={type.value} onChange={type.onChange}>
              <option value='expense'>Expense</option>
              <option value='income'>Income</option>
            </Select>
          </FormControl>
          <Flex justify='center'>
            <Button type='submit' colorScheme='whatsapp' mt='5' leftIcon={<AddIcon />}>
              Add transaction
            </Button>
          </Flex>
        </form>
      </CardBody>
    </Card>
  )
}
export default NewTransaction
