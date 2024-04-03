import React, { PureComponent, useEffect, useState } from "react";
import {
	Label,
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ReferenceArea,
	ResponsiveContainer,
} from "recharts";
import { AxisDomainItem } from "recharts/types/util/types";
import { Button, Input, InputNumber, Slider, Space } from "antd";
import { PointCoordinates } from "../PointCoordinates";

interface ExampleProps {
	dataSource: PointCoordinates[];
}
const Example = ({ dataSource: initialDataSource }: ExampleProps) => {
	const XAxisDataKey: keyof PointCoordinates = "count";
	const YAxisDataKey_1: keyof PointCoordinates = "p(r)";
	const YAxisDataKey_2: keyof PointCoordinates = "q(r)";

	const getAxisYDomain = (
		from: string | number | undefined,
		to: string | number | undefined,
		ref: keyof PointCoordinates,
		offset: number
	) => {
		const refData = dataSource.slice(Number(from) - 1, Number(to));
		let [bottom, top] = [refData[0][ref], refData[0][ref]];
		refData.forEach((d) => {
			if (d[ref] > top) top = d[ref];
			if (d[ref] < bottom) bottom = d[ref];
		});

		return [(bottom | 0) - offset, (top | 0) + offset];
	};
	// console.log("dataSource[0]", dataSource[10]);

	// let aaa = Math.max(...dataSource.map((o) => o[YAxisDataKey_1]));
	// console.log("aaa", aaa);

	// let bbb = Math.min(...dataSource.map((o) => o[YAxisDataKey_1]));
	// console.log("bbb", bbb);

	// const initialState: {
	// 	left: AxisDomainItem;
	// 	right: AxisDomainItem;
	// 	refAreaLeft: string | number | undefined;
	// 	refAreaRight: string | number | undefined;
	// 	top: AxisDomainItem;
	// 	bottom: AxisDomainItem;
	// 	top2: AxisDomainItem;
	// 	bottom2: AxisDomainItem;
	// 	animation: boolean;
	// } = {
	// 	left: 0,
	// 	right: dataSource.length,
	// 	refAreaLeft: "",
	// 	refAreaRight: "",
	// 	top: "dataMax+1",
	// 	bottom: "dataMin-1",
	// 	top2: "dataMax+20",
	// 	bottom2: "dataMin-20",
	// 	animation: true,
	// };
	// const [waveGraphState, setWaveGraphState] = useState(initialState);

	const [dataSource, setDataSource] = useState<PointCoordinates[]>([]);
	const [refAreaLeft2, setRefAreaLeft2] = useState<number | undefined>();
	const [refAreaRight2, setRefAreaRight2] = useState<number | undefined>();
	const defaultLeft: number = initialDataSource?.[0]?.[XAxisDataKey];
	// const defaultLeft: number = 0;
	const defaultRight: number =
		initialDataSource?.[initialDataSource.length - 1]?.[XAxisDataKey];
	const defaultBottom: number = -10;
	const defaultTop: number = 10;
	const [leftBorder, setLeftBorder] = useState<number>(defaultLeft);
	const [rightBorder, setRightBorder] = useState<number>(defaultRight);
	const [bottomBorder, setBottomBorder] = useState<number>(defaultBottom);
	const [topBorder, setTopBorder] = useState<number>(defaultTop);

	// const { left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } =
	// 	waveGraphState;

	useEffect(() => {
		setDataSource(initialDataSource);
		// console.log("dataSource?.length", dataSource?.length);
		// if (dataSource) {
		// 	const defaultLeft: number = dataSource?.[0]?.[XAxisDataKey];
		// 	const defaultRight: number = dataSource?.[400]?.[XAxisDataKey];
		// 	// dataSource?.[dataSource.length - 1]?.[XAxisDataKey];
		// 	setLeftBorder(defaultLeft);
		// 	setRightBorder(defaultRight);
		// }
		// // if (dataSource) setWaveGraphState(initialState);
		// let aaa = Math.max(...dataSource.map((o) => o[YAxisDataKey_1]));
		// console.log("aaa", aaa);
		// let bbb = Math.min(...dataSource.map((o) => o[YAxisDataKey_1]));
		// console.log("bbb", bbb);
		// // setTopBorder(aaa);
		// // setBottomBorder(bbb);
	}, [initialDataSource]);

	// useEffect(() => {
	// 	// console.log("waveGraphState", waveGraphState);
	// }, [waveGraphState]);

	useEffect(() => {
		// console.log("refAreaLeft2", refAreaLeft2);
	}, [refAreaLeft2]);

	useEffect(() => {
		// console.log("refAreaRight2", refAreaRight2);
	}, [refAreaRight2]);

	// const zoom = () => {
	// 	let { refAreaLeft, refAreaRight } = waveGraphState;

	// 	if (refAreaLeft === refAreaRight || refAreaRight === "") {
	// 		setWaveGraphState((data) => ({
	// 			...data,
	// 			refAreaLeft: "",
	// 			refAreaRight: "",
	// 		}));
	// 		return;
	// 	}

	// 	if (refAreaLeft && refAreaRight) {
	// 		// xAxis domain
	// 		if (refAreaLeft > refAreaRight)
	// 			[refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

	// 		// yAxis domain
	// 		const [bottom, top] = getAxisYDomain(
	// 			refAreaLeft,
	// 			refAreaRight,
	// 			"p(r)",
	// 			0
	// 		);
	// 		// const [bottom2, top2] = getAxisYDomain(
	// 		// 	refAreaLeft,
	// 		// 	refAreaRight,
	// 		// 	"q(r)",
	// 		// 	50
	// 		// );

	// 		setWaveGraphState((data) => ({
	// 			...data,
	// 			refAreaLeft: "",
	// 			refAreaRight: "",
	// 			dataSource: dataSource.slice(),
	// 			left: refAreaLeft || "",
	// 			right: refAreaRight || "",
	// 			bottom: bottom,
	// 			top: top,
	// 			// bottom2: bottom2,
	// 			// top2: top2,
	// 		}));
	// 	}
	// };
	const zoomOut = () => {
		setLeftBorder(defaultLeft);
		setRightBorder(defaultRight);
		// setWaveGraphState(initialState);
		// setWaveGraphState((data) => ({
		// 	...data,
		// 	dataSource: dataSource.slice(),
		// 	refAreaLeft: "",
		// 	refAreaRight: "",
		// 	left: initialState.left,
		// 	right: initialState.right,
		// 	top: "dataMax+1",
		// 	bottom: "dataMin",
		// 	// top2: "dataMax+50",
		// 	// bottom2: "dataMin+50",
		// }));
	};

	useEffect(() => {
		// const refData = dataSource.slice(Number(leftBorder), Number(rightBorder));
		// console.log("refData", refData);

		let indexStart = initialDataSource.findIndex(
			(x) => x[XAxisDataKey] === leftBorder
		);
		let indexEnd = initialDataSource.findIndex(
			(x) => x[XAxisDataKey] === rightBorder
		);
		setDataSource(
			initialDataSource.slice(indexStart, indexEnd + 1)
			// initialDataSource.slice(Number(leftBorder), Number(rightBorder))
		);

		// let [bottom, top] = [refData[0][ref], refData[0][ref]];
		// refData.forEach((d) => {
		// 	if (d[ref] > top) top = d[ref];
		// 	if (d[ref] < bottom) bottom = d[ref];
		// });

		// return [(bottom | 0) - offset, (top | 0) + offset];
	}, [leftBorder, rightBorder]);

	return (
		<div className="graphContainer">
			<ResponsiveContainer width="100%" height={400}>
				<LineChart
					data={dataSource}
					onMouseDown={(e) => {
						// console.log("down", e, e.activeLabel);
						// setWaveGraphState((data) => ({
						// 	...data,
						// 	refAreaLeft: e.activeLabel || "",
						// }));
						setRefAreaLeft2(Number(e.activeLabel));
					}}
					onMouseMove={(e) => {
						refAreaLeft2 && setRefAreaRight2(Number(e.activeLabel));
						// waveGraphState.refAreaLeft &&
						// setWaveGraphState((data) => ({
						// 	...data,
						// 	refAreaRight: e.activeLabel || "",
						// }));
					}}
					onMouseUp={
						(e) => {
							if (refAreaLeft2 && refAreaRight2) {
								setLeftBorder(
									refAreaLeft2 < refAreaRight2 ? refAreaLeft2 : refAreaRight2
								);
								setRightBorder(
									refAreaLeft2 < refAreaRight2 ? refAreaRight2 : refAreaLeft2
								);
								setRefAreaLeft2(undefined);
								setRefAreaRight2(undefined);
							}
							// refAreaLeft2 && setRefAreaRight2(e.activeLabel || "");
						}
						// onMouseLeave={(e) => console.log("leave", e)}
						// eslint-disable-next-line react/jsx-no-bind
						// onMouseUp={zoom}
						// onMouseUp={(e, aaa) => {
						// 	console.log("up", e, e.activeLabel, aaa);
						// 	setWaveGraphState((data) => ({
						// 		...data,
						// 		refAreaLeft: "",
						// 		refAreaRight: "",
						// 	}));
					}
				>
					<CartesianGrid strokeDasharray="3 3" fill="white" />
					<XAxis
						// allowDataOverflow
						dataKey={XAxisDataKey}
						// domain={[0, 400]}
						// domain={["dataMin", rightBorder]}
						domain={[leftBorder, rightBorder]}
						type="number"
					/>
					<YAxis
						// dataKey={YAxisDataKey_1}
						// allowDataOverflow
						// domain={[-10, 10]}
						// domain={[bottomBorder, topBorder]}
						// range={[bottom, top]}
						// type="number"
						yAxisId="1"
					/>
					<YAxis
						orientation="right"
						// allowDataOverflow
						// domain={[bottom2, top2]}
						// type="number"
						yAxisId="2"
					/>
					<Tooltip />
					<Line
						yAxisId="1"
						type="monotone"
						dataKey={YAxisDataKey_1}
						stroke="#8884d8"
						animationDuration={300}
						dot={false}
					/>
					{/* <Line
						yAxisId="2"
						type="natural"
						dataKey={YAxisDataKey_2}
						stroke="#82ca9d"
						animationDuration={300}
						dot={false}
					/> */}

					{refAreaLeft2 && refAreaRight2 ? (
						<ReferenceArea
							yAxisId="1"
							x1={refAreaLeft2}
							x2={refAreaRight2}
							strokeOpacity={0.3}
						/>
					) : null}
				</LineChart>
			</ResponsiveContainer>
			{/* <Slider
				range
				min={leftBorder}
				max={rightBorder}
				// value={[leftBorder, rightBorder]}
				// defaultValue={[0, data.length]}
				onChangeComplete={(value) => {
					// console.log("value", value);
					setLeftBorder(value[0]);
					setRightBorder(value[1]);
				}}
				// tooltip={{ formatter: null,  }}
			/> */}
			<Slider
				range
				defaultValue={[defaultLeft, defaultRight]}
				min={defaultLeft}
				max={defaultRight}
				// defaultValue={[0, data.length]}
				// onChangeComplete={(value) => {
				// 	setLeftBorder(value[0]);
				// 	setRightBorder(value[1]);
				// }}
				value={[leftBorder, rightBorder]}
				onChange={(value) => {
					// console.log("value", value);
					setLeftBorder(value[0]);
					setRightBorder(value[1]);
				}}
			/>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<InputNumber
					min={defaultLeft}
					max={defaultRight}
					defaultValue={defaultLeft}
					value={leftBorder}
					onChange={(value) => {
						if (value && value < rightBorder) {
							setLeftBorder(value);
						}
					}}
				/>
				<Button type="link" onClick={zoomOut}>
					Reset
				</Button>
				<InputNumber
					min={defaultLeft}
					max={defaultRight}
					defaultValue={defaultRight}
					value={rightBorder}
					onChange={(value) => {
						if (value && value > leftBorder) {
							setRightBorder(value);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default Example;
