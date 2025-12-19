import { Heading, Card, CardHeader, CardBody, useColorModeValue } from '@chakra-ui/react'
import TransactionForm from './TransactionForm'

function NewTransaction() {
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.6)', 'rgba(26, 32, 44, 0.85)')

  return (
    <Card as='section' bg={cardBg} backdropFilter='blur(10px)' borderRadius='2xl'>
      <CardHeader pb={0}>
        <Heading as='h3' size='lg'>
          New transaction
        </Heading>
      </CardHeader>
      <CardBody>
        <TransactionForm />
      </CardBody>
    </Card>
  )
}
export default NewTransaction
