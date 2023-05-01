import {
  Flex,
  FormControl,
  FormLabel,
  Input,
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
import { DateTime } from 'luxon'
import { sessionContext } from '../contexts/sessionContext'
import useInput from '../hooks/useInput'
import postNewTransaction from '../api/postNewTransaction'

function TransactionForm() {
  const { transactions, setTransactions } = useContext(sessionContext)

  const name = useInput('')
  const amount = useInput('1.00')
  const currency = useInput('HUF')
  const type = useInput('expense')
  const category = useInput('Unknown')
  const date = useInput('')

  async function handleAddNewTransaction(e) {
    e.preventDefault()
    try {
      console.log(date.value)
      const newTransaction = await postNewTransaction({
        name: name.value,
        amount: parseFloat(amount.value),
        currency: currency.value,
        type: type.value,
        date: date.value.length ? new Date(date.value).toISOString() : new Date().toISOString(),
        category: category.value
      })
      if (newTransaction) {
        setTransactions([newTransaction, ...transactions])
        name.reset()
        amount.reset()
        currency.reset()
        type.reset()
        category.reset()
        date.reset()
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Flex as='form' flexDir='column' gap={3} onSubmit={handleAddNewTransaction}>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type='text'
          autoComplete='off'
          placeholder='Name'
          value={name.value}
          onChange={name.onChange}
          variant='filled'
          _focus={{ bg: '#fff' }}
          maxLength={25}
        />
      </FormControl>
      <Flex gap={3}>
        <FormControl isRequired>
          <FormLabel>Amount</FormLabel>
          <NumberInput
            variant='filled'
            min={0.01}
            max={100000000000}
            precision={2}
            step={1}
            placeholder='Amount'
            value={amount.value}
            onChange={(value) => {
              amount.setValue(value)
            }}
            _focus={{ bg: '#fff' }}
            inputMode='numeric'
          >
            <NumberInputField _focus={{ bg: '#fff' }} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Currency</FormLabel>
          <Select
            value={currency.value}
            onChange={currency.onChange}
            variant='filled'
            _focus={{ bg: '#fff' }}
          >
            <option value='HUF'>HUF</option>
            <option value='EUR'>EUR</option>
          </Select>
        </FormControl>
      </Flex>
      <FormControl>
        <FormLabel>Type</FormLabel>
        <Select
          value={type.value}
          onChange={type.onChange}
          variant='filled'
          _focus={{ bg: '#fff' }}
        >
          <option value='expense'>Expense</option>
          <option value='income'>Income</option>
        </Select>
      </FormControl>
      <Flex gap={3} flexDir={{ base: 'column', sm: 'row', md: 'column', lg: 'row' }}>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select
            value={category.value}
            onChange={category.onChange}
            variant='filled'
            _focus={{ bg: '#fff' }}
          >
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
        <FormControl>
          <FormLabel>Date (optional)</FormLabel>
          <Input
            placeholder='Select date and time'
            type='datetime-local'
            variant='filled'
            _focus={{ bg: '#fff' }}
            value={date.value}
            onChange={date.onChange}
            max={DateTime.local().toISO().slice(0, 19)}
          />
        </FormControl>
      </Flex>
      <Flex justify='center'>
        <Button
          type='submit'
          colorScheme='whatsapp'
          mt='5'
          leftIcon={<AddIcon />}
          isDisabled={!(name.value.length && parseFloat(amount.value))}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  )
}
export default TransactionForm
