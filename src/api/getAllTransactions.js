import axios from "axios"

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

async function getAllTransactions() {
  try {
    const { data } = await axios.get(`${backendBaseUrl}/api/transactions`, {
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