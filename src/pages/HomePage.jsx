import { useContext, useEffect } from 'react'
import { Container } from '@chakra-ui/react'
import { sessionContext } from '../contexts/sessionContext'
import Dashboard from '../pages/Dashboard'
import Navbar from '../components/Navbar'

function HomePage() {
  useEffect(() => {
    document.title = 'BudgetBonsai'
  }, [])

  const { isLoggedIn } = useContext(sessionContext)

  return !isLoggedIn ? (
    <>
      <Navbar />
      <h1 style={{ fontSize: '3rem', color: 'white', textAlign: 'center', marginTop: '60px' }}>
        BudgetBonsai - Manage your expenses and incomes all in one place!
      </h1>
    </>
  ) : (
    <>
      <Navbar />
      <Dashboard />
    </>
  )
}
export default HomePage
