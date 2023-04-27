import { useContext, useEffect } from "react"
import { sessionContext } from "../contexts/sessionContext"
import Dashboard from "../components/Dashboard"

function HomePage() {
  useEffect(() => {
    document.title = "Home - BudgetBonsai"
  }, [])

  const { isLoggedIn, setIsLoggedIn } = useContext(sessionContext)

  return (
    <>
      {!isLoggedIn ? <p>BudgetBonsai - Manage your expenses and incomes all in one place!</p> : <Dashboard />}
    </>
  )
}
export default HomePage
