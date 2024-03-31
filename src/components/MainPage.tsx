import { useState } from "react";
import ReadFile from "./ReadFile";
import WaveGraph, { PointCoordinates, WaveGraphProps } from "./WaveGraph";
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
			<div className="blue">
				<WaveGraph props={waveGraphProps} />
				{/* <Example dataSource={dataSource} /> */}
			</div>
			{/* {!!dataSource.length && ( */}
			{/* )} */}

			{/* <ReadFile /> */}
			{/* <TestGraph /> */}
		</div>
	);
};

export default MainPage;
