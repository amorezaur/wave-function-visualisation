import { Flex, Layout } from "antd";
import React, { useState } from "react";
import "./styles.css";
import Example from "../Example";
import ReadFile from "./ReadFile";
import { PointCoordinates } from "../PointCoordinates";

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
	backgroundColor: "lightgrey",
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

const MainLayout = () => {
	const [dataSource, setDataSource] = useState<PointCoordinates[]>([]);

	const getFileData = (newData: PointCoordinates[]) => {
		setDataSource(newData);
	};

	return (
		<>
			<Flex style={flexStyle}>
				<Layout style={layoutStyle}>
					<Header style={headerStyle}>
						<ReadFile getFileData={getFileData} />
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
							Ustawienia
						</Sider>
						<Content style={contentStyle}>
							{!!dataSource.length && <Example dataSource={dataSource} />}
						</Content>
					</Layout>
					{/* <Footer style={footerStyle}>Footer</Footer> */}
				</Layout>
			</Flex>
		</>
	);
};

export default MainLayout;
