import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { cn } from '@/utils/helpers'

const BLink = ({
  to,
  target = '_self',
  block = false,
  disabled = false,
  loading = false,
  preIcon,
  icon,
  iconClass,
  iconSize = 'sm',
  postIcon,
  color = 'secondary',
  onClick,
  children,
  ...props
}) => {
  props.className = cn(
    'flex justify-center items-center gap-x-2',
    'text-sm font-medium outline-none transition-all duration-200 underline-offset-8',
    disabled
      ? 'text-grey-200 cursor-default pointer-events-none'
      : getColorClasses(color),
    {
      'w-full': block,
      'hover:underline': color !== 'transparent',
    },
    props.className,
  )

  const renderIcon = (iconName) => {
    if (!iconName) return null
    return (
      <FontAwesomeIcon
        icon={iconName}
        spin={loading}
        size={iconSize}
        className={iconClass}
      />
    )
  }

  return (
    <Link href={to} target={target} passHref onClick={onClick} {...props}>
      {preIcon && !loading && renderIcon(preIcon)}
      {icon || loading ? renderIcon(loading ? faSpinner : icon) : children}
      {postIcon && !loading && renderIcon(postIcon)}
    </Link>
  )
}

const getColorClasses = (color) => {
  switch (color) {
    case 'primary':
      return 'text-primary'
    case 'secondary':
      return 'text-secondary-dark'
    case 'grey':
      return 'text-grey-600'
    case 'transparent':
      return ''
    default:
      return ''
  }
}

export default BLink
