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
  InputGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Button
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import { sessionContext } from '../contexts/sessionContext'

function NewTransaction() {
  const { transactions, setTransactions } = useContext(sessionContext)

  const name = useInput('')
  const amount = useInput('1')
  const currency = useInput('HUF')
  const type = useInput('expense')
  const category = useInput('Unknown')

  async function handleAddNewTransaction(e) {
    e.preventDefault()
    try {
      const newTransaction = await postNewTransaction({
        name: name.value,
        amount: parseFloat(amount.value),
        currency: currency.value,
        type: type.value,
        date: new Date().toISOString(),
        category: category.value
      })
      if (newTransaction) {
        setTransactions([newTransaction, ...transactions])
        name.reset()
        amount.reset()
        currency.reset()
        type.reset()
        category.reset()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Card as='section' bg='whiteAlpha.600' backdropFilter='blur(10px)' borderRadius='2xl'>
      <CardHeader>
        <Heading as='h3' size='lg'>
          New transaction
        </Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleAddNewTransaction}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type='text'
              placeholder='Name'
              value={name.value}
              onChange={name.onChange}
              variant='filled'
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Amount</FormLabel>
            <NumberInput
              variant='filled'
              min={0.01}
              max={1000000000}
              precision={2}
              step={1}
              placeholder='Amount'
              value={amount.value}
              onChange={(value) => {
                amount.setValue(value)
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Currency</FormLabel>
            <Select value={currency.value} onChange={currency.onChange} variant='filled'>
              <option value='HUF'>HUF</option>
              <option value='EUR'>EUR</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Type</FormLabel>
            <Select value={type.value} onChange={type.onChange} variant='filled'>
              <option value='expense'>Expense</option>
              <option value='income'>Income</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select value={category.value} onChange={category.onChange} variant='filled'>
              <option value='Groceries'>Groceries</option>
              <option value='Restaurant'>Restaurant</option>
              <option value='Transport'>Transport</option>
              <option value='Bills'>Bills</option>
              <option value='Education'>Education</option>
              <option value='Travel'>Travel</option>
              <option value='Housing'>Housing</option>
              <option value='Utilities'>Utilities</option>
              <option value='Clothing'>Clothing</option>
              <option value='Entertainment'>Entertainment</option>
              <option value='Health'>Health</option>
              <option value='Gifts'>Gifts</option>
              <option value='Salary'>Salary</option>
              <option value='Income'>Income</option>
              <option value='Other'>Other</option>
              <option value='Unknown'>Unknown</option>
            </Select>
          </FormControl>
          <Flex justify='center'>
            <Button
              type='submit'
              colorScheme='whatsapp'
              mt='5'
              leftIcon={<AddIcon />}
              isDisabled={!(name.value.length && parseFloat(amount.value))}
            >
              Add transaction
            </Button>
          </Flex>
        </form>
      </CardBody>
    </Card>
  )
}
export default NewTransaction
