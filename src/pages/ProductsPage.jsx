import { useEffect, useState } from "react";
import { useProduct } from '../context/ProductContext';
import { SnackbarProvider } from "notistack";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Sidebar from '../components/Sidebar'
import RegisterProduct from "../components/RegisterProduct";

function ProductsPage() {
    const { getProducts, products } = useProduct();
    const [open, setOpen] = useState(false)

  
    useEffect(() => {
        getProducts();
    }, []);

    if (products.length === 0) return (<h1>No hay productos</h1>);

    return (
        <div className="">
            <Sidebar/>
            <div className="margin-all-page">
                <div className="p-5 mt-10 bg-gray-100">
                    <div className="overflow-auto rounded-lg shadow ">
                        <div className="flex mb-4">
                            <h1 className="ml-auto text-3xl text-center font-bold">Productos en inventario</h1>
                            <button className="ml-auto items-center p-2  bg-blue-500 text-cyan-50 rounded-md"
                            onClick={() => {setOpen(true);}}
                            >Agregar producto</button>
                        </div>
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Id producto</th>
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
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap capitalize">
                                        {product.name}
                                        </td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span className="p-3 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50"> {product.price.toLocaleString('es-CO', {style: 'currency',currency: 'COP'})}</span>
                                        </td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap"><img className="w-20" src={product.image} alt="" /></td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap">{product.quantity}</td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap capitalize">{product.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    
                </div>
            </div>
            <SnackbarProvider
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            
            />
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-white px-4 pt-5 mb-6 pb-4 sm:p-6 sm:pb-4">
                            
                        <RegisterProduct
                        onSuccess={() => setOpen(false)}
                        onClose={() => setOpen(false)}/>
                        </div>
                        
                    </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default ProductsPage;
