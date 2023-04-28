import { useState } from 'react'

function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue)

  function onChange(e) {
    setValue(e.target.value)
  }

  const reset = () => setValue(defaultValue)

  return { value, setValue, onChange, reset }
}

export default useInput
