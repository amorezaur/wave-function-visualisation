import { Flex, Layout, Typography } from 'antd';
import React, { useState } from 'react';
import './styles.css';
import Example from './Example';
import ReadFile from './ReadFile';
import { PointCoordinates } from './PointCoordinates';

const { Header, Footer, Sider, Content } = Layout;

const flexStyle: React.CSSProperties = {
	textAlign: 'center',
	flex: 1,
};
const headerStyle: React.CSSProperties = {
	color: 'white',
	backgroundColor: 'darkblue',
	textAlign: 'left',
	height: 'auto',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
};

const contentStyle: React.CSSProperties = {
	// color: '#fff',
	backgroundColor: 'aliceblue',
	// display: 'flex',
	// width: '100%',
	// height: '100%',
	// paddingLeft: 20,
	// paddingRight: 20,
};

const siderStyle: React.CSSProperties = {
	lineHeight: '120px',
	color: '#fff',
	// backgroundColor: "#1677ff",
	// overflow: "auto",
	// height: "100vh",
	// position: "sticky",
	// top: 0,
	// left: 0,
};

const footerStyle: React.CSSProperties = {
	color: '#fff',
	backgroundColor: 'red',
};
const siderTriggerStyle: React.CSSProperties = {
	top: '10px',
	// backgroundColor: "red",
};

// const layoutStyle = {
// 	borderRadius: 8,
// 	overflow: "hidden",
// 	// width: "calc(50% - 8px)",
// 	// maxWidth: "calc(50% - 8px)",
// };

const layoutStyle = {
	// overflow: 'hidden',
	// flex: 1,
	// display: 'flex',
	// width: '100%',
	// height: '90%',
};

const MainLayout_v2 = () => {
	const [dataSource, setDataSource] = useState<PointCoordinates[]>([]);

	const getFileData = (newData: PointCoordinates[]) => {
		setDataSource(newData);
	};

	return (
		<>
			<Flex style={flexStyle}>
				<Layout style={layoutStyle}>
					<Header style={headerStyle}>
						<Typography.Title style={{ color: 'white', marginTop: 0, marginBottom: 0 }} level={3}>
							Wizualizacja funkcji falowej elektronu
						</Typography.Title>
						{/* <h1>asdasdasd</h1> */}

						<ReadFile getFileData={getFileData} />
					</Header>
					<Layout style={layoutStyle}>
						{/* <Sider
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
						</Sider> */}
						<Content style={contentStyle}>{<Example dataSource={dataSource} />}</Content>
						{/* <Content style={contentStyle}>{!!dataSource.length && <Example dataSource={dataSource} />}</Content> */}
					</Layout>
					{/* <Footer style={footerStyle}>Footer</Footer> */}
				</Layout>
			</Flex>
		</>
	);
};

export default MainLayout_v2;
