import { createContext, useEffect, useState } from 'react'
const sessionContext = createContext()

export function SessionContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [transactions, setTransactions] = useState([])

  return (
    <sessionContext.Provider value={{ isLoggedIn, setIsLoggedIn, transactions, setTransactions }}>
      {children}
    </sessionContext.Provider>
  )
}

export { sessionContext }
