import { Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { sessionContext } from '../contexts/sessionContext'
import StatsByCurrency from './StatsByCurrency'

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
        <StatsByCurrency transactions={transactions} currency='HUF' />
        <StatsByCurrency transactions={transactions} currency='EUR' />
      </CardBody>
    </Card>
  )
}
export default Stats
