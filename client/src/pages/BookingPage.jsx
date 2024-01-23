import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AddressLink from '../AddressLink';
import PlaceGallery from '../PlaceGallery';
import BookingsDate from '../BookingsDate';

export default function BookingPage() {
  const {id}=useParams();
  const navigate = useNavigate();
  const [booking,setBooking]= useState(null);
  useEffect(()=>
  {
    if(id)
    {
      axios.get('/bookings').then(response =>
        {
          const foundBooking = response.data.find(({_id}) => _id === id);
          if(foundBooking)
          {
            setBooking(foundBooking);
          }
        })
    }
  },[id]);

  if(!booking)
  {
    return '';
  }

  const datatosend = booking.price;
  function goToRezorPay(){
    navigate("/RezorPay",{ state : { price : datatosend}})
  }
  return (
    <div className='my-8'>
     <h1 className='text-3xl'>{booking.place.title}</h1>
     <AddressLink>{booking.place.address}</AddressLink>
     <div className="flex bg-gray-200 p-6 my-6 rounded-2xl items-center justify-between">
      <div>
      <h2 className='text-xl mb-4'>Your booking information:</h2>
     <BookingsDate booking={booking}/>
      </div>
      
      <button 
       onClick={goToRezorPay} className='bg-primary p-6 text-white rounded-2xl'>
        <div> Pay Here Total Price </div> 
        <div className='text-3xl'>&#8377;{booking.price}</div>
        
      </button>
     
     </div>
     <PlaceGallery place={booking.place}/>
    </div>
  )
}
