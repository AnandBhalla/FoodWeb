import React, { useState } from 'react';
import './Add.css'; 
import axios from 'axios';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const Add = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Rolls",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const url = import.meta.env.VITE_API_URL;

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        const response = await axios.post(`${url}/api/food/add`, formData);
        if(response.data.success){
            setData({
                name: "",
                description: "",
                price: "",
                category: "Rolls",
            });
            setImage(null);
            toast.success("New Item Added")
        }
        else{
            toast.success("Something Went Wrong")
        }

        
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Food Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id='image'
                        hidden
                        required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Dish name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name='name'
                        placeholder='Enter Food Title'
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Dish Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder='Dish Description'
                        required
                    ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Dish Category</p>
                        <select
                            onChange={onChangeHandler}
                            name="category"
                            value={data.category}
                        >
                            <option value="Rolls">Rolls</option>
                            <option value="Salads">Salads</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name='price'
                        />
                    </div>
                </div>
                <button type='submit' className='add-button'>ADD</button>
            </form>
        </div>
    );
};

export default Add;
