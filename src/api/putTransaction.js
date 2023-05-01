import axios from 'axios'

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

async function putTransaction(_id, editedTransaction) {
  try {
    const response = await axios.put(`${backendBaseUrl}/api/transactions/${_id}`, editedTransaction, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
      }
    })
    return response.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export default putTransaction