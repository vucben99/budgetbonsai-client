import axios from "axios"

async function deleteTransaction(_id) {
  try {
    const response = await axios.delete(`http://localhost:8000/api/transactions/${_id}`, {
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