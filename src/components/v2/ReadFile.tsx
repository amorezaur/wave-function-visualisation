import { Button, message, Space, Tag, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '../../assets/Icons';
import { config } from '../../config';
import { testTextData } from '../../data/testData';
import { PointCoordinates } from './PointCoordinates';

interface ReadFileProps {
	getFileData: (newData: PointCoordinates[]) => void;
}
const ReadFile = ({ getFileData }: ReadFileProps) => {
	const [fileName, setFileName] = useState<string>();

	const readFileTextContent = (text: string, newFileName?: string) => {
		const dataColumnsCount: number = 3;

		// let initialPoint: PointCoordinates = {
		// 	count: 0,
		// 	r: 0,
		// 	'p(r)': 0,
		// 	'q(r)': 0,
		// };
		let resultData: PointCoordinates[] = [];
		// Podział tekstu na linie
		let lines = text.split('\n');
		//Pominięcie wierszy z komentarzami
		lines = lines.filter((x) => !x.includes('#'));
		lines.forEach((line, index) => {
			const trimmedLine = line.trim();
			let row = trimmedLine.split(/\s+/).map(Number);
			if (row.length === dataColumnsCount) {
				resultData.push({
					index: index,
					r: row[0],
					'p(r)': row[1],
					'q(r)': row[2],
				});
			}
		});
		if (resultData.length) {
			setFileName(newFileName);
		} else {
			message.warning('Niepoprawny plik');
			setFileName(undefined);
		}
		getFileData(resultData);
	};

	const readFile = (file: RcFile) => {
		const reader = new FileReader();
		reader.onload = (e: ProgressEvent<FileReader>) => {
			const text = e.target?.result as string;
			readFileTextContent(text, file.name);
		};
		reader.readAsText(file);
	};

	const useTestData = () => {
		readFileTextContent(testTextData);
	};

	useEffect(() => {
		if (config.useInitialData) {
			useTestData();
		}
	}, []);

	return (
		<>
			<Space>
				<Button onClick={useTestData}>Wczytaj przykładowe dane</Button>
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
				{import.meta.env.DEV && <Tag color="red-inverse">{import.meta.env.VITE_ENV}</Tag>}
			</Space>
		</>
	);
};

export default ReadFile;
