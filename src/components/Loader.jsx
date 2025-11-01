import React from 'react'

const Loader = ({height , width}) => {

  let customStyle = {};
  if (height) customStyle.height = height;
  if (width) customStyle.width = width;

  return (
    <div className='min-h-50 w-full flex items-center justify-center bg-neutral-800' style={customStyle}>
        <div className='h-15 aspect-square rounded-full border-2 border-y-white border-x-transparent animate-spin'>

        </div>
    </div>
  )
}

export default Loader