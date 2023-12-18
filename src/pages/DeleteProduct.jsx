import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const DeleteProduct = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDeleteProduct = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:8000/api/product/${id}`)
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
            <h1 className="text-3xl m-4">Borrar Producto</h1>
            {loading ? <Spinner /> : ''}
            <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <h3>¿Estás seguro que quieres borrar el producto?</h3>
                <button
                    className="p-4 bg-red-600 text-white m-8 w-full"
                    onClick={handleDeleteProduct}
                >
                    Si, estoy seguro
                </button>
            </div>
        </div>
    )
}

export default DeleteProduct;