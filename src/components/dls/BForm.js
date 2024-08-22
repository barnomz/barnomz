import { useEffect, useRef, useState } from 'react'

const BForm = ({ onSubmit, children }) => {
  const form = useRef(null)
  const [inputElements, setInputElements] = useState([])

  useEffect(() => {
    setTimeout(() => {
      const elements = form.current.getElementsByTagName('input')
      setInputElements(Array.from(elements))
    }, 10)
  }, [])

  const validateAll = (showError = true) => {
    return new Promise((resolve) => {
      const results = Array.from(inputElements).map((inputEl) =>
        inputEl.validate({ target: { value: inputEl.value } }, showError),
      )
      setTimeout(() => {
        resolve(results.every((result) => result.status))
      }, 0)
    })
  }

  useEffect(() => {
    validateAll(false)
  }, [inputElements])

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (onSubmit) {
      validateAll().then((isFormValid) => {
        onSubmit(isFormValid)
      })
    }
  }

  return (
    <form ref={form} onSubmit={handleFormSubmit}>
      {children}
    </form>
  )
}

export default BForm
