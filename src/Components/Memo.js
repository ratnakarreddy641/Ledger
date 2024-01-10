import React from 'react'

function Memo(Props) {
  return (
    <div className='w-40 bg-slate-300 p-5 rounded-xl'>
        <h1 className='text-base font-semibold'>{Props.Title}</h1>
        <h2 className='text-xs line-clamp-3'>{Props.Description+""}</h2>
    </div>
  )
}

export default Memo