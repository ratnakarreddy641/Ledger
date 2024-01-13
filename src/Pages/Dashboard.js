import React, { useState, useEffect } from 'react'
import { auth, db } from '../Google/config';
import Memo from '../Components/Memo';
import { collection,doc, query,onSnapshot, where, addDoc, getDocs, deleteDoc  } from "firebase/firestore";
import add from '../add.png'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom'


function Dashboard() {
  const [result, setResult] = useState([])
  const [open, setOpen] = useState(false)
  const [clickdata, setCData]=useState([])
  const navigate = useNavigate();


  const getdata = async () => {
    const collectionRef = collection(db,auth.currentUser.email);

    // Use onSnapshot to listen for real-time updates
    const unsubscribe = onSnapshot(collectionRef,(snapshot) => {
      const updatedDocuments = snapshot.docs.map((doc) => ({
        id: doc.id,
        data:doc.data(),
      }));
      setResult(updatedDocuments);
    });


  }
  const setData = async () => {
    var Title = document.getElementById("name").value
    var Description = document.getElementById("desc").value

    if (Title == '' && Description == '') { return }
    await addDoc(collection(db, auth.currentUser.email), {
      T: Title,
      D: Description
    });
    handleClose();
  }

  const deleteMemo = async()=>{
    console.log(clickdata.id)
    await deleteDoc(doc(db,auth.currentUser.email,clickdata.id)) 
    setOpen(false)
    closeDialog()
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const signOut = () => {
    auth.signOut();
    navigate("/");
  }

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    console.log("Clicked")
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };


  useEffect(() => {
    getdata()
  }, [])

  return (
    <div>
      <div className='flex items-center justify-between m-5 '>
        <div className='Title w-fit relative'>
          <h1 className="text-center text-4xl font-black	"  >Ledger</h1>
          <h1 className='absolute text-xs right-0 -bottom-5'>By Epic Poet</h1>
        </div>
        <div className='flex items-center bg-slate-200 rounded-3xl px-3 py-2 border hover:border-slate-400 cursor-pointer' onClick={signOut}>
          <h1 className='text-xs'>{auth.currentUser.displayName}</h1>
          <img className='w-8 rounded-full mx-1' src={auth.currentUser.photoURL} alt="User Image" />
        </div>
      </div>


      <div className='p-10 w-fit grid gap-2 grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8' >

        {result.map(e => {
          return (
            
              <div onClick={()=>{
                setCData(e)
                openDialog()
              }}><Memo Title={e.data.T} Description={e.data.D} /></div>
          )
        })}

        {isOpen && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 shadow-md bg-slate-100">
            <div className="text-center">
              <p className="text-base font-semibold">{clickdata.data.T}</p>
              <p>{clickdata.data.D}</p>
              <button onClick={closeDialog} className="mt-4 mx-2 bg-gray-500 text-white py-2 px-4 rounded">Close</button>
              <button onClick={deleteMemo} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded" >Delete Memo</button>
            </div>
          </div>
        )}
      </div>
      <div className='flex justify-end px-5 items-center' onClick={handleClickOpen} >
        <h1 className='px-2'>Add Notes</h1>
        <img class="w-10 hover:rotate-180 duration-700 cursor-pointer" src={add} />
      </div>
      <div>
        <Dialog open={open} onClose={handleClose} >
          <DialogTitle>New Ledger</DialogTitle>
          <DialogContent >
            <TextField autoFocus margin="dense" id="name" label="Title" fullWidth variant="standard" />
            <TextField autoFocus margin="dense" id="desc" label="Decription" fullWidth multiline variant="standard" />
          </DialogContent>
          <DialogActions>
            <Button onClick={setData}>Add Ledger</Button>
            
          </DialogActions>
        </Dialog>
      </div>
    </div>

  )
}

export default Dashboard;