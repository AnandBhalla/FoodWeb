import React, { useEffect,useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast}  from 'react-toastify'

const List = () => {

  const url = import.meta.env.VITE_API_URL;
  const [list, setlist] = useState([])

  const fetchList=async()=>{
    const response=await axios.get(`${url}/api/food/list`)
    if(response.data.success){
      setlist(response.data.data)
    }
    else{
      toast.error("Error")
    }
    
  }

  const removeFood=async (foodId)=>{
      const response=await axios.post(`${url}/api/food/remove`,{id:foodId})
      await fetchList()
      if(response.data.success){
        toast.success("Item Deleted Successfully")
      }
      else{
        toast.error("Something Went Wrong")
      }
  }

  useEffect(() => {
    fetchList()
  }, [])
  

  return (
    <div className='list add flex-col'>
      <p>MENU</p>
      <div className="list-table">
        <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Remove</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format">
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}Rs</p>
                <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
            </div>
          )
        })}
      </div>
      
    </div>
  )
}

export default List
