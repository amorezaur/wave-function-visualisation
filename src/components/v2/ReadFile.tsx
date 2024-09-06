import React, { useEffect, useState } from 'react';
import { PointCoordinates } from './PointCoordinates';
import { Button, Input, Space, Tag, Typography, Upload } from 'antd';
import { UploadOutlined } from '../../assets/Icons';
import { RcFile } from 'antd/es/upload';
import { config } from '../../config';

interface ReadFileProps {
	getFileData: (newData: PointCoordinates[]) => void;
}
const ReadFile = ({ getFileData }: ReadFileProps) => {
	const [fileName, setFileName] = useState<string | null>(null);

	const readFileTextContent = (text: string) => {
		const dataColumnsCount: number = 3;

		let initialPoint: PointCoordinates = {
			count: 0,
			r: 0,
			'p(r)': 0,
			'q(r)': 0,
		};
		let resultData: PointCoordinates[] = [initialPoint];
		// Podział tekstu na linie
		let lines = text.split('\n');
		//Pominięcie wierszy z komentarzami
		lines = lines.filter((x) => !x.includes('#'));
		lines.forEach((line, index) => {
			const trimmedLine = line.trim();
			let row = trimmedLine.split(/\s+/).map(Number);
			if (row.length === dataColumnsCount) {
				resultData.push({
					count: index + 1,
					r: row[0],
					'p(r)': row[1],
					'q(r)': row[2],
				});
			}
		});
		getFileData(resultData);
	};

	const readFile = (file: RcFile) => {
		setFileName(file.name); // Zapisanie nazwy pliku

		const reader = new FileReader();
		reader.onload = (e: ProgressEvent<FileReader>) => {
			const text = e.target?.result as string;
			readFileTextContent(text);
		};
		reader.readAsText(file);
	};

	useEffect(() => {
		if (config.useInitialData) {
			let filePath: string = 'src\\data\\testData.csp';
			fetch(filePath)
				.then((response) => response.text())
				.then((text) => readFileTextContent(text));
		}
	}, []);

	return (
		<>
			<Space>
				<Upload
					multiple={false}
					showUploadList={false}
					beforeUpload={(file) => {
						readFile(file);
						return false;
					}}
				>
					<Button>
						<UploadOutlined /> Wybierz plik
					</Button>
				</Upload>
				{fileName}
				{import.meta.env.DEV && (
					<Tag color="red-inverse">{import.meta.env.VITE_ENV}</Tag>
				)}
			</Space>
		</>
	);
};

export default ReadFile;
