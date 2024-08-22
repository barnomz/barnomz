import { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import BInput from './BInput'
import BBtn from './BBtn'

const BInputPassword = ({
  label,
  hideLabel = false,
  labelSlot,
  labelAsideSlot,
  placeholder,
  required = false,
  icon,
  readonly = false,
  disabled = false,
  wrapperClass,
  inputClass,
  dir = 'ltr',
  autofocus = false,
  autocomplete,
  validations = [],
  onChange,
  value,
  ...props
}) => {
  const [show, setShow] = useState(false)

  const toggleShow = (event) => {
    event.preventDefault()
    setShow(!show)
  }

  const type = show ? 'text' : 'password'

  const appendSlot = (
    <div className='flex h-6 w-6 items-center justify-center'>
      <BBtn
        icon={show ? faEye : faEyeSlash}
        iconSize={'lg'}
        color='grey-text'
        onClick={toggleShow}
      ></BBtn>
    </div>
  )

  return (
    <BInput
      label={label}
      hideLabel={hideLabel}
      labelSlot={labelSlot}
      labelAsideSlot={labelAsideSlot}
      appendSlot={appendSlot}
      placeholder={placeholder}
      required={required}
      icon={icon}
      readonly={readonly}
      disabled={disabled}
      wrapperClass={wrapperClass}
      inputClass={inputClass}
      dir={dir}
      autofocus={autofocus}
      type={type}
      autocomplete={autocomplete}
      validations={validations}
      onChange={onChange}
      value={value}
      {...props}
    />
  )
}

export default BInputPassword
