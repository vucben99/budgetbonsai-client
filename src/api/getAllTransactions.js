import axios from "axios"

async function getAllTransactions() {
  try {
    const { data } = await axios.get('http://localhost:8000/api/transactions', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('sessionToken')}`
      }
    })
    return data
  } catch (err) {
    console.error(err)
  }
}

export default getAllTransactions