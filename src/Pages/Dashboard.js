import React, { useState } from 'react'
import { auth, db } from '../Google/config';
import Memo from '../Components/Memo';
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect } from 'react';
import add from '../add.png'


function Dashboard() {
  const [result, setResult] =useState([])
  const getdata = async () => {
    const docSnap = await getDocs(collection(db, auth.currentUser.email));
    const documentsData = docSnap.docs.map(doc => ({
      id: doc.id,
      data: doc.data(),
    }));
    setResult(documentsData)
  }

  useEffect(() => {
    getdata()
    console.log("Logging data from firestore" ,result)
  },[])


  return (
    <div>
      <div className='flex items-center justify-between m-5 '>
        <div className='Title w-fit relative'>
          <h1 className="text-center text-4xl font-black	"  >Ledger</h1>
          <h1 className='absolute text-xs right-0 -bottom-5'>By Epic Poet</h1>
        </div>
        <div className='flex items-center bg-slate-200 rounded-3xl px-3 py-2 border hover:border-slate-400 cursor-pointer'>
          <h1 className='text-xs'>{auth.currentUser.displayName}</h1>
          <img className='w-8 rounded-full mx-1' src={auth.currentUser.photoURL} alt="User Image" />
        </div>
      </div>


      <div className='p-10 w-fit grid gap-2 grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8' >
        
        {result.map(e=>{
          return(
            <Memo Title={e.data.T} Description={e.data.D} /> 
          )
        })}
      </div>
      <div className='flex justify-end px-5 items-center' >
      <h1 className='px-2'>Add Notes</h1>
      <img class="w-10 hover:rotate-180 duration-700 cursor-pointer" src={add}/>
        </div>
    </div>

  )
}

export default Dashboard;