import { useStats } from "../context/StatsContext";
import { useEffect } from "react";
import {
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
 
} from "recharts"

import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import SalesChartSales from "../components/SalesChartSales";

function HomePage() {
  const {
    totalSold,
    getTotalSold,
    getBestProduct,
    bestProduct,
    getTotalSoldCategory,
    totalSoldCategory, 
    getTotalSoldMonth,
    totalAmountPrevious,
    totalCurrentYear,
  } = useStats();

  const colors = ["#00E3CC", "#32A89C", "#009688", "#00635A","#AAECFC", "#88A3E2", "#B7A6F6", "#C37EDB"];

  useEffect(() => {
    const fetchData = async () => {
      await getTotalSoldCategory();
      await getBestProduct();
      await getTotalSold();
      await getTotalSoldMonth();
    };

    fetchData();
  }, []);

  

  return (
    <div className="">
      <Sidebar />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 container-home">
        {/* <Header /> */}

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl text-gray-300 flex flex-col gap-6">
            {/* <RiLineChartLine className="text-5xl" /> */}
            <h4 className="text-3xl text-black font-bold text-center">
              Ventas totales
            </h4>

            <div className="h-52 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={totalSoldCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="totalAmount"
                  >
                    {totalSoldCategory.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      background: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      `(${((value / totalSold) * 100).toFixed(1)}%)`
                    ]}
                  />
                  
                  <text
                    x="50%"
                    y="45%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl font-bold"
                    fill="#4A5568"
                  >
                    Total
                    <tspan x="50%" dy="1.5em" className="text-lg">
                      ${totalSold.toLocaleString()}
                    </tspan>
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <table className="text-center ml-6" >
              <thead>
                <tr>
                    <th className="w-0"></th>
                    <th className="w-10 text-center font-bold text-black">Categoria</th>
                    <th className="w-56 text-center font-bold text-black">Valor</th>
                </tr>
              </thead>
              <tbody>
                {totalSoldCategory.map((item, index) => (
                    <tr key={index} className="">
                        <td className="border-b-2">
                        <div className="w-4 h-4 rounded-sm ml-10" style={{backgroundColor: colors[index % colors.length]}}></div>
                            
                        </td>
                        <td className="text-black border-b-2"> {item.category}</td>
                        <td className="text-black p-1 border-b-2">{item.totalAmount}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5 bg-white rounded-xl flex flex-col gap-4 drop-shadow-2xl bg-gradient-to-br
          ">
            <h1 className="text-center font-bold text-3xl">Producto más vendido</h1>
            <div className="flex md:grid xl:flex items-center gap-12 rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 p-6 h-96">
    
              <img
                src={bestProduct.image}
                alt=""
                className="best-product-img md:mx-auto xl:m-0 "
              />
              <div className="-mt-20 md:-mt-10 xl:-mt-20">
                <h3 className="font-bold text-center text-3xl capitalize">{bestProduct.name}</h3>
                <div className="md:ml-12">

                  <p className="text-black-500 mt-2 p-1">
                    Cantidad: {bestProduct.quantity}
                  </p>
                  <p className="text-black-500 p-1">Precio: {bestProduct.price}</p>
                  <p className="text-black-500 p-1">categoría: {bestProduct.type}</p>
                  <p className="text-black-500 p-1">
                    Total vendido: {bestProduct.totalSold}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </section>

        <section className="grid grid-cols-1 mt-10 gap-8">
          <div>
            <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
              <h1 className="text-3xl font-bold text-center">Resumen de ventas</h1>
              <SalesChartSales data={{
                totalCurrentYear,
                totalAmountPrevious
              }}/>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
