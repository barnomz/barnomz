import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faTimesCircle,
  faExclamationCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/utils/helpers'

const iconMap = {
  success: faCheckCircle,
  error: faTimesCircle,
  warning: faExclamationCircle,
}

const colorMap = {
  success: 'bg-secondary-dark !text-black',
  error: 'bg-error-600 !text-white',
  warning: 'bg-warning-600 !text-white',
}

const BToast = ({ type, message }) => {
  const wrapperClasses = cn(
    'flex w-full max-w-md items-center justify-between',
    'gap-4 rounded-lg bg-grey-800 p-3 text-grey-400 shadow',
    colorMap[type],
  )

  return (
    <div className={wrapperClasses} role='alert'>
      <div className='flex items-center'>
        <div className='me-1 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg'>
          <FontAwesomeIcon icon={iconMap[type]} size='lg' />
        </div>
        <div className='text-sm font-normal'>{message}</div>
      </div>
      <button
        type='button'
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg p-1.5 transition-all duration-200 hover:bg-white/20',
          colorMap[type],
        )}
        aria-label='Close'
      >
        <FontAwesomeIcon icon={faTimes} className='h-3 w-3' />
      </button>
    </div>
  )
}

export default BToast
