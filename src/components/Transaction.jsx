import { ButtonGroup, Flex, IconButton, ListItem, Spacer, Text, VStack } from '@chakra-ui/react'
import { AiFillEdit as EditBtn, AiFillDelete as DelBtn } from 'react-icons/ai'
import { useContext } from 'react'
import { sessionContext } from '../contexts/sessionContext'
import deleteTransaction from '../api/deleteTransaction'
import { useDisclosure } from '@chakra-ui/react'
import EditorModal from './EditorModal'

function Transaction({ transaction }) {
  const { setTransactions } = useContext(sessionContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

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
    <ListItem bg='gray.200' p={3} borderRadius='lg'>
      <Flex spacing={1}>
        <VStack align='flex-start' spacing={0}>
          <Text fontSize='lg' whiteSpace='nowrap'>
            {transaction.name}
          </Text>
          <Text fontSize='sm' whiteSpace='nowrap'>{transaction.category}</Text>
        </VStack>
        <Spacer />
        <VStack align='flex-end' spacing={0}>
          <Text color={transaction.type === 'income' ? 'green.500' : 'red.400'} fontWeight='bold' whiteSpace='nowrap'>
            {transaction.type === 'income' ? '+' : '-'}
            {transaction.amount.toLocaleString()}
            {` ${transaction.currency}`}
          </Text>
          <Text fontSize='sm' color='gray.500' whiteSpace='nowrap'>
            {new Date(transaction.date).toLocaleDateString() + ' '}
            {new Date(transaction.date).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </VStack>
      </Flex>
      <ButtonGroup display='flex' size='xs' justifyContent='flex-end'>
        <IconButton icon={<EditBtn />} colorScheme='whatsapp' aria-label='Edit' onClick={onOpen} />
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
