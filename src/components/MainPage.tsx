import { useState } from "react";
import ReadFile from "./ReadFile";
import WaveGraph, { WaveGraphProps } from "./WaveGraph";
import { PointCoordinates } from "./PointCoordinates";
import Example from "./Example";

const MainPage = () => {
	const [dataSource, setDataSource] = useState<PointCoordinates[]>([]);

	const getFileData = (newData: PointCoordinates[]) => {
		setDataSource(newData);
	};

	const waveGraphProps: WaveGraphProps = {
		dataSource: [],
		numberOfPoints: 100,
	};

	return (
		<div className="mainContainer">
			<div className="yellow">
				<ReadFile getFileData={getFileData} />
			</div>
			{!!dataSource.length && (
				<div
					className="blue"
					style={{ padding: "30px", backgroundColor: "lightgrey" }}
				>
					{/* <WaveGraph props={waveGraphProps} /> */}

					{!!dataSource.length && <Example dataSource={dataSource} />}
				</div>
			)}
			{/* {!!dataSource.length && ( */}
			{/* )} */}

			{/* <ReadFile /> */}
			{/* <TestGraph /> */}
		</div>
	);
};

export default MainPage;
