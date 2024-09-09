import { Button, Checkbox, InputNumber, message, Radio, Slider } from 'antd';
import { useEffect, useState } from 'react';
import {
	CartesianGrid,
	Dot,
	Label,
	Legend,
	Line,
	LineChart,
	ReferenceArea,
	ReferenceDot,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { PointCoordinates } from './PointCoordinates';

interface ExampleProps {
	dataSource: PointCoordinates[];
}
const Example = ({ dataSource: initialDataSource }: ExampleProps) => {
	const isDisabled: boolean = !initialDataSource.length;
	let multiplier: number = 1;
	const getMaxY = (data: PointCoordinates[]) => {
		let result = Math.max(...data.map((x) => x[YAxisDataKey])) * multiplier;
		return result;
		return Math.ceil(result);
		// return Math.abs(result) === 2 ? 'auto' : result;
	};
	const getMinY = (data: PointCoordinates[]) => {
		let result = Math.min(...data.map((x) => x[YAxisDataKey])) * multiplier;
		return result;
		return Math.floor(result);
		// return Math.abs(result) === 1 ? 'auto' : result;
	};

	const XAxisDataKey: keyof PointCoordinates = 'r';
	const YAxisDataKey_1: keyof PointCoordinates = 'p(r)';
	const YAxisDataKey_2: keyof PointCoordinates = 'q(r)';
	const YAxisDataKey_3: keyof PointCoordinates = 'r';
	const [YAxisDataKey, setYAxisDataKey] = useState<keyof PointCoordinates>(YAxisDataKey_1);

	const [dataSource, setDataSource] = useState<PointCoordinates[]>([]);
	const [selectedPoint, setSelectedPoint] = useState<PointCoordinates | undefined>();

	const defaultLeft: number = initialDataSource?.[0]?.[XAxisDataKey];
	const defaultRight: number = Math.floor(initialDataSource?.[initialDataSource.length - 1]?.[XAxisDataKey]);
	const defaultBottom: number = getMinY(initialDataSource);
	const defaultTop: number = getMaxY(initialDataSource);
	const [leftBorder, setLeftBorder] = useState<number>(defaultLeft);
	const [rightBorder, setRightBorder] = useState<number>(defaultRight);
	const [bottomBorder, setBottomBorder] = useState<number>(defaultBottom);
	const [topBorder, setTopBorder] = useState<number>(defaultTop);

	const [showGraphTangent, setShowGraphTangent] = useState<boolean>(false);
	const [showGraph1, setShowGraph1] = useState<boolean>(false);
	const [showGraph2, setShowGraph2] = useState<boolean>(false);
	const [showGraph3, setShowGraph3] = useState<boolean>(false);

	interface TangentCoefficients {
		A: number;
		B: number;
		Zero: number;
	}
	const [tangentCoefficients, setTangentCoefficients] = useState<TangentCoefficients>();

	useEffect(() => {
		if (selectedPoint) {
			if (selectedPoint.index !== dataSource[0].index && selectedPoint.index !== dataSource[dataSource.length - 1].index) {
				let previousPoint = dataSource.find((x) => x.index === selectedPoint.index - 1)!;
				let nextPoint = dataSource.find((x) => x.index === selectedPoint.index + 1)!;
				let y1 = previousPoint[YAxisDataKey];
				let y2 = nextPoint[YAxisDataKey];
				let x1 = previousPoint[XAxisDataKey];
				let x2 = nextPoint[XAxisDataKey];

				let newA: number = (y1 - y2) / (x1 - x2);
				let newB: number = y1 - newA * x1;
				let tangentOfZero: number = -newB / newA;
				setTangentCoefficients({ A: newA, B: newB, Zero: tangentOfZero });
			} else {
				message.warning('Wybrano skrajny punkt wykresu. Spróbuj ponownie.');
			}
		}
	}, [selectedPoint]);

	useEffect(() => {
		setShowGraphTangent(!!tangentCoefficients);
	}, [tangentCoefficients]);

	useEffect(() => {
		setDataSource(initialDataSource);
		setLeftBorder(defaultLeft);
		setRightBorder(defaultRight);
	}, [initialDataSource]);

	const zoomOut = () => {
		setLeftBorder(defaultLeft);
		setRightBorder(defaultRight);
	};

	useEffect(() => {
		console.log('leftBorder, rightBorder', leftBorder, rightBorder);
		let indexStart = initialDataSource.findIndex((x) => Math.floor(x[XAxisDataKey]) === leftBorder);
		// let aaa = initialDataSource.findIndex((x) => x[XAxisDataKey] >= rightBorder);
		// let indexEnd = initialDataSource.findIndex((x) => x[XAxisDataKey] >= rightBorder);
		// let indexEnd = initialDataSource.findIndex((x) => Math.floor(x[XAxisDataKey]) === rightBorder);
		let indexEnd = initialDataSource.findIndex((x) => x[XAxisDataKey] >= rightBorder) + 1;
		console.log('indexStart, indexEnd', indexStart, indexEnd);
		console.log(
			'initialDataSource.find((x) => x[XAxisDataKey] >= rightBorder)',
			initialDataSource.find((x) => x[XAxisDataKey] >= rightBorder),
		);
		let dataSlice = initialDataSource.slice(indexStart, indexEnd);
		setDataSource(dataSlice);
		setBottomBorder(getMinY(dataSlice));
		setTopBorder(getMaxY(dataSlice));
	}, [initialDataSource, leftBorder, rightBorder, YAxisDataKey]);

	// const tangentFunction = (point: PointCoordinates) => {
	// 	if (tangentCoefficients) {
	// 		let result = tangentCoefficients.A * point[XAxisDataKey] + tangentCoefficients.B;
	// 		if (result > bottomBorder && result < topBorder) {
	// 			return result;
	// 		}
	// 	}
	// 	return null;
	// };

	// const ttt = Math.max(Math.abs(bottomBorder), Math.abs(topBorder));

	const xMin = leftBorder;
	const xMax = rightBorder;
	const yMin = tangentCoefficients ? tangentCoefficients.A * leftBorder + tangentCoefficients.B : undefined;
	const yMax = tangentCoefficients ? tangentCoefficients.A * rightBorder + tangentCoefficients.B : undefined;

	const xZero = showGraphTangent && tangentCoefficients ? -tangentCoefficients.B / tangentCoefficients.A : undefined;

	let aaa: React.CSSProperties = { border: '1px solid black', padding: '20px', backgroundColor: 'orange' };
	return (
		<div className="graphContainer">
			<ResponsiveContainer style={{ ...aaa }}>
				<LineChart
					// style={{ border: '1px solid black', paddin: '40' }}
					data={dataSource}
					onClick={(e) => {
						setSelectedPoint(e.activePayload?.find((x) => x.name === YAxisDataKey).payload);
					}}
					{...{ overflow: 'visible' }}
				>
					{/* <Legend /> */}

					<CartesianGrid strokeDasharray="3 3" fill="white" />
					<XAxis dataKey={XAxisDataKey} domain={[leftBorder, rightBorder]} type="number">
						<Label style={{ fontSize: '130%', fill: 'black' }} position="bottom" value={XAxisDataKey} />
					</XAxis>
					<Tooltip />

					{/* {refAreaLeft2 && refAreaRight2 ? (
						<ReferenceArea yAxisId="1" x1={refAreaLeft2} x2={refAreaRight2} strokeOpacity={0.3} />
					) : null} */}

					{/* WYKRESY */}
					{/* ----------------------------------------------------- */}

					<Line name={YAxisDataKey} yAxisId={YAxisDataKey} type="monotone" dataKey={YAxisDataKey} stroke="blue" animationDuration={300} dot={false} />
					<YAxis
						yAxisId={YAxisDataKey}
						// domain={[-ttt, ttt]}
						// domain={[bottomBorder, topBorder]}
						// domain={['dataMin', 'dataMax']}
						// domain={['auto', 'auto']}
						// allowDataOverflow
						// tickFormatter={(value) => Number(value.toFixed(2))}
					>
						<Label
							style={{
								textAnchor: 'middle',
								fontSize: '140%',
								fill: 'black',
							}}
							angle={270}
							position="insideLeft"
							value={YAxisDataKey}
						/>
						{/* <Label angle={270} position="insideLeft" style={{ textAnchor: 'middle' }}>
							Vertical Label!
						</Label> */}
						{/* <Label value="LBs" position="middle" offset={10} /> */}
						{/* export type LabelPosition = 'top' | 'left' | 'right' | 'bottom' | 'inside' | 'outside' | 'insideLeft' |
						 'insideRight' | 'insideTop' | 'insideBottom' | 'insideTopLeft' | 'insideBottomLeft' | 'insideTopRight' |
						  'insideBottomRight' | 'insideStart' | 'insideEnd' | 'end' | 'center' | 'centerTop' | 'centerBottom' | 'middle' | { */}
					</YAxis>
					{/* <ReferenceLine yAxisId={YAxisDataKey} y={0} stroke="red" label="y=0" /> */}
					{/* <ReferenceDot r={20} fill="red" stroke="none" x={0} y={3} /> */}
					<ReferenceDot
						yAxisId={YAxisDataKey}
						x={xZero}
						y={0}
						r={3}
						fill="red"
						cursor={5}
						label={{ position: 'top', value: xZero, fill: 'red', fontSize: 14 }}
					/>

					{/* <ReferenceLine
						yAxisId={YAxisDataKey}
						segment={[
							{ x: leftBorder, y: -2 },
							{ x: rightBorder, y: topBorder },
						]}
						stroke="green"
						label="y = 2x"
					/> */}
					<ReferenceLine yAxisId={YAxisDataKey} y={0} stroke="red" strokeDasharray="3 3" />
					{showGraphTangent && (
						<ReferenceLine
							yAxisId={YAxisDataKey}
							segment={[
								{ x: xMin, y: yMin },
								{ x: xMax, y: yMax },
							]}
							stroke="green"
							ifOverflow={'hidden'}
						/>
					)}

					{showGraphTangent && (
						<>
							{/* <Line
								name="styczna"
								yAxisId={YAxisDataKey}
								type="monotone"
								dataKey={tangentFunction}
								stroke="red"
								animationDuration={300}
								dot={false}
							/> */}
						</>
					)}
					{/* <Line
						name={YAxisDataKey_1}
						yAxisId={YAxisDataKey_1}
						type="monotone"
						dataKey={0}
						stroke="black"
						animationDuration={300}
						dot={false}
					/> */}
					{showGraph1 && (
						<>
							<Line
								name={YAxisDataKey_1}
								yAxisId={YAxisDataKey_1}
								type="monotone"
								dataKey={YAxisDataKey_1}
								stroke="blue"
								animationDuration={300}
								dot={false}
							/>
							<YAxis
								yAxisId={YAxisDataKey_1}
								// domain={[-ttt, ttt]}
								// domain={[bottomBorder, topBorder]}
								// domain={['dataMin', 'dataMax']}
								// domain={['auto', 'auto']}
								allowDataOverflow
								// tickFormatter={(value) => Number(value.toFixed(2))}
							/>
						</>
					)}

					{/* ----------------------------------------------------- */}
					{showGraph2 && (
						<>
							<Line
								name={YAxisDataKey_2}
								yAxisId={YAxisDataKey_2}
								type="natural"
								dataKey={YAxisDataKey_2}
								stroke="green"
								animationDuration={300}
								dot={false}
							/>
							<YAxis
								orientation="right"
								// allowDataOverflow
								// domain={[bottom2, top2]}
								// type="number"
								stroke="green"
								yAxisId={YAxisDataKey_2}
							/>
						</>
					)}
					{/* ----------------------------------------------------- */}
					{showGraph3 && (
						<>
							<Line
								name={YAxisDataKey_3}
								yAxisId={YAxisDataKey_3}
								type="natural"
								dataKey={YAxisDataKey_3}
								stroke="red"
								animationDuration={300}
								dot={false}
							/>
							<YAxis
								// orientation="right"
								// allowDataOverflow
								// domain={[bottom2, top2]}
								// type="number"
								stroke="red"
								yAxisId={YAxisDataKey_3}
							/>
						</>
					)}
				</LineChart>
			</ResponsiveContainer>

			<div style={{ backgroundColor: 'pink', paddingLeft: 80, paddingRight: 20 }}>
				<Slider
					styles={{ track: { background: 'blue' } }}
					disabled={isDisabled}
					range={{ draggableTrack: true }}
					defaultValue={[defaultLeft, defaultRight]}
					min={defaultLeft}
					max={Math.floor(defaultRight)}
					value={[leftBorder, rightBorder]}
					onChange={(value: number[]) => {
						console.log('value', value);
						setLeftBorder(value[0]);
						setRightBorder(value[1]);
					}}
				/>

				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<InputNumber
						disabled={isDisabled}
						min={defaultLeft}
						max={defaultRight}
						defaultValue={defaultLeft}
						value={leftBorder}
						onChange={(value) => {
							if (value != undefined && value <= rightBorder) {
								setLeftBorder(value);
							}
						}}
					/>
					<Button type="link" onClick={zoomOut} disabled={isDisabled}>
						Reset
					</Button>
					<InputNumber
						disabled={isDisabled}
						min={defaultLeft}
						max={defaultRight}
						defaultValue={defaultRight}
						value={rightBorder}
						onChange={(value) => {
							if (value != undefined && value >= leftBorder) {
								setRightBorder(value);
							}
						}}
					/>
				</div>
				<Checkbox checked={showGraphTangent} onChange={() => setShowGraphTangent((data) => !data)} disabled={!tangentCoefficients}>
					{'styczna'}
				</Checkbox>
				{/* <Checkbox checked={showGraph1} onChange={() => setShowGraph1((data) => !data)}>
					{YAxisDataKey_1}
				</Checkbox>
				<Checkbox checked={showGraph2} onChange={() => setShowGraph2((data) => !data)}>
					{YAxisDataKey_2}
				</Checkbox>
				<Checkbox checked={showGraph3} onChange={() => setShowGraph3((data) => !data)}>
					{YAxisDataKey_3}
				</Checkbox> */}

				<Radio.Group
					disabled={isDisabled}
					onChange={(e) => {
						setYAxisDataKey(e.target.value);
						setShowGraphTangent(false);
					}}
					value={YAxisDataKey}
				>
					{/* YAxisDataKey4, setYAxisDataKey4 */}
					<Radio value={YAxisDataKey_1}>{YAxisDataKey_1}</Radio>
					<Radio value={YAxisDataKey_2}>{YAxisDataKey_2}</Radio>
					<Radio value={YAxisDataKey_3}>{YAxisDataKey_3}</Radio>
				</Radio.Group>
			</div>
		</div>
	);
};

export default Example;
