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
import { PointCoordinates } from "./WaveGraph";

interface ExampleProps {
	dataSource: PointCoordinates[];
}
const Example = ({ dataSource }: ExampleProps) => {
	interface IDataType {
		name: number;
		cost: number;
		impression: number;
	}
	const initialData: IDataType[] = [
		{ name: 1, cost: 4.11, impression: 100 },
		{ name: 2, cost: 2.39, impression: 120 },
		{ name: 3, cost: 1.37, impression: 150 },
		{ name: 4, cost: 1.16, impression: 180 },
		{ name: 5, cost: 2.29, impression: 200 },
		{ name: 6, cost: 3, impression: 499 },
		{ name: 7, cost: 0.53, impression: 50 },
		{ name: 8, cost: 2.52, impression: 100 },
		{ name: 9, cost: 1.79, impression: 200 },
		{ name: 10, cost: 2.94, impression: 222 },
		{ name: 11, cost: 4.3, impression: 210 },
		{ name: 12, cost: 4.41, impression: 300 },
		{ name: 13, cost: 2.1, impression: 50 },
		{ name: 14, cost: 8, impression: 190 },
		{ name: 15, cost: 0, impression: 300 },
		{ name: 16, cost: 9, impression: 400 },
		{ name: 17, cost: 3, impression: 200 },
		{ name: 18, cost: 2, impression: 50 },
		{ name: 19, cost: 3, impression: 100 },
		{ name: 20, cost: 7, impression: 100 },
	];

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

	const initialState: {
		left: AxisDomainItem;
		right: AxisDomainItem;
		refAreaLeft: string | number | undefined;
		refAreaRight: string | number | undefined;
		top: AxisDomainItem;
		bottom: AxisDomainItem;
		top2: AxisDomainItem;
		bottom2: AxisDomainItem;
		animation: boolean;
	} = {
		left: 0,
		right: dataSource.length,
		refAreaLeft: "",
		refAreaRight: "",
		top: "dataMax+1",
		bottom: "dataMin-1",
		top2: "dataMax+20",
		bottom2: "dataMin-20",
		animation: true,
	};
	const [waveGraphState, setWaveGraphState] = useState(initialState);
	const { left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } =
		waveGraphState;

	useEffect(() => {
		if (dataSource) setWaveGraphState(initialState);
	}, [dataSource]);

	const zoom = () => {
		let { refAreaLeft, refAreaRight } = waveGraphState;

		if (refAreaLeft === refAreaRight || refAreaRight === "") {
			setWaveGraphState((data) => ({
				...data,
				refAreaLeft: "",
				refAreaRight: "",
			}));
			return;
		}

		if (refAreaLeft && refAreaRight) {
			// xAxis domain
			if (refAreaLeft > refAreaRight)
				[refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

			// yAxis domain
			const [bottom, top] = getAxisYDomain(
				refAreaLeft,
				refAreaRight,
				"p(r)",
				0
			);
			// const [bottom2, top2] = getAxisYDomain(
			// 	refAreaLeft,
			// 	refAreaRight,
			// 	"q(r)",
			// 	50
			// );

			setWaveGraphState((data) => ({
				...data,
				refAreaLeft: "",
				refAreaRight: "",
				dataSource: dataSource.slice(),
				left: refAreaLeft || "",
				right: refAreaRight || "",
				bottom: bottom,
				top: top,
				// bottom2: bottom2,
				// top2: top2,
			}));
		}
	};
	const zoomOut = () => {
		setWaveGraphState(initialState);
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

	return (
		<div
			className="highlight-bar-charts"
			style={{ userSelect: "none", width: "100%" }}
		>
			<button type="button" className="btn update" onClick={zoomOut}>
				Zoom Out
			</button>

			<ResponsiveContainer width="100%" height={400}>
				<LineChart
					width={800}
					height={400}
					data={dataSource}
					onMouseDown={(e) =>
						setWaveGraphState((data) => ({
							...data,
							refAreaLeft: e.activeLabel || "",
						}))
					}
					onMouseMove={(e) =>
						waveGraphState.refAreaLeft &&
						setWaveGraphState((data) => ({
							...data,
							refAreaRight: e.activeLabel || "",
						}))
					}
					// eslint-disable-next-line react/jsx-no-bind
					onMouseUp={zoom}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						allowDataOverflow
						dataKey={XAxisDataKey}
						domain={[left, right]}
						type="number"
					/>
					<YAxis
						// dataKey={YAxisDataKey_1}
						// allowDataOverflow
						// domain={[bottom, top]}
						// range={[bottom, top]}
						type="number"
						yAxisId="1"
					/>
					{/* <YAxis
						orientation="right"
						allowDataOverflow
						domain={[bottom2, top2]}
						type="number"
						yAxisId="2"
					/> */}
					<Tooltip />
					<Line
						yAxisId="1"
						type="natural"
						dataKey={YAxisDataKey_1}
						stroke="#8884d8"
						animationDuration={300}
						dot={false}
					/>
					{/* <Line
						yAxisId="2"
						type="natural"
						dataKey={YAxisDataKey_1}
						stroke="#82ca9d"
						animationDuration={300}
						dot={false}
					/> */}

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
		</div>
	);
};

export default Example;
