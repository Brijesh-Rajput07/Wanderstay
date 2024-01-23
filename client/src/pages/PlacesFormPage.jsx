import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Perks from '../Perks';
import axios from 'axios';
import PhotosUploader from '../PhotosUploader';
import AccountNav from '../AccountNav';

export default function PlacesFormPage() {
const {id}=useParams();

  const [title,setTitle]= useState('');
  const [address,setAddress]= useState('');
  const [addedPhotos,setAddedPhotos]= useState([]);
  const [description,setDescription]= useState('');
  const [perks,setPerks]= useState([]);
  const [extraInfo,setExtraInfo]= useState('');
  const [checkIn,setCheckIn]= useState('');
  const [checkOut,setCheckOut]= useState('');
  const [maxGuest,setMaxGuest]= useState(1);
  const [price,setPrice]= useState(1000);
  const [redirect,setRedirect]=useState(false);

  useEffect(()=>
  {
    if(!id)
    {
      return;
    }
    axios.get('/places/'+id).then(response =>
      {
        const {data}=response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuest(data.maxGuest);
        setPrice(data.price);
      });
 },[id]);
  function inputHeader(text)
  {
    return(
      <h2 className='text-2xl mt-4' >{text}</h2>
    );
  }

  function inputDescription(text)
  {
    return(
      <p className='text-gray-500 text-sm'>{text}</p>
    );
  }

function preInput(header,description)
{
  return(
    <>
    {inputHeader(header)}
    {inputDescription(description)}
    </>
  )
}

async function savePlace(ev)
{
  ev.preventDefault();
  const placeData = {
    title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuest,price
  };
  if(id)
  {
    await axios.put('/places/', {
      id,
      ...placeData
    });
    setRedirect(true);
  }else{
    await axios.post('/places', placeData);
    setRedirect(true);
  }
  
}

if(redirect)
{
 return <Navigate to={'/account/places'} />
}

  return (
    <>
    <AccountNav/>
    <div>
              <form onSubmit={savePlace}>
                {preInput('Title','Title for your place,should be short and catchy as in advertisement')}
                <input type="text" value={title} onChange={ev=>setTitle(ev.target.value)} placeholder='Title, for example : My lovely apt'/>

                {preInput('Address','Address to this place')}
                <input type="text" placeholder='Address' value={address} onChange={ev=>setAddress(ev.target.value)}/>


                {preInput('Photos','more = better')}
          
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

                {preInput('Description','Description of the place')}
                <textarea value={description} onChange={ev=>setDescription(ev.target.value)}/>
                
                {preInput('Perks','select all the perks of your place')}
                

                
                <div className='grid grid-cols-2 mt-4 gap-2 md:grid-cols-3 lg:grid-cols-6'>

                  <Perks selected={perks} onChange={setPerks} />

                </div>

                {preInput('Extra info','House rules, etc ')}
                

                <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>

                <h2 className='text-2xl mt-4' >Check in & out times, max guests</h2>
                <p className='text-gray-500 text-sm'>Add check in and out times, remember to have some time window for cleaning the room between guests</p>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                  <div>
                    <h3 className='mt-2 -mb-1'>Check in time</h3>
                    <input type="text" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} placeholder='14'/>
                    </div>
                  <div>
                  <h3 className='mt-2 -mb-1'>Check out time</h3>
                    <input type="text" placeholder='11' value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} />
                    </div>
                  <div>
                  <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                    <input type="number" value={maxGuest} onChange={ev=>setMaxGuest(ev.target.value)}/>
                    </div>
                    <div>
                  <h3 className='mt-2 -mb-1'>Price per night</h3>
                    <input type="number" value={price} onChange={ev=>setPrice(ev.target.value)}/>
                    </div>
                </div>

              
                  <button className='primary my-4'>Save</button>
               
              </form>
            </div>
            </>
  )
}
