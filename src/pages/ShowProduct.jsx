import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Backbutton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowProduct = () => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8000/api/product/${id}`)
            .then((response) => {
                console.log(response)
                setProduct(response.data.product);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    return (
        <div className="p-4">
            <Backbutton />
            <h1 className="text-3xl my-4">Detalle de Producto</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Id</span>
                        <span>{product.id}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">SKU</span>
                        <span>{product.sku}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Nombre</span>
                        <span>{product.nombre}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Descripción</span>
                        <span>{product.descripcion}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Precio</span>
                        <span>{product.precio}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Cantidad</span>
                        <span>{product.cantidad}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Imagen</span>
                        <span>{product.imagen}</span>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default ShowProduct;