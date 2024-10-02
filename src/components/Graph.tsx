import { Button, InputNumber, message, Slider } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
	CartesianGrid,
	Label,
	Line,
	LineChart,
	ReferenceDot,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { Configuration } from '../types/Configuration';
import { PointCoordinates } from '../types/PointCoordinates';

const paddingX: number = 30;
const paddingY: number = 20;
const containerStyle: React.CSSProperties = {
	borderBottom: '1px solid black',
	padding: `${paddingY}px ${paddingX}px`,
	backgroundColor: 'lavender',
};

interface GraphProps {
	dataSource: PointCoordinates[];
	settings: Configuration;
	setSettings: Dispatch<SetStateAction<Configuration>>;
}
const Graph = ({ dataSource: initialDataSource, settings, setSettings }: GraphProps) => {
	const { YAxisDataKey, XAxisDataKey, showGraphTangent, tangentCoefficients } = settings;
	const isDisabled: boolean = !initialDataSource.length;
	const defaultLeft: number = initialDataSource?.[0]?.[XAxisDataKey];
	const defaultRight: number = Math.floor(
		initialDataSource?.[initialDataSource.length - 1]?.[XAxisDataKey]
	);
	const [leftBorder, setLeftBorder] = useState<number>(defaultLeft);
	const [rightBorder, setRightBorder] = useState<number>(defaultRight);
	const [dataSource, setDataSource] = useState<PointCoordinates[]>([]);
	const [selectedPoint, setSelectedPoint] = useState<PointCoordinates | undefined>();

	// Parametry stycznej
	const xMin = leftBorder;
	const xMax = rightBorder;
	const yMin = tangentCoefficients
		? tangentCoefficients.A * leftBorder + tangentCoefficients.B
		: undefined;
	const yMax = tangentCoefficients
		? tangentCoefficients.A * rightBorder + tangentCoefficients.B
		: undefined;
	const xZero = showGraphTangent && tangentCoefficients ? tangentCoefficients.Zero : undefined;

	const reset = () => {
		setLeftBorder(defaultLeft);
		setRightBorder(defaultRight);
		setSettings((data): Configuration => ({ ...data, tangentCoefficients: undefined }));
	};

	useEffect(() => {
		if (selectedPoint) {
			let previousPoint = initialDataSource.find((x) => x.index === selectedPoint.index - 1);
			let nextPoint = initialDataSource.find((x) => x.index === selectedPoint.index + 1);

			if (previousPoint && nextPoint) {
				let y1 = previousPoint[YAxisDataKey];
				let y2 = nextPoint[YAxisDataKey];
				let x1 = previousPoint[XAxisDataKey];
				let x2 = nextPoint[XAxisDataKey];

				let newA: number = (y1 - y2) / (x1 - x2);
				let newB: number = y1 - newA * x1;
				let tangentOfZero: number = -newB / newA;
				setSettings(
					(data): Configuration => ({
						...data,
						tangentCoefficients: {
							A: newA,
							B: newB,
							Zero: tangentOfZero,
							selectedPointX: selectedPoint[XAxisDataKey],
							selectedPointY: selectedPoint[YAxisDataKey],
						},
					})
				);
			} else {
				message.warning('Nie udało się wyznaczyć stycznej. Wybierz inny punkt wykresu.');
			}
		}
	}, [selectedPoint]);

	useEffect(() => {
		setDataSource(initialDataSource);
		reset();
	}, [initialDataSource, YAxisDataKey, XAxisDataKey]);

	useEffect(() => {
		let indexStart = initialDataSource.findIndex((x) => x[XAxisDataKey] >= leftBorder);
		let indexEnd = initialDataSource.findIndex((x) => x[XAxisDataKey] >= rightBorder);
		let dataSlice = initialDataSource.slice(indexStart, indexEnd);
		setDataSource(dataSlice);
	}, [leftBorder, rightBorder]);

	return (
		<div className="graphContainer">
			{!isDisabled && (
				<>
					<ResponsiveContainer style={containerStyle}>
						<LineChart
							data={dataSource}
							style={{ overflow: 'visible' }}
							onClick={(e) => {
								let newPoint = e.activePayload?.find((x) => x.name === YAxisDataKey).payload;
								setSelectedPoint(newPoint);
							}}
						>
							{/* Siatka i tło wykresu */}
							<CartesianGrid strokeDasharray="3 3" fill="white" />
							{/* Wykres */}
							<Line
								name={YAxisDataKey}
								yAxisId={YAxisDataKey}
								type="monotone"
								dot={false}
								dataKey={YAxisDataKey}
								stroke="blue"
								animationDuration={300}
							/>
							{/* Oś X */}
							<XAxis dataKey={XAxisDataKey} domain={[leftBorder, rightBorder]} type="number">
								<Label
									position="bottom"
									value={XAxisDataKey}
									style={{ fontSize: '130%', fill: 'black' }}
								/>
							</XAxis>
							{/* Oś Y */}
							<YAxis yAxisId={YAxisDataKey}>
								<Label
									style={{ textAnchor: 'middle', fontSize: '140%', fill: 'black' }}
									angle={270}
									offset={0}
									position="insideLeft"
									value={YAxisDataKey}
								/>
							</YAxis>
							{/* Podpowiedź */}
							{!isDisabled && <Tooltip />}
							{/* Punkt przecięcia stycznej z osią OX */}
							<ReferenceDot
								yAxisId={YAxisDataKey}
								x={xZero}
								y={0}
								r={3}
								fill="red"
								cursor={5}
								label={{ position: 'top', value: xZero, fill: 'red', fontSize: 14 }}
							/>
							{/* Wybrany punkt */}
							<ReferenceDot
								yAxisId={YAxisDataKey}
								x={tangentCoefficients?.selectedPointX}
								y={tangentCoefficients?.selectedPointY}
								r={3}
								fill="blue"
								cursor={5}
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

					<div
						style={{
							backgroundColor: '',
							paddingLeft: 60 + paddingX,
							paddingRight: paddingX,
							paddingBottom: 20,
						}}
					>
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

export default Graph;
