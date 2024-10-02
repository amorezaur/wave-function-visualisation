import { Button, message, Space, Tag, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import { config } from '../config';
import { testTextData } from '../assets/testData';
import { PointCoordinates } from '../types/PointCoordinates';
import { UploadOutlined } from '@ant-design/icons';

interface ReadFileProps {
	getFileData: (newData: PointCoordinates[]) => void;
}
const ReadFile = ({ getFileData }: ReadFileProps) => {
	const [fileName, setFileName] = useState<string>();

	const readFileTextContent = (text: string, newFileName: string) => {
		const dataColumnsCount: number = 3;
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

	const loadTestData = () => {
		readFileTextContent(testTextData, 'Dane testowe');
	};

	useEffect(() => {
		if (config.useInitialData) {
			loadTestData();
		}
	}, []);

	return (
		<>
			<Space>
				<Button onClick={loadTestData}>Wczytaj przykładowe dane</Button>
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
			</Space>
		</>
	);
};

export default ReadFile;
