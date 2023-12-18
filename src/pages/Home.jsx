import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { MdOutlineAddBox } from 'react-icons/md';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);

    const filterData = () => {
        let url = 'http://localhost:8000/api/products?'
        if (name){
            url += `&nombre=${name}`
        }
        if (min >= 1){
            url += `&min=${min}`
        }
        if (max >= 1){
            url += `&min=${max}`
        }
        console.log(url)
        axios
            .get(url)
            .then((response) => {
                console.log(response.data.products)
                setProducts(response.data.products);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
        });
    }

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8000/api/products')
            .then((response) => {
                console.log(response.data.products)
                setProducts(response.data.products);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-center items-center gap-x-4">
                <input
                    className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                    value={name || ""}
                    type="text"
                    name="name"
                    id="name"
                    onChange={e => setName(e.target.value)}
                    placeholder="Nombre"
                />
                <input
                    className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                    value={min || null}
                    type="number"
                    name="min"
                    id="min"
                    onChange={e => setMin(e.target.value)}
                    placeholder="Precio Mínimo"
                />
                <input
                    className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                    value={max || null}
                    type="number"
                    name="max"
                    id="max"
                    onChange={e => setMax(e.target.value)}
                    placeholder="Precio Máximo"
                />
                <button
                    className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                    onClick={e => filterData()}
                >
                    Filtrar
                </button>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Lista de Productos</h1>
                <Link to="/product/create">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className="w-full border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th className="border border-slate-600 rounded-md">No</th>
                            <th className="border border-slate-600 rounded-md">Nombre</th>
                            <th className="border border-slate-600 rounded-md">SKU</th>
                            <th className="border border-slate-600 rounded-md max-md:hidden">Descripción</th>
                            <th className="border border-slate-600 rounded-md">Precio</th>
                            <th className="border border-slate-600 rounded-md">Cantidad</th>
                            <th className="border border-slate-600 rounded-md">Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id} className="h-8">
                                <td className="border border-slate-700 rounded-md text-center">
                                    {product.id}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {product.nombre}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {product.sku}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                                    {product.descripcion}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {product.precio}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {product.cantidad}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    <div className="flex justify-center gap-x-4">
                                        <Link to={`/books/details/${product._id}`}>
                                            <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
                                        </Link>
                                        <Link to={`/books/edit/${product._id}`}>
                                            <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
                                        </Link>
                                        <Link to={`/books/delete/${product._id}`}>
                                            <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Home;