import { Button, Drawer, Flex, Layout, Space, Tooltip, Typography } from 'antd';
import React, { CSSProperties, useState } from 'react';
import './styles.css';
import Example from './Example';
import ReadFile from './ReadFile';
import { PointCoordinates } from './PointCoordinates';
import Settings, { Configuration, defaultSettings } from './Settings';
import { MenuFoldOutlined, MenuOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

const flexStyle: CSSProperties = {
	textAlign: 'center',
	flex: 1,
	flexDirection: 'column',
	// height: '100%',
};
const headerStyle: CSSProperties = {
	color: 'white',
	backgroundColor: 'darkblue',
	textAlign: 'left',
	height: 'auto',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
};

const contentStyle: CSSProperties = {
	// color: '#fff',
	backgroundColor: 'aliceblue',
	// display: 'flex',
	// width: '100%',
	// height: '100%',
	// paddingLeft: 20,
	// paddingRight: 20,
};

const siderStyle: CSSProperties = {
	overflowY: 'auto',
	overflowX: 'hidden',
	// width: 'min-content',

	// lineHeight: '120px',
	// color: '#fff',
	// backgroundColor: '#1677ff',
	// borderRight: '5px solid black',
	// overflow: "auto",
	// height: "100vh",
	// position: "sticky",
	// top: 0,
	// left: 0,
};

const footerStyle: CSSProperties = {
	color: '#fff',
	backgroundColor: 'red',
};

// const layoutStyle = {
// 	borderRadius: 8,
// 	overflow: "hidden",
// 	// width: "calc(50% - 8px)",
// 	// maxWidth: "calc(50% - 8px)",
// };

const layoutStyle: CSSProperties = {
	// border: '2px solid red',
	// overflow: 'hidden',
	// flex: 1,
	// display: 'flex',
	// width: '100%',
	// height: '90%',
};

const MainLayout_v2 = () => {
	const [dataSource, setDataSource] = useState<PointCoordinates[]>([]);
	const [settings, setSettings] = useState<Configuration>(defaultSettings);
	const [collapsed, setCollapsed] = useState<boolean>(false);

	const getFileData = (newData: PointCoordinates[]) => {
		setDataSource(newData);
	};

	return (
		<>
			<Flex style={flexStyle}>
				<Layout style={layoutStyle}>
					<Header style={headerStyle}>
						<Typography.Title style={{ color: 'white', marginTop: 0, marginBottom: 0, wordBreak: 'normal' }} level={3}>
							Wizualizacja funkcji falowej elektronu
						</Typography.Title>
						<Space>
							<ReadFile getFileData={getFileData} />
							<Button onClick={() => setCollapsed((prev) => !prev)}>{collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}</Button>
						</Space>
					</Header>
					<Layout style={layoutStyle}>
						<Content style={contentStyle}>{<Example dataSource={dataSource} settings={settings} setSettings={setSettings} />}</Content>
						<Sider width="25%" collapsed={collapsed} style={siderStyle} collapsedWidth={0}>
							<Settings settings={settings} setSettings={setSettings} />
						</Sider>
					</Layout>
					{/* <Footer style={footerStyle}>Footer</Footer> */}
				</Layout>
			</Flex>
		</>
	);
};

export default MainLayout_v2;
