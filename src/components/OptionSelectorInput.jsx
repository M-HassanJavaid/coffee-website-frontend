import React from 'react'

const OpenSelectorInput = ({onChange , isDefault , name , value , extraPrice}) => {
  return (
    <label
      className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-neutral-100"
    >
      <input
        defaultChecked
        type="radio"
        name={opt.name}
        onChange={() =>
          handleOptionChange(opt.name, 0)
        }
        className="accent-neutral-900"
      />
      <span className="text-neutral-700">
        None
      </span>
    </label>
  )
}

export default OpenSelector
