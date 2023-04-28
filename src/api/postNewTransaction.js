import axios from 'axios'

async function postNewTransaction(transaction) {
  try {
    const sessionToken = localStorage.getItem('sessionToken')
    const { data } = await axios.post('http://localhost:8000/api/transactions', transaction, {
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