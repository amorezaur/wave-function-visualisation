import { Checkbox, CheckboxProps, Slider } from "antd";
import { useEffect, useState } from "react";
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

export interface PointCoordinates {
	count: number;
	r: number;
	"p(r)": number;
	"q(r)": number;
}

export interface WaveGraphProps {
	dataSource: PointCoordinates[];
	numberOfPoints: number;
}

const WaveGraph = ({ props }: { props: WaveGraphProps }) => {
	const { dataSource, numberOfPoints } = props;
	// const data = dataSource.slice(0, 20);
	const data = dataSource;
	const XAxisDataKey: keyof PointCoordinates = "count";
	const YAxisDataKey_1: keyof PointCoordinates = "p(r)";
	const YAxisDataKey_2: keyof PointCoordinates = "q(r)";
	const interval = data.length > 10 ? Math.floor(data.length / 10) : 0;

	const [rangeMin, setRangeMin] = useState<number>(20);
	const [rangeMax, setRangeMax] = useState<number>(20);
	const [range, setRange] = useState<number[]>([0, data.length]);
	// console.log("data.length", data.length);
	// console.log("range", range);
	const onChange: CheckboxProps["onChange"] = (e) => {
		console.log("e.target.checked", e.target.checked);
		setShowP(e.target.checked);
	};
	useEffect(() => {
		setRange([0, data.length]);
	}, [data]);

	const [showP, setShowP] = useState<boolean>(true);

	const DDD = (
		<>
			<CartesianGrid strokeDasharray="3 3" fill="white" />
			<YAxis dataKey={YAxisDataKey_1} />
			<XAxis
				type="number"
				dataKey={XAxisDataKey}
				range={range}
				domain={range}
				// stroke="white"
				// opacity={0.4}
			/>
			<Tooltip />
			<Legend />
			{showP && (
				<Line
					type="monotone"
					dataKey={YAxisDataKey_1}
					stroke="red"
					dot={false}
					// activeDot={{ r: 8 }}
				/>
			)}
			{/* <Line type="monotone" dataKey={YAxisDataKey_2} stroke="green" /> */}
		</>
	);

	return (
		<div className="graphContainer">
			<div className="red">
				<ResponsiveContainer>
					<LineChart
						data={data.slice(range[0], range[1])}
						margin={{
							top: 40,
							right: 40,
							left: 0,
							bottom: 5,
						}}
					>
						{DDD}
					</LineChart>
				</ResponsiveContainer>
			</div>
			<div className="slider orange">
				{/* <Slider
					range
					min={range[0]}
					max={range[1]}
					// defaultValue={[0, data.length]}
					onChangeComplete={(value) => setRange(value)}
				/> */}
				<Slider
					range
					min={0}
					max={data.length}
					defaultValue={[0, data.length]}
					onChangeComplete={(value) => setRange(value)}
					// value={range}
				/>
			</div>
			<Checkbox onChange={onChange} value={showP}>
				Checkbox
			</Checkbox>
		</div>
	);
};

export default WaveGraph;
