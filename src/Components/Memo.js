import React from 'react'

function Memo(Props) {
  return (
    <div className='w-fit bg-slate-200 p-5 rounded-xl'>
        <h1 className='text-lg'>{Props.Title}</h1>
        <h2 className='text-xs'>{Props.Description}</h2>
    </div>
  )
}

export default Memo