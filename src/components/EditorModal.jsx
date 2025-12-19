import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue
} from '@chakra-ui/react'
import axios from 'axios'
import { DateTime } from 'luxon'
import useInput from '../hooks/useInput'
import putTransaction from '../api/putTransaction'
import { useContext } from 'react'
import { sessionContext } from '../contexts/sessionContext'

function EditorModal({ isOpen, onClose, transaction }) {
  const { setTransactions } = useContext(sessionContext)
  const modalBg = useColorModeValue('rgba(255, 255, 255, 0.6)', 'rgba(26, 32, 44, 0.85)')
  const focusBg = useColorModeValue('#fff', 'gray.700')

  const name = useInput(transaction.name)
  const amount = useInput(transaction.amount)
  const currency = useInput(transaction.currency)
  const type = useInput(transaction.type)
  const category = useInput(transaction.category)
  const date = useInput(transaction.date)

  async function handlePutTransaction(e) {
    e.preventDefault()
    const updatedTransaction = await putTransaction(transaction._id, {
      name: name.value,
      amount: parseFloat(amount.value),
      currency: currency.value,
      type: type.value,
      category: category.value,
      date: new Date(date.value).toISOString()
    })
    if (updatedTransaction) {
      setTransactions((prev) => {
        const index = prev.findIndex((t) => t._id === updatedTransaction._id)
        const newTransactions = [...prev]
        newTransactions[index] = updatedTransaction
        return newTransactions
      })
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter='blur(5px)' />
      <ModalContent bg={modalBg} backdropFilter='blur(10px)' borderRadius='xl'>
        <ModalHeader>
          <Text fontSize={30} fontWeight='bold'>
            Edit Transaction
          </Text>
        </ModalHeader>
        <ModalCloseButton size='lg' />
        <ModalBody>
          <Flex as='form' flexDir='column' gap={3} onSubmit={handlePutTransaction}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type='text'
                autoComplete='off'
                placeholder='Name'
                value={name.value}
                onChange={name.onChange}
                variant='filled'
                _focus={{ bg: focusBg }}
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
                  _focus={{ bg: focusBg }}
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
                  _focus={{ bg: focusBg }}
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
                _focus={{ bg: focusBg }}
              >
                <option value='expense'>Expense</option>
                <option value='income'>Income</option>
              </Select>
            </FormControl>
            <Flex gap={3}>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  value={category.value}
                  onChange={category.onChange}
                  variant='filled'
                  _focus={{ bg: focusBg }}
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
              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  placeholder='Select date and time'
                  type='datetime-local'
                  variant='filled'
                  _focus={{ bg: focusBg }}
                  value={DateTime.fromISO(date.value).toFormat("yyyy-MM-dd'T'HH:mm")}
                  onChange={date.onChange}
                  max={DateTime.local().toISO().slice(0, 19)}
                />
              </FormControl>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={2}>
            <Button variant='outline' colorScheme='red' onClick={onClose}>
              Cancel
            </Button>
            <Button variant='solid' colorScheme='green' onClick={handlePutTransaction}>
              Save
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default EditorModal
