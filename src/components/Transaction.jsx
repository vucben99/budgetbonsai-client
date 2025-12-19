import { ButtonGroup, Flex, IconButton, ListItem, Spacer, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { AiFillEdit as EditBtn, AiFillDelete as DelBtn } from 'react-icons/ai'
import { useContext } from 'react'
import { sessionContext } from '../contexts/sessionContext'
import deleteTransaction from '../api/deleteTransaction'
import { useDisclosure } from '@chakra-ui/react'
import EditorModal from './EditorModal'

function Transaction({ transaction }) {
  const { setTransactions } = useContext(sessionContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const itemBg = useColorModeValue('gray.200', 'rgba(45, 55, 72, 0.6)')
  const textColor = useColorModeValue('gray.800', 'white')
  const categoryColor = useColorModeValue('gray.600', 'gray.300')
  const dateColor = useColorModeValue('gray.500', 'gray.400')

  async function handleDelete(id) {
    try {
      const isDeleted = await deleteTransaction(id)
      if (isDeleted) {
        setTransactions((prev) => prev.filter((transaction) => transaction._id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ListItem bg={itemBg} p={3} borderRadius='lg'>
      <Flex spacing={1}>
        <VStack align='flex-start' spacing={0}>
          <Text fontSize='lg' whiteSpace='nowrap' color={textColor}>
            {transaction.name}
          </Text>
          <Text fontSize='sm' whiteSpace='nowrap' color={categoryColor}>{transaction.category}</Text>
        </VStack>
        <Spacer />
        <VStack align='flex-end' spacing={0}>
          <Text color={transaction.type === 'income' ? 'green.500' : 'red.400'} fontWeight='bold' whiteSpace='nowrap'>
            {transaction.type === 'income' ? '+' : '-'}
            {transaction.amount.toLocaleString()}
            {` ${transaction.currency}`}
          </Text>
          <Text fontSize='sm' color={dateColor} whiteSpace='nowrap'>
            {new Date(transaction.date).toLocaleDateString() + ' '}
            {new Date(transaction.date).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </VStack>
      </Flex>
      <ButtonGroup display='flex' size='xs' justifyContent='flex-end'>
        <IconButton icon={<EditBtn />} variant='solid' colorScheme='green' aria-label='Edit' onClick={onOpen} />
        <IconButton
          icon={<DelBtn />}
          colorScheme='red'
          aria-label='Delete'
          onClick={() => handleDelete(transaction._id)}
        />
      </ButtonGroup>
      <EditorModal isOpen={isOpen} onClose={onClose} transaction={transaction} />
    </ListItem>
  )
}
export default Transaction
