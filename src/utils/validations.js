// Helpers
export function validate(validations, value) {
  let status = true
  let error = null

  if (!validations?.length) return { status, error }

  for (const validation of validations) {
    if (validation.rule(value)) continue

    error = validation.message
    status = false
    break
  }

  return { status, error }
}

// Validation Book
export function isNullOrUndefined(value) {
  return value === undefined || value === null
}

export function hasValue(value) {
  return !isNullOrUndefined(value) && !!value.length
}

export function isGreaterOrEqualThan(amount) {
  return (value) => hasValue(value) && value >= amount
}

export function isLessOrEqualThan(amount) {
  return (value) => hasValue(value) && value <= amount
}

export function lengthIsGreaterOrEqualThan(count) {
  return (value) => hasValue(value) && value.length >= count
}

export function lengthIsLessOrEqualThan(count) {
  return (value) => hasValue(value) && value.length <= count
}

export function lengthIsEqualTo(count) {
  if (Array.isArray(count))
    return (value) => count.some((c) => hasValue(value) && value.length === c)
  return (value) => hasValue(value) && value.length === count
}

export function valueIsEqualTo(value) {
  return (v) => v === value
}

export function hasNumber(value) {
  const reg = /\d/
  return reg.test(value)
}

export function hasLetter(value) {
  const reg = /[a-zA-Z]/
  return reg.test(value)
}

export function isNumber(value) {
  const reg = /^\d+$/
  return reg.test(value)
}

export function isLetter(value) {
  const reg = /^[A-Za-z]+$/
  return reg.test(value)
}

export function isEmail(value) {
  const reg = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]{2,48}\.[a-zA-Z]{2,8}$/
  return reg.test(value)
}

export function isPhoneNumber(value) {
  const reg = /^([1-9][0-9]{9})$|^([0][0-9]{10})$/
  return reg.test(value)
}

export function isEmailOrPhoneNumber(value) {
  return isEmail(value) || isPhoneNumber(value)
}
