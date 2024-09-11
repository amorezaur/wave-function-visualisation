import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Dot } from 'recharts';

// Funkcja do generowania danych dla sinusoidy i prostej
const generateData = () => {
	const data = [];
	for (let i = 0; i <= 360; i += 10) {
		data.push({
			x: i,
			sin: Math.sin((i * Math.PI) / 180), // Sinusoida
			line: i / 90, // Prosta, która wychodzi poza zakres osi Y (od 0 do 4)
		});
	}
	return data;
};

const chartData = generateData();

const SinLineChart = () => {
	return (
		<LineChart width={600} height={400} data={chartData}>
			{/* Siatka wykresu */}
			<CartesianGrid stroke="#ccc" />
			{/* Oś X */}
			<XAxis dataKey="x" label={{ value: 'Degrees', position: 'insideBottomRight', offset: -5 }} />

			{/* Oś Y z zakresem od -1 do 1 dla obu funkcji */}
			<YAxis domain={[-1, 1]} label={{ value: 'sin(x)', angle: -90, position: 'insideLeft' }} />

			{/* Narzędzie do wyświetlania danych */}
			<Tooltip />
			{/* Legenda */}
			<Legend />

			{/* Linia dla funkcji sinus */}
			<Line type="monotone" dataKey="sin" stroke="#8884d8" />

			{/* Linia dla funkcji liniowej, która wyjdzie poza wykres */}
			<Line
				type="monotone"
				dataKey="line"
				stroke="#82ca9d"
				dot={false} // Wyłączenie kropek na linii
			/>
		</LineChart>
	);
};

export default SinLineChart;
