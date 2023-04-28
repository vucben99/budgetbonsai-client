import { Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { sessionContext } from '../contexts/sessionContext'

function Stats() {
  const { transactions } = useContext(sessionContext)

  return (
    <Card
      as='section'
      bg='whiteAlpha.600'
      backdropFilter='blur(10px)'
      borderRadius='2xl'
      gridColumn={{ base: 'span 1', md: 'span 2', xl: 'span 1' }}
    >
      <CardHeader>
        <Heading as='h3' size='lg'>
          Statistics
        </Heading>
      </CardHeader>
      <CardBody>
        <Flex justify='space-between'>
          <Text fontSize='xl'>Total income (HUF):</Text>
          <Text fontSize='xl' color='green.500' fontWeight='bold'>
            {transactions
              ?.filter(
                (transaction) => transaction.type === 'income' && transaction.currency === 'HUF'
              )
              .reduce((acc, curr) => acc + curr.amount, 0)
              .toLocaleString()}
          </Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontSize='xl'>Total expenses (HUF):</Text>
          <Text fontSize='xl' color='red.400' fontWeight='bold'>
            {transactions
              ?.filter(
                (transaction) => transaction.type === 'expense' && transaction.currency === 'HUF'
              )
              .reduce((acc, curr) => acc - curr.amount, 0)
              .toLocaleString()}
          </Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontSize='xl'>Total balance (HUF):</Text>
          <Text fontSize='xl' fontWeight='bold'>
            {transactions
              ?.reduce((acc, curr) => {
                if (curr.type === 'income' && curr.currency === 'HUF') {
                  return acc + curr.amount
                }
                if (curr.type === 'expense' && curr.currency === 'HUF') {
                  return acc - curr.amount
                } else return acc
              }, 0)
              .toLocaleString()}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  )
}
export default Stats
