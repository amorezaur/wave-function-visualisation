import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface PointCoordinates {
	name: string;
	uv: number;
	pv: number;
	amt: number;
}
const data: PointCoordinates[] = [
	{
		name: "Page A",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: "Page B",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: "Page C",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: "Page D",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: "Page E",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: "Page F",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: "Page G",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

const XAxisDataKey: keyof PointCoordinates = "name";
const YAxisDataKey_1: keyof PointCoordinates = "pv";
const YAxisDataKey_2: keyof PointCoordinates = "uv";

const TestGraph = () => {
	return (
		<>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					// width={500}
					// height={300}
					data={data}
					margin={{
						top: 20,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" fill="white" />
					<XAxis dataKey={XAxisDataKey} />
					<YAxis dataKey={YAxisDataKey_1} />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey={YAxisDataKey_1}
						stroke="red"
						activeDot={{ r: 8 }}
					/>
					<Line type="monotone" dataKey={YAxisDataKey_2} stroke="green" />
				</LineChart>
			</ResponsiveContainer>
		</>
	);
};

export default TestGraph;
