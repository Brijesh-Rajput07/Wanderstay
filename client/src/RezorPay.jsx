import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './App.css';
import axios from "axios";
import { useLocation } from 'react-router-dom'


function RezorPay() {

  const location = useLocation();

      const [book,setBook] = useState({
        name:"Unlock the Doors to Unforgettable Hospitality.",
        author: "Brijesh Rajput",
        img:"https://a0.muscache.com/im/pictures/4459356a-45d8-495b-bde0-3626222de638.jpg?im_w=1200",
       
        price: location.state.price,
      })
      
      const initPayment = (data) =>
      {
        const options={
          key:"rzp_test_EkAED1VliPCEfm",
          amount: data.amount,
          currency:data.currency,
          name:book.name,
          description:"Test Transaction",
          image:book.img,
          order_id:data.id,
          handler:async (response)=>
          {
            try{
              const verifyUrl = "http://localhost:4000/api/payment/verify";
              const {data} = await axios.post(verifyUrl,response);
              console.log(data);
            }
            catch(error)
            {
              console.log(error);
            }
          },
          theme:{
            color:"#3399cc",
          }
        }
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    
      const handlePayment = async() =>
      {
        try{
          const orderUrl = "http://localhost:4000/api/payment/orders";
          const {data} = await axios.post(orderUrl,{amount: book.price});
          console.log(data);
          initPayment(data.data);
        }catch(error)
        {
          console.log(error);
        }
      }
      return (
        <div className="App">
          <div className="book_container">
            <img src={book.img} alt="book_img" className='book_img'/>
            <p className='book_name fon'>{book.name}</p>
            <p className='book_author'>By {book.author}</p>
            <p className='book_price'>
              Price : <span>&#8377; {book.price}</span>
              <button onClick={handlePayment} className='book_btn'>Book Now</button>
            </p>
          </div>
        </div>
      );
}

export default RezorPay
