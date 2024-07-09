import React,{useState} from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import {useFormik} from 'formik'
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {
  const [image,setImage]=useState(false)
  const formik=useFormik({
     initialValues:{
      name:'',
      description:'',
      category:'Salad',
      price:0
     },
     onSubmit:async(values,{resetForm})=>{
                               
                               const formData=new FormData();
                               formData.append("name",values.name)
                               formData.append("description",values.description)
                               formData.append("category",values.category)
                               formData.append("price",values.price)
                               formData.append("image",image)
                               const response=await axios.post(`${url}/api/food/add`,formData)
                                if (response.data.success){
                                  resetForm();
                                  setImage(false)
                                  toast.success('Food Item added Sucessfully')
                                }

                              }
  })
  return (
    <div className='add'>
      <form onSubmit={formik.handleSubmit}  className="flex-col">
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt='' />

          </label>
          <input onChange={(e)=>{setImage(e.target.files[0])}} type='file' id='image' hidden required />

        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <label>
            <input type="text" value={formik.values.name} onChange={formik.handleChange} name="name" placeholder='Enter here' />
          </label>
        </div>
        <div className="add-product-description flex-col">
          <p>Description</p>
          <textarea    value={formik.values.description} onChange={formik.handleChange}  name="description" rows='6' placeholder='Enter description here'></textarea>
        </div>
        <div className="add-category-price">
           <div className="add-category flex-col">
            <p>Select Category</p>
            <select value={formik.values.category} onChange={formik.handleChange} name='category'>
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
           </div>
           <div className="add-price">
            <p>Product Price</p>
      
              <input type="number" value={formik.values.price} onChange={formik.handleChange} name="price" placeholder='Enter Price here' />
           
           </div>
        </div>

        <button type='submit' className='add-btn'>Submit</button>
      </form>

    </div>
  )
}

export default Add
