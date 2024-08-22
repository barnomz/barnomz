import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import BLink from './BLink'
import { cn } from '@/utils/helpers'

const BBtn = ({
  to,
  target = '_self',
  block = false,
  disabled = false,
  loading = false,
  preIcon,
  icon,
  iconClass,
  iconSize = 'lg',
  postIcon,
  color = 'secondary',
  onClick,
  children,
  ...props
}) => {
  const renderIcon = (iconName) => {
    return (
      iconName && (
        <FontAwesomeIcon
          icon={iconName}
          spin={loading}
          size={iconSize}
          className={iconClass}
        />
      )
    )
  }

  props.className = cn(
    'flex justify-center items-center gap-x-2 ripple',
    'text-sm font-medium outline-none transition-all duration-200',
    color.includes('-text')
      ? 'hover:underline underline-offset-8'
      : 'py-2 sm:py-3 px-4 rounded',
    disabled
      ? 'bg-grey-50 text-grey-200 cursor-default pointer-events-none'
      : getColorClasses(color),
    {
      'w-full': block,
    },
    props.className,
  )

  if (to) {
    return (
      <BLink
        to={to}
        target={target}
        block={block}
        disabled={disabled}
        loading={loading}
        preIcon={preIcon}
        icon={icon}
        iconClass={iconClass}
        iconSize={iconSize}
        postIcon={postIcon}
        color='transparent'
        onClick={onClick}
        {...props}
      >
        {children}
      </BLink>
    )
  }

  return (
    <button disabled={disabled} onClick={onClick} {...props}>
      {preIcon && !loading && renderIcon(preIcon)}
      {icon || loading ? renderIcon(loading ? faSpinner : icon) : children}
      {postIcon && !loading && renderIcon(postIcon)}
    </button>
  )
}

const colorClasses = {
  'primary-text': 'text-primary-dark hover:border-primary-dark',
  primary: 'bg-primary text-grey-50 hover:bg-primary-light',
  'primary-light': 'bg-primary-light text-grey-50 hover:bg-primary-lighter',
  'secondary-text': 'text-secondary hover:border-secondary',
  secondary: 'bg-secondary text-grey-900 hover:bg-secondary-light',
  success:
    'bg-success-600 text-white hover:bg-success-700 active:bg-success-800',
  error: 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800',
  'grey-text': 'text-grey-50 hover:border-grey-100',
  grey: 'bg-grey-50 text-grey-800 hover:bg-grey-200 active:bg-grey-300',
  ghost: 'hover:bg-white/10',
}

const getColorClasses = (color) => {
  return colorClasses[color] || ''
}

export default BBtn
