import { createContext, useContext } from 'react'

const ToastContext = createContext()
export const useToast = () => useContext(ToastContext)
export default ToastContext
