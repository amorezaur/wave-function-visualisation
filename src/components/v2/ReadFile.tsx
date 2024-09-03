import React, { useState } from "react";
import { PointCoordinates } from "./PointCoordinates";
import { Button, Input, Space, Upload } from "antd";
import { UploadOutlined } from "../../assets/Icons";

interface ReadFileProps {
	getFileData: (newData: PointCoordinates[]) => void;
}
const ReadFile = ({ getFileData }: ReadFileProps) => {
	const [fileName, setFileName] = useState<string | null>(null);

	//Liczba kolumn z danymi
	const dataColumnsCount: number = 3;
	const showFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const reader = new FileReader();
		reader.onload = async (e: any) => {
			console.log("e", e);
			const text: string = e.target.result;

			let initialPoint: PointCoordinates = {
				count: 0,
				r: 0,
				"p(r)": 0,
				"q(r)": 0,
			};
			let resultData: PointCoordinates[] = [initialPoint];
			// Podział tekstu na linie
			let lines = text.split("\n");
			//Pominięcie wierszy z komentarzami
			lines = lines.filter((x) => !x.includes("#"));
			lines.map((line, index) => {
				let row = line.trim().split(/\s+/g); ///\s+/g - whitespace Regex
				if (row.length === dataColumnsCount) {
					resultData.push({
						count: index + 1,
						r: Number(row[0]),
						"p(r)": Number(row[1]),
						"q(r)": Number(row[2]),
					});
				}
			});
			// let ccc = bbb[0];
			// let ddd = ccc.trim().split(/\s+/g);
			// console.log("ddd", ddd);
			// lines.map((line, index = 1) => {
			// 	let aaa = line.trim().split(/\s+/g); ///\s+/g - whitespace Regex
			// 	if (aaa[0] !== "#" && aaa.length === 3) {
			// 		data.push(aaa);
			// 		ggg.push({
			// 			count: index,
			// 			r: Number(aaa[0]),
			// 			"p(r)": Number(aaa[1]),
			// 			"q(r)": Number(aaa[2]),
			// 		});
			// 		// ggg.push({ r: Number(aaa[0]), "p(r)": aaa[1], "q(r)": aaa[2] });
			// 	}
			// });
			// console.log("data", data);
			// console.log("ggg", resultData);
			getFileData(resultData);
			// console.log("lines", lines[0]);
			var result = [];
			// var headers=lines[0].split(",");
			// for(var i=1;i<lines.length;i++){
			//   var obj = {};
			//   var currentline=lines[i].split(",");
			//   for(var j=0;j<headers.length;j++){
			//     obj[headers[j]] = currentline[j];
			//   }
			//   result.push(obj);
			//   }
			//   //return result; //JavaScript object
			//   result= JSON.stringify(result); //JSON
			// console.log(result);
		};
		if (e.target.files?.length) reader.readAsText(e.target.files[0]);
	};

	return (
		// <div>
		// 	{/* <button
		// 		style={{ display: "block" }}
		// 		onClick={() => {
		// 			// let aaa = [
		// 			// 	"lines   # COWF continuum spinor output file opened at 17:16:35 on Jan 02 2024.",
		// 			// ];
		// 			// console.log("aaa", aaa);
		// 			// // const whitespaceRegex: string = "\\s+";
		// 			// const whitespaceRegex: string = " ";
		// 			// let bbb = aaa.map((x) => x.split(whitespaceRegex));
		// 			// console.log("bbb", bbb);

		// 			let ddd =
		// 				"aaa   # COWF continuum spinor output file opened at 17:16:35 on Jan 02 2024.                    ";
		// 			let eee = ddd.split(/\s+/g);
		// 			console.log("eee", eee);
		// 		}}
		// 	>
		// 		hello
		// 	</button> */}
		// 	<input type="file" onChange={(e) => showFile(e)} />
		// </div>

		<Space>
			<Upload
				multiple={false}
				showUploadList={false}
				beforeUpload={(file) => {
					setFileName(file.name); // Zapisanie nazwy pliku

					const reader = new FileReader();
					reader.onload = (e: ProgressEvent<FileReader>) => {
						let initialPoint: PointCoordinates = {
							count: 0,
							r: 0,
							"p(r)": 0,
							"q(r)": 0,
						};
						let resultData: PointCoordinates[] = [initialPoint];

						const text = e.target?.result as string;
						// Podział tekstu na linie
						let lines = text.split("\n");
						//Pominięcie wierszy z komentarzami
						lines = lines.filter((x) => !x.includes("#"));
						lines.forEach((line, index) => {
							const trimmedLine = line.trim();
							let row = trimmedLine.split(/\s+/).map(Number);
							if (row.length === dataColumnsCount) {
								resultData.push({
									count: index + 1,
									r: row[0],
									"p(r)": row[1],
									"q(r)": row[2],
								});
							}
						});
						getFileData(resultData);
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
			<Input />
		</Space>
	);
};

export default ReadFile;
