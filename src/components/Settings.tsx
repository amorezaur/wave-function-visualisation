import { Checkbox, Descriptions, DescriptionsProps, Radio } from 'antd';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { TangentCoefficients } from './Example';
import { PointCoordinates } from './PointCoordinates';

export interface Configuration {
	XAxisDataKey: keyof PointCoordinates;
	YAxisDataKey: keyof PointCoordinates;
	showGraphTangent: boolean;
	tangentCoefficients?: TangentCoefficients;
}
const YAxisDataKey_1: keyof PointCoordinates = 'p(r)';
const YAxisDataKey_2: keyof PointCoordinates = 'q(r)';
const YAxisDataKey_3: keyof PointCoordinates = 'r';

const XAxisDataKey_1: keyof PointCoordinates = 'r';
const XAxisDataKey_2: keyof PointCoordinates = 'index';

export const defaultSettings: Configuration = {
	YAxisDataKey: YAxisDataKey_1,
	XAxisDataKey: XAxisDataKey_1,
	showGraphTangent: false,
};

interface SettingsProps {
	settings: Configuration;
	setSettings: Dispatch<SetStateAction<Configuration>>;
}
const Settings = ({ settings, setSettings }: SettingsProps) => {
	const { XAxisDataKey, YAxisDataKey, showGraphTangent, tangentCoefficients } = settings;

	useEffect(() => {
		setSettings(
			(data): Configuration => ({
				...data,
				showGraphTangent: !!tangentCoefficients,
			}),
		);
	}, [tangentCoefficients]);

	const isDisabled: boolean = false;

	const white: React.CSSProperties = {
		fontSize: 10,
		backgroundColor: 'white',
		padding: 10,
		// backgroundColor: 'skyblue',
		height: '100%',
		overflowY: 'auto' /* Enables vertical scroll */,
	};
	const items: DescriptionsProps['items'] = [
		{
			key: '1',
			label: 'Oś Y',
			children: (
				<Radio.Group
					disabled={isDisabled}
					onChange={(e) => {
						setSettings(
							(data): Configuration => ({
								...data,
								YAxisDataKey: e.target.value,
								showGraphTangent: false,
								tangentCoefficients: undefined,
							}),
						);
					}}
					value={YAxisDataKey}
				>
					<Radio value={YAxisDataKey_1}>{YAxisDataKey_1}</Radio>
					<Radio value={YAxisDataKey_2}>{YAxisDataKey_2}</Radio>
					<Radio value={YAxisDataKey_3}>{YAxisDataKey_3}</Radio>
				</Radio.Group>
			),
		},
		{
			key: '11',
			label: 'Oś X',
			children: (
				<Radio.Group
					disabled={isDisabled}
					onChange={(e) => {
						setSettings(
							(data): Configuration => ({
								...data,
								XAxisDataKey: e.target.value,
								showGraphTangent: false,
								tangentCoefficients: undefined,
							}),
						);
					}}
					value={XAxisDataKey}
				>
					<Radio value={XAxisDataKey_1}>{XAxisDataKey_1}</Radio>
					<Radio value={XAxisDataKey_2}>{XAxisDataKey_2}</Radio>
				</Radio.Group>
			),
		},
		{
			key: '2',
			label: 'Pokaż styczną',
			children: (
				<Checkbox
					checked={showGraphTangent}
					onChange={() =>
						setSettings(
							(data): Configuration => ({
								...data,
								showGraphTangent: !data.showGraphTangent,
							}),
						)
					}
					disabled={!tangentCoefficients}
				>
					{'styczna'}
				</Checkbox>
			),
		},
		{
			key: '3',
			label: 'Współczynniki równania kierunkowego stycznej ( y = Ax + B )',
			children: (
				<div>
					<p>A = {tangentCoefficients?.A}</p>
					<p>B = {tangentCoefficients?.B}</p>
				</div>
			),
		},
		{
			key: '33',
			label: 'Współrzędne wybranego punktu',
			children: (
				<div>
					<p>
						{YAxisDataKey} =<b> {tangentCoefficients?.selectedPointY}</b>
					</p>
					<p>
						{XAxisDataKey} =<b> {tangentCoefficients?.selectedPointX}</b>
					</p>
				</div>
			),
		},
		{
			key: '4',
			label: 'Miejsce zerowe stycznej',
			children: (
				<div>
					<p>
						X<sub>0</sub> =<b> {tangentCoefficients?.Zero}</b>
					</p>
				</div>
			),
		},
		// {
		// 	key: '5',
		// 	label: 'Address',
		// 	children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
		// },
	];

	return (
		<>
			<div style={{}} className="settings">
				<Descriptions
					bordered
					title="Ustawienia"
					items={items}
					column={1}
					size="small"
					layout="vertical"
				/>
			</div>
		</>
	);
};

export default Settings;
