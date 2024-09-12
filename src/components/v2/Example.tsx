import { Button, Checkbox, InputNumber, message, Radio, Slider } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import Settings, { Configuration } from './Settings';

export interface TangentCoefficients {
	A: number;
	B: number;
	Zero: number;
}
interface ExampleProps {
	dataSource: PointCoordinates[];
	settings: Configuration;
	setSettings: Dispatch<SetStateAction<Configuration>>;
}
const Example = ({ dataSource: initialDataSource, settings, setSettings }: ExampleProps) => {
	const { YAxisDataKey, XAxisDataKey, showGraphTangent, tangentCoefficients } = settings;
	const isDisabled: boolean = !initialDataSource.length;
	// let multiplier: number = 1;
	// const getMaxY = (data: PointCoordinates[]) => {
	// 	let result = Math.max(...data.map((x) => x[YAxisDataKey])) * multiplier;
	// 	return result;
	// 	return Math.ceil(result);
	// 	// return Math.abs(result) === 2 ? 'auto' : result;
	// };
	// const getMinY = (data: PointCoordinates[]) => {
	// 	let result = Math.min(...data.map((x) => x[YAxisDataKey])) * multiplier;
	// 	return result;
	// 	return Math.floor(result);
	// 	// return Math.abs(result) === 1 ? 'auto' : result;
	// };

	const [dataSource, setDataSource] = useState<PointCoordinates[]>([]);
	const [selectedPoint, setSelectedPoint] = useState<PointCoordinates | undefined>();

	const defaultLeft: number = initialDataSource?.[0]?.[XAxisDataKey];
	const defaultRight: number = Math.floor(initialDataSource?.[initialDataSource.length - 1]?.[XAxisDataKey]);
	const [leftBorder, setLeftBorder] = useState<number>(defaultLeft);
	const [rightBorder, setRightBorder] = useState<number>(defaultRight);

	useEffect(() => {
		if (selectedPoint) {
			// if (selectedPoint.index !== dataSource[0].index && selectedPoint.index !== dataSource[dataSource.length - 1].index) {
			let previousPoint = initialDataSource.find((x) => x.index === selectedPoint.index - 1);
			let nextPoint = initialDataSource.find((x) => x.index === selectedPoint.index + 1);

			// console.log('previousPoint', previousPoint);
			// console.log('nextPoint', nextPoint);
			if (previousPoint && nextPoint) {
				let y1 = previousPoint[YAxisDataKey];
				let y2 = nextPoint[YAxisDataKey];
				let x1 = previousPoint[XAxisDataKey];
				let x2 = nextPoint[XAxisDataKey];

				let newA: number = (y1 - y2) / (x1 - x2);
				let newB: number = y1 - newA * x1;
				let tangentOfZero: number = -newB / newA;
				setSettings((data): Configuration => ({ ...data, tangentCoefficients: { A: newA, B: newB, Zero: tangentOfZero } }));
			} else {
				message.warning('Nie udało się wyznaczyć stycznej. Wybierz inny punkt wykresu.');
			}
		}
	}, [selectedPoint]);

	useEffect(() => {
		setDataSource(initialDataSource);
		setLeftBorder(defaultLeft);
		setRightBorder(defaultRight);
	}, [initialDataSource, YAxisDataKey, XAxisDataKey]);

	const reset = () => {
		setLeftBorder(defaultLeft);
		setRightBorder(defaultRight);
		setSettings((data): Configuration => ({ ...data, tangentCoefficients: undefined }));
	};

	useEffect(() => {
		let indexStart = initialDataSource.findIndex((x) => x[XAxisDataKey] >= leftBorder);
		let indexEnd = initialDataSource.findIndex((x) => x[XAxisDataKey] >= rightBorder);
		let dataSlice = initialDataSource.slice(indexStart, indexEnd);
		setDataSource(dataSlice);
	}, [leftBorder, rightBorder]);

	const xMin = leftBorder;
	const xMax = rightBorder;
	const yMin = tangentCoefficients ? tangentCoefficients.A * leftBorder + tangentCoefficients.B : undefined;
	const yMax = tangentCoefficients ? tangentCoefficients.A * rightBorder + tangentCoefficients.B : undefined;

	const xZero = showGraphTangent && tangentCoefficients ? tangentCoefficients.Zero : undefined;

	const paddingX: number = 30;
	const paddingY: number = 20;
	let containerStyle: React.CSSProperties = { borderBottom: '1px solid black', padding: `${paddingY}px ${paddingX}px`, backgroundColor: 'lavender' };

	return (
		<div className="graphContainer">
			{!isDisabled && (
				<>
					<ResponsiveContainer style={{ ...containerStyle }}>
						<LineChart
							data={dataSource}
							onClick={(e) => setSelectedPoint(e.activePayload?.find((x) => x.name === YAxisDataKey).payload)}
							{...{ overflow: 'visible' }}
						>
							{/* <Legend /> */}

							<CartesianGrid strokeDasharray="3 3" fill="white" />

							{/* Oś X */}
							<XAxis dataKey={XAxisDataKey} domain={[leftBorder, rightBorder]} type="number">
								<Label style={{ fontSize: '130%', fill: 'black' }} position="bottom" value={XAxisDataKey} />
							</XAxis>

							{/* Podpowiedź */}
							{!isDisabled && <Tooltip />}
							{/* Wykres */}
							<Line
								name={YAxisDataKey}
								yAxisId={YAxisDataKey}
								type="monotone"
								dataKey={YAxisDataKey}
								stroke="blue"
								animationDuration={300}
								dot={false}
							/>

							{/* Oś Y */}
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
									offset={0}
									position="insideLeft"
									value={YAxisDataKey}
								/>
							</YAxis>

							{/* Punkt y=0 */}
							<ReferenceDot
								yAxisId={YAxisDataKey}
								x={xZero}
								y={0}
								r={3}
								fill="red"
								cursor={5}
								label={{ position: 'top', value: xZero, fill: 'red', fontSize: 14 }}
							/>

							{/* Prosta y=0 */}
							<ReferenceLine yAxisId={YAxisDataKey} y={0} stroke="red" strokeDasharray="3 3" />

							{/* Styczna */}
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
						</LineChart>
					</ResponsiveContainer>

					<div style={{ backgroundColor: '', paddingLeft: 60 + paddingX, paddingRight: paddingX, paddingBottom: 20 }}>
						<Slider
							styles={{ track: { background: 'blue' } }}
							disabled={isDisabled}
							range={{ draggableTrack: true }}
							defaultValue={[defaultLeft, defaultRight]}
							min={defaultLeft}
							max={defaultRight}
							value={[leftBorder, rightBorder]}
							onChange={(value: number[]) => {
								setLeftBorder(value[0]);
								setRightBorder(value[1]);
							}}
						/>

						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<InputNumber
								className="inputAddon"
								// addonBefore={<div style={{ backgroundColor: 'grey' }}>"Zakres od"</div>}
								addonBefore="Zakres od"
								step="0.01"
								disabled={isDisabled}
								min={defaultLeft}
								max={defaultRight}
								defaultValue={defaultLeft}
								value={leftBorder}
								changeOnWheel
								onChange={(value) => {
									if (value != undefined && value <= rightBorder) {
										setLeftBorder(value);
									}
								}}
							/>
							<Button type="link" onClick={reset} disabled={isDisabled}>
								Reset
							</Button>
							<div>
								<InputNumber
									className="inputAddon"
									addonBefore="Zakres do"
									step="0.01"
									disabled={isDisabled}
									min={defaultLeft}
									max={defaultRight}
									defaultValue={defaultRight}
									value={rightBorder}
									changeOnWheel
									onChange={(value) => {
										if (value != undefined && value >= leftBorder) {
											setRightBorder(value);
										}
									}}
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Example;
