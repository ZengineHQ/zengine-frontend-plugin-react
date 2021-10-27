import React from 'react'

export const Throbber = ({ className }) => {
  return (
    <div className={`throbber-container d-flex justify-content-center align-items-center ${className || ''}`}>
      <img src="https://platform.zenginehq.com/images/ajax-loader3.gif" alt={''} />
    </div>
  )
}
