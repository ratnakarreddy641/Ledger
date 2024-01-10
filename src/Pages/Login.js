import React, { useEffect, useState } from 'react'
import GoogleButton from 'react-google-button'
import { auth,provider } from '../Google/config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Login() {
  const[user, setUser]=useState('');
  const navigate = useNavigate();

  const login = ()=>{
    signInWithPopup(auth,provider).then((result)=>{
      setUser(auth.currentUser.displayName);
      navigate("/dashboard");
             
    })
  }
  useEffect(()=>{
  },[user]);


  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className='Title flex flex-col items-center justify-center'>
          <div className='w-fit relative'>
            <h1 className="text-center text-5xl font-black	"  >Ledger</h1>
            <h1 className='absolute right-0 -bottom-7'>By Epic Poet</h1>
          </div>
          {
            !auth.currentUser&&<GoogleButton className="my-10" onClick={login} type='light'/>
            ||<button className='rounded-3xl bg-slate-200 text-xs p-3 my-10 border hover:border-slate-400' 
            onClick={()=>{navigate("/dashboard")}}
            >Dashboard</button>
          }
          
        </div>
        
      </div>
    </div>
  )
}

export default Login