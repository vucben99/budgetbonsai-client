import axios from 'axios'

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

async function postNewTransaction(transaction) {
  try {
    const sessionToken = localStorage.getItem('sessionToken')
    const { data } = await axios.post(`${backendBaseUrl}/api/transactions`, transaction, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      }
    })
    return data
  } catch (err) {
    console.error(err)
    return null
  }
}

export default postNewTransaction