import React, { useState } from "react";
import { Layout, Flex, Upload, Button, Space } from "antd";
import "./styles.css";
import WaveGraph, { PointCoordinates, WaveGraphProps } from "../WaveGraph";
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined } from "../Icons";
import ReadFile2, { DataItem } from "./ReadFile2";

const { Header, Footer, Sider, Content } = Layout;

const flexStyle: React.CSSProperties = {
	textAlign: "center",
	flex: 1,
};
const headerStyle: React.CSSProperties = {
	color: "white",
	backgroundColor: "darkblue",
	textAlign: "left",
};

const contentStyle: React.CSSProperties = {
	color: "#fff",
	backgroundColor: "#0958d9",
};

const siderStyle: React.CSSProperties = {
	lineHeight: "120px",
	color: "#fff",
	// backgroundColor: "#1677ff",
	// overflow: "auto",
	// height: "100vh",
	// position: "sticky",
	// top: 0,
	// left: 0,
};

const footerStyle: React.CSSProperties = {
	color: "#fff",
	backgroundColor: "red",
};
const siderTriggerStyle: React.CSSProperties = {
	top: "10px",
	// backgroundColor: "red",
};

// const layoutStyle = {
// 	borderRadius: 8,
// 	overflow: "hidden",
// 	// width: "calc(50% - 8px)",
// 	// maxWidth: "calc(50% - 8px)",
// };

const layoutStyle = {
	overflow: "hidden",
	flex: 1,
};

const AntdLayout = () => {
	const [collapsed, setCollapsed] = useState(true);

	const [dataSource, setDataSource] = useState<DataItem[]>([]);

	const getFileData = (newData: DataItem[]) => {
		setDataSource(newData);
	};

	const waveGraphProps: WaveGraphProps = {
		dataSource: dataSource,
		numberOfPoints: 100,
	};
	const [jsonData, setJsonData] = useState<any>(null);

	return (
		<>
			<Flex style={flexStyle}>
				<Layout style={layoutStyle}>
					<Header style={headerStyle}>
						{/* <Space> */}
						{/* <Button
								className="siderTrigger"
								// type="text"
								icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
								onClick={() => setCollapsed(!collapsed)}
								// style={{
								// 	// fontSize: "16px",
								// 	// width: 64,
								// 	// height: 64,
								// 	color: "red",
								// 	backgroundColor: "white",
								// }}
							/> */}

						<ReadFile2 getFileData={getFileData} />
						{/* </Space> */}
					</Header>
					<Layout>
						<Sider
							width="25%"
							// trigger={null}
							collapsible
							// collapsed={collapsed}
							defaultCollapsed
							style={siderStyle}
							collapsedWidth={0}
							// zeroWidthTriggerStyle={siderTriggerStyle}
						>
							aaa
						</Sider>
						<Content style={contentStyle}>
							<WaveGraph props={waveGraphProps} />
						</Content>
					</Layout>
					{/* <Footer style={footerStyle}>Footer</Footer> */}
				</Layout>
			</Flex>
		</>
	);
};

export default AntdLayout;
