import { useContext, useEffect } from 'react'
import { sessionContext } from '../contexts/sessionContext'
import Dashboard from '../pages/Dashboard'
import { Container } from '@chakra-ui/react'

function HomePage() {
  useEffect(() => {
    document.title = 'Home - BudgetBonsai'
  }, [])

  const { isLoggedIn } = useContext(sessionContext)

  return !isLoggedIn ? (
    <h1 style={{ fontSize: '3rem', color: 'white', textAlign: 'center' }}>
      BudgetBonsai - Manage your expenses and incomes all in one place!
    </h1>
  ) : (
    <Dashboard />
  )
}
export default HomePage
