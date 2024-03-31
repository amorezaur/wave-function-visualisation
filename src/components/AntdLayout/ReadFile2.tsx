import { useState } from "react";
import { Button, Space, Upload } from "antd";
import { UploadOutlined } from "../Icons";

export interface DataItem {
	count: number;
	r: number;
	p: number;
	q: number;
}
interface ReadFile2Props {
	getFileData: (newData: DataItem[]) => void;
}
const ReadFile2 = ({ getFileData }: ReadFile2Props) => {
	const [fileName, setFileName] = useState<string | null>(null);

	return (
		<Space>
			<Upload
				multiple={false}
				showUploadList={false}
				beforeUpload={(file) => {
					setFileName(file.name); // Zapisanie nazwy pliku
					const reader = new FileReader();
					reader.onload = (e: ProgressEvent<FileReader>) => {
						const text = e.target?.result as string;
						const lines = text.split("\n");
						const parsedData: DataItem[] = [];

						let count = 1;
						lines.forEach((line) => {
							const trimmedLine = line.trim();
							// Sprawdzamy, czy linia nie zaczyna się od # (komentarz)
							if (trimmedLine && !trimmedLine.startsWith("#")) {
								const [r, p, q] = trimmedLine.split(/\s+/).map(Number);
								parsedData.push({ r, p, q, count });
								count++;
							}
						});
						console.log("parsedData", parsedData);
						getFileData(parsedData);
					};
					reader.readAsText(file);
					// Prevent upload
					return false;
				}}
			>
				<Button>
					<UploadOutlined /> Wybierz plik
				</Button>
			</Upload>
			{fileName}
		</Space>
	);
};

export default ReadFile2;
