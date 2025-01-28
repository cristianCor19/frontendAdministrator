import { useState } from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import { Button } from '../components/ui/button'; // Ajusta la importación según tu UI
import Switch from "@mui/material/Switch";
function SalesChartSales({ data }) {
  const [compareMode, setCompareMode] = useState(false);

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // Procesar datos para unificar ambos años
  const processData = () => {
    const currentYearData = data.totalCurrentYear.map((item) => ({
      month: item.month,
      currentYear: item.totalAmount,
      previousYear: 0,
    }));    

    if (data.totalAmountPrevious) {
      data.totalAmountPrevious.forEach((prevItem) => {
        const existing = currentYearData.find(
          (c) => c.month === prevItem.month
        );
        if (existing) {
          existing.previousYear = prevItem.totalAmount;
        }
      });
    }

    return currentYearData;
  };

  const chartData = processData()
  

  // Convert number of month to name 
  const formatMonth = (month) => {
    const date = new Date();
    date.setMonth(parseInt(month)); 
    const monthName = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(date);
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  };
 

  return (
    <div className="bg-white rounded-lg shadow-sm">
      

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="0" />
            <XAxis
              dataKey="month"
              tickFormatter={formatMonth}
              tick={{ fill: "#6B7280" }}
            />
            <YAxis
              tickFormatter={(value) => `$${value / 1000}K`}
              domain={[0, "auto"]}
              tick={{ fill: "#6B7280" }}
            />
            <Tooltip
              labelFormatter={(month) => formatMonth(month)}
              formatter={(value, name) => [
                `$${value}`,
                name === 'currentYear' ? 'Este año' : 'Año pasado',
              ]}
              contentStyle={{
                background: "#fff",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
            <Legend
              formatter={(value) =>
                value === 'currentYear' ? 'Este año' : 'Año pasado'
                
              }
              wrapperStyle={{ paddingTop: "10px", fontSize: "17px" }}
              iconSize={17}
            />

            <Bar
              dataKey="currentYear"
              name=""
              fill="#3B82F6"
              barSize={50}
              radius={[5, 5, 0, 0]}
            />

            {compareMode && (
              <Bar
                dataKey="previousYear"
                name="Last Year"
                fill="#009688"
                barSize={50}
                radius={[5, 5, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <span className="">
        <Switch className="ml-12"
          checked={checked}
          onChange={handleChange}
          onClick={() => setCompareMode(!compareMode)}
          inputProps={{ "aria-label": "controlled"}}
        />
        {compareMode ? "Ocultar año anterior" : "Mostrar mismo periodo del año anterior"}
      </span>
    </div>
  );
}
// SalesChartSales.propTypes = {
//   data: PropTypes.shape({
//     totalCurrentYear: PropTypes.arrayOf(
//       PropTypes.shape({
//         month: PropTypes.string.isRequired,
//         totalAmount: PropTypes.number.isRequired,
//       })
//     ).isRequired,
//     totalAmountPrevious: PropTypes.arrayOf(
//       PropTypes.shape({
//         month: PropTypes.string.isRequired,
//         totalAmount: PropTypes.number.isRequired,
//       })
//     ),
//   }).isRequired,
// };

export default SalesChartSales;
