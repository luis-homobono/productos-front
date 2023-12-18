import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    const handleSaveBook = () => {
        const data = {
            'nombre': name,
            'descripcion': description,
            'precio': price,
            'cantidad': quantity,
            'imagen': image
        };
        console.log(data)
        setLoading(true);
        axios
            .post('http://localhost:8000/api/products/create', data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })
    }

    return (
        <div className="p-4 ">
            <BackButton />
            <h1 className="text-3xl m-4">Crear Producto</h1>
            {loading ? <Spinner /> : ''}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-2 border-gray-500 px-4 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Descripción</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border-2 border-gray-500 px-4 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Precio</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border-2 border-gray-500 px-4 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Cantidad</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="border-2 border-gray-500 px-4 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Imagen</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="border-2 border-gray-500 px-4 w-full"
                    />
                </div>
                <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default CreateProduct;