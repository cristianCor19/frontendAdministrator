import Sidebar from '../components/Sidebar'
// import {RiLineChartLine} from 'react-icons/ri'
import { useStats } from '../context/StatsContext'
import { useEffect } from 'react'

import '../styles/dashboard.css'

function HomePage(){

    const {totalSold, bestProduct, getTotalSold, getBestProduct} = useStats()

    useEffect( () => {
        const fetchData = async () => {

            await getBestProduct();
            await getTotalSold();
        }

        fetchData();
    }, [])

    console.log(bestProduct);
    

    return (
        <div className="">
            <Sidebar/>
            <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh] overflow-y-scroll">
                {/* <Header /> */}

                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8">

                <div className="bg-white p-8 rounded-xl text-gray-300 flex flex-col gap-6">
                    {/* <RiLineChartLine className="text-5xl" /> */}
                    <h4 className="text-2xl text-black font-bold text-center">Ventas totales</h4>
                    <span className="text-5xl text-black text-center">&#36; {totalSold}</span>
                    
                </div>

                <div className="p-6 bg-white rounded-xl flex flex-col gap-4 drop-shadow-2xl">
                    <h1 className='text-center font-bold'>Producto mas vendido</h1>
                    <div className="flex items-center gap-4 bg-primary-100/10 rounded-xl p-5">
                    {/* <span className="bg-primary-100 text-gray-300 text-2xl font-bold p-4 rounded-xl">
                        98
                    </span> */}
                    <img src={bestProduct.image} alt="" className='best-product-img'/>
                        <div>
                            <h3 className="font-bold text-center">{bestProduct.name}</h3>
                            <p className="text-gray-500">Cantidad: {bestProduct.quantity}</p>
                            <p className="text-gray-500">Precio: {bestProduct.price}</p>
                            <p className="text-gray-500">Categoría: {bestProduct.type}</p>
                        </div>
                    </div>

                    {/* <h1 className='text-center font-bold'>Producto mas vendido</h1>
                    <div className="bg-primary-100/10 rounded-xl p-4">
                    <div className="flex items-center gap-4 ">
                        <img src="/img/fondo1.jpg" alt="" className='best-product-img'/>
                        <div>
                        <h3 className="font-bold">Projects</h3>
                        <p className="text-gray-500">8 this month</p>
                        <p className="text-gray-500">8 this month</p>
                        </div>
                    </div>

                    </div> */}
                </div>

                <div className="col-span-1 md:col-span-2 flex flex-col ">
                    <h1 className="text-2xl font-bold mb-8">Your projects</h1>
                    <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                        <img
                        src="https://img.freepik.com/foto-gratis/retrato-mujer-mayor-cerca_23-2149207185.jpg"
                        className="w-14 h-14 object-cover rounded-full"
                        />
                        <div>
                        <h3 className="font-bold">Logo design for Bakery</h3>
                        <p className="text-gray-500">1 day remaining</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <img
                        src="https://img.freepik.com/foto-gratis/retrato-mujer-mayor-cerca_23-2149207185.jpg"
                        className="w-14 h-14 object-cover rounded-full"
                        />
                        <div>
                        <h3 className="font-bold">Logo design for Bakery</h3>
                        <p className="text-gray-500">1 day remaining</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <a
                        href="#"
                        className="hover:text-primary-100 transition-colors hover:underline"
                        >
                        See all projects
                        </a>
                    </div>
                    </div>
                </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
                <div>
                    <h1 className="text-2xl font-bold mb-8">Recent invoices</h1>
                    <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">

                    <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                        <div className="col-span-2 flex items-center gap-4">
                        <img
                            src="https://img.freepik.com/foto-gratis/hombre-joven-hermoso-contento-camiseta-azul-que-senala-lado_1262-17845.jpg"
                            className="w-14 h-14 object-cover rounded-xl"
                        />
                        <div>
                            <h3 className="font-bold">Alexander Williams</h3>
                            <p className="text-gray-500">JQ Holdings</p>
                        </div>
                        </div>
                        <div>
                        <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full font-medium">
                            Paid
                        </span>
                        </div>
                        <div>
                        <span className="font-bold">&euro; 1,200.87</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                        <div className="col-span-2 flex items-center gap-4">
                        <img
                            src="https://img.freepik.com/foto-gratis/alegre-joven-deportista-posando-mostrando-pulgares-arriba-gesto_171337-8194.jpg"
                            className="w-14 h-14 object-cover rounded-xl"
                        />
                        <div>
                            <h3 className="font-bold">Jhon Philips</h3>
                            <p className="text-gray-500">Inchor Techs</p>
                        </div>
                        </div>
                        <div>
                        <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full font-medium">
                            Late
                        </span>
                        </div>
                        <div>
                        <span className="font-bold">&euro; 12,998.88</span>
                        </div>
                    </div>
                    </div>

                </div>
                <div>
                    <h1 className="text-2xl font-bold mb-8">Recommended project</h1>
                    <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                        <img
                            src="https://img.freepik.com/foto-gratis/retrato-mujer-mayor-cerca_23-2149207185.jpg"
                            className="w-14 h-14 object-cover rounded-full"
                        />
                        <div>
                            <h3 className="font-bold">Thomas Martin</h3>
                            <p className="text-gray-500">Updated 10m ago</p>
                        </div>
                        </div>
                        <div>
                        <span className="bg-primary-100 py-2 px-4 rounded-full text-white">
                            Design
                        </span>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-lg font-bold">
                        Need a designer to form branding essentials for my business.
                        </h5>
                        <p className="text-gray-500">
                        Looking for a talented brand designer to create all the
                        branding materials my new startup.
                        </p>
                    </div>
                    <div className="bg-primary-100/10 flex flex-col md:flex-row items-center justify-between gap-4 py-8 px-4 rounded-lg">
                        <div>
                        <sup className="text-sm text-gray-500">&euro;</sup>{" "}
                        <span className="text-2xl font-bold mr-2">8,700</span>
                        <span className="text-sm text-gray-500">/ month</span>
                        </div>
                        <div>
                        <span className="border border-primary-100 text-primary-100 py-2 px-4 rounded-full">
                            Full time
                        </span>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
            </main>
    </div>
    )
}

export default HomePage