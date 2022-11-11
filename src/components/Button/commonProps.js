const commonProps = {
  to: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'button'
  },
  large: Boolean,
  wide: Boolean,
  color: {
    type: String,
    default: null
  },
  loading: Boolean,
  disabled: Boolean
}

export default commonProps