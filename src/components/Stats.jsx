import { Card, CardBody, CardHeader, VStack, Heading, useColorModeValue } from '@chakra-ui/react'
import { useContext } from 'react'
import { sessionContext } from '../contexts/sessionContext'
import StatsByCurrency from './StatsByCurrency'

function Stats() {
  const { transactions } = useContext(sessionContext)
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.6)', 'rgba(26, 32, 44, 0.85)')

  return (
    <Card
      as='section'
      bg={cardBg}
      backdropFilter='blur(10px)'
      borderRadius='2xl'
      gridColumn={{ base: 'span 1', md: 'span 2', xl: 'span 1' }}
    >
      <CardHeader pb={0}>
        <Heading as='h3' size='lg'>
          Statistics
        </Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={3} align='stretch'>
          <StatsByCurrency transactions={transactions} currency='HUF' />
          <StatsByCurrency transactions={transactions} currency='EUR' />
        </VStack>
      </CardBody>
    </Card>
  )
}
export default Stats
