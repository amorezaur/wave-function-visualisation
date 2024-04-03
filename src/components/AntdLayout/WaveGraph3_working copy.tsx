import { Checkbox, CheckboxProps, Slider } from "antd";
import { useEffect, useState } from "react";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ReferenceArea,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { DataItem } from "./ReadFile2";

export interface PointCoordinates {
	count: number;
	r: number;
	"p(r)": number;
	"q(r)": number;
}

export interface WaveGraphProps {
	dataSource: DataItem[];
	numberOfPoints: number;
}

const WaveGraph = ({ props }: { props: WaveGraphProps }) => {
	const { dataSource, numberOfPoints } = props;
	// const data = dataSource.slice(0, 20);
	const data = dataSource;
	const XAxisDataKey: keyof DataItem = "count";
	const YAxisDataKey_1: keyof DataItem = "p";
	const YAxisDataKey_2: keyof DataItem = "q";
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

	const initialState = {
		left: "dataMin",
		right: "dataMax",
		refAreaLeft: "",
		refAreaRight: "",
		top: "dataMax+1",
		bottom: "dataMin-1",

		animation: true,
	};

	const [graphState, setGraphState] = useState(initialState);
	useEffect(() => {
		console.log("graphState", graphState);
	}, [graphState]);

	const { left, right, refAreaLeft, refAreaRight, top, bottom } = graphState;

	const zoom = () => {
		console.log("111", 111);
		let { refAreaLeft, refAreaRight } = graphState;

		if (refAreaLeft === refAreaRight || refAreaRight === "") {
			setGraphState((data) => ({
				...data,
				refAreaLeft: "",
				refAreaRight: "",
			}));
			return;
		}

		// xAxis domain
		if (refAreaLeft > refAreaRight)
			[refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

		// // yAxis domain
		// const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, "cost", 1);
		// const [bottom2, top2] = getAxisYDomain(
		// 	refAreaLeft,
		// 	refAreaRight,
		// 	"impression",
		// 	50
		// );

		setGraphState((data) => ({
			...data,
			refAreaLeft: "",
			refAreaRight: "",
			left: refAreaLeft,
			right: refAreaRight,
			// bottom,
			// top,
		}));
	};
	return (
		<div className="graphContainer">
			<ResponsiveContainer>
				<LineChart
					data={data.slice(range[0], range[1])}
					margin={{
						top: 40,
						right: 40,
						left: 0,
						bottom: 5,
					}}
					onMouseDown={(e) =>
						setGraphState((data) => ({
							...data,
							refAreaLeft: e.activeLabel as string,
						}))
					}
					onMouseMove={(e) =>
						graphState.refAreaLeft &&
						setGraphState((data) => ({
							...data,
							refAreaRight: e.activeLabel as string,
						}))
					}
					// // eslint-disable-next-line react/jsx-no-bind
					onMouseUp={zoom}
				>
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
					{refAreaLeft && refAreaRight ? (
						<ReferenceArea
							yAxisId="1"
							x1={refAreaLeft}
							x2={refAreaRight}
							strokeOpacity={0.3}
						/>
					) : null}
				</LineChart>
			</ResponsiveContainer>
			{/* <div className="slider orange"> */}
			{/* <Slider
					range
					min={range[0]}
					max={range[1]}
					// defaultValue={[0, data.length]}
					onChangeComplete={(value) => setRange(value)}
				/> */}
			{/* <Slider
					range
					min={0}
					max={data.length}
					defaultValue={[0, data.length]}
					onChangeComplete={(value) => setRange(value)}
					// value={range}
				/> */}
			{/* </div> */}
			{/* <Checkbox onChange={onChange} value={showP}>
				Checkbox
			</Checkbox> */}
		</div>
	);
};

export default WaveGraph;
