import React from 'react'
import GoogleButton from 'react-google-button'

function Login() {
  const login = ()=>{
    
  }


  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className='Title flex flex-col items-center justify-center'>
          <div className='w-fit relative'>
            <h1 className="text-center text-5xl font-black	"  >Ledger</h1>
            <h1 className='absolute right-0 -bottom-7'>By Epic Poet</h1>
          </div>
          <GoogleButton className="my-10" type='light'/>
        </div>

      </div>
    </div>
  )
}

export default Login