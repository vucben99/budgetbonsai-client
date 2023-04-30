import { Flex, Text, Card } from '@chakra-ui/react'

function StatsByCurrency({ transactions, currency }) {
  return (
    <Card p={3}>
      <Flex justify='space-between'>
        <Text fontSize='lg'>Total income ({currency}):</Text>
        <Text fontSize='lg' color='green.500' fontWeight='bold'>
          {transactions
            ?.filter(
              (transaction) => transaction.type === 'income' && transaction.currency === currency
            )
            .reduce((acc, curr) => acc + curr.amount, 0)
            .toLocaleString()}
        </Text>
      </Flex>
      <Flex justify='space-between'>
        <Text fontSize='lg'>Total expenses ({currency}):</Text>
        <Text fontSize='lg' color='red.400' fontWeight='bold'>
          {transactions
            ?.filter(
              (transaction) => transaction.type === 'expense' && transaction.currency === currency
            )
            .reduce((acc, curr) => acc - curr.amount, 0)
            .toLocaleString()}
        </Text>
      </Flex>
      <Flex justify='space-between'>
        <Text fontSize='lg'>Total balance ({currency}):</Text>
        <Text fontSize='lg' fontWeight='bold'>
          {transactions
            ?.reduce((acc, curr) => {
              if (curr.type === 'income' && curr.currency === currency) {
                return acc + curr.amount
              }
              if (curr.type === 'expense' && curr.currency === currency) {
                return acc - curr.amount
              } else return acc
            }, 0)
            .toLocaleString()}
        </Text>
      </Flex>
    </Card>
  )
}

export default StatsByCurrency
