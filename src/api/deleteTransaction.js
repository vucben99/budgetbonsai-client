import axios from "axios"

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL

async function deleteTransaction(_id) {
  try {
    const response = await axios.delete(`${backendBaseUrl}/api/transactions/${_id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("sessionToken")}`
      }
    })
    return response.status === 200
  } catch (err) {
    console.error(err)
    return false
  }
}

export default deleteTransaction