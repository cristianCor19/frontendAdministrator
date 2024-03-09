import { useEffect } from "react";
import { useProduct } from '../context/ProductContext';
import { Link } from "react-router-dom";
import Sidebar from '../components/Sidebar'

function ProductsPage() {
    const { getProducts, products } = useProduct();
    

    useEffect(() => {
        getProducts();
    }, []);

    if (products.length === 0) return (<h1>No users</h1>);

    return (
        <div className="">
            <Sidebar/>
            <div className="margin-all-page">
                <button className="m-0 items-center p-2  bg-blue-500 text-cyan-50 button-register-product"><Link to={'/invenProduct'}>Agregar producto</Link></button>
                <div className="p-5 bg-gray-100">
                    <div className="overflow-auto rounded-lg shadow ">
                        <h1 className="text-xl mb-2">Productos en stocks</h1>
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">No.</th>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Nombre</th>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Precio</th>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Imagen</th>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Cantidad</th>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Descripción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((product) => (
                                    <tr className="bg-white" key={product._id}>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <a href="#" className="font-bold text-blue-500 hover:underline">{product.id_product}</a>
                                        </td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap">
                                        {product.name}
                                        </td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span className="p-3 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50"> {product.price.toLocaleString('es-CO', {style: 'currency',currency: 'COP'})}</span>
                                        </td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap"><img className="w-20" src={product.image} alt="" /></td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap">{product.quantity}</td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap">{product.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    
                </div>
            </div>
        </div>
    );
}

export default ProductsPage;
