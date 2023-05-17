import { Heading, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import TransactionForm from './TransactionForm'

function NewTransaction() {
  return (
    <Card as='section' bg='#ffffff99' backdropFilter='blur(10px)' borderRadius='2xl'>
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
