import './Button.css'

const Button = ({
  children,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon = null,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const classes = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    fullWidth && 'button--full-width',
    loading && 'button--loading',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading ? (
        <div className="loading-spinner" />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  )
}

export default Button 