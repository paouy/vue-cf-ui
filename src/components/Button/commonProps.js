const commonProps = {
  to: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'button'
  },
  large: {
    type: Boolean,
    default: false
  },
  wide: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

export default commonProps