import React, { useState } from 'react'
import { auth ,db} from '../Google/config';
import Memo from '../Components/Memo';
import { doc, getDoc } from "firebase/firestore"; 
import { useEffect } from 'react';



function Dashboard() {
  const[result,setResult] =useState([])
  const getdata = async()=>{
    const docRef = doc(db, auth.currentUser.email, "202311061236");
    const docSnap = await getDoc(docRef);
    setResult(docSnap.data())

  }

  useEffect(()=>{
    getdata()
    console.log("Logging data from firestore")
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
      <Memo Title={result.Title} Description={result.Description} />

    </div>

  )
}

export default Dashboard;