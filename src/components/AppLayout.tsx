import { Button, Flex, Layout, Space, Typography } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import Graph from './Graph';
import { PointCoordinates } from '../types/PointCoordinates';
import ReadFile from './ReadFile';
import Settings, { defaultSettings } from './Settings';
import { Configuration } from '../types/Configuration';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const flexStyle: CSSProperties = {
	textAlign: 'center',
	flex: 1,
	flexDirection: 'column',
};

const layoutStyle: CSSProperties = {};

const headerStyle: CSSProperties = {
	color: 'white',
	backgroundColor: 'darkblue',
	textAlign: 'left',
	height: 'auto',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
};

const titleStyle: CSSProperties = {
	color: 'white',
	marginTop: 0,
	marginBottom: 0,
	wordBreak: 'normal',
};

const contentStyle: CSSProperties = {
	backgroundColor: 'aliceblue',
};

const siderStyle: CSSProperties = {
	overflowY: 'auto',
	overflowX: 'hidden',
};

const AppLayout = () => {
	const { Header, Sider, Content } = Layout;
	const [dataSource, setDataSource] = useState<PointCoordinates[]>([]);
	const [settings, setSettings] = useState<Configuration>(defaultSettings);
	const [collapsed, setCollapsed] = useState<boolean>(true);

	const getFileData = (newData: PointCoordinates[]) => {
		setDataSource(newData);
	};

	useEffect(() => {
		if (dataSource.length) {
			setCollapsed(false);
		}
	}, [dataSource]);

	return (
		<>
			<Flex style={flexStyle}>
				<Layout style={layoutStyle}>
					<Header style={headerStyle}>
						<Typography.Title style={titleStyle} level={3}>
							Wizualizacja funkcji falowej elektronu
						</Typography.Title>
						<Space>
							<ReadFile getFileData={getFileData} />
							<Button onClick={() => setCollapsed((prev) => !prev)}>
								{collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
							</Button>
						</Space>
					</Header>

					<Layout style={layoutStyle}>
						<Content style={contentStyle}>
							<Graph dataSource={dataSource} settings={settings} setSettings={setSettings} />
						</Content>
						<Sider width="25%" collapsed={collapsed} style={siderStyle} collapsedWidth={0}>
							<Settings settings={settings} setSettings={setSettings} />
						</Sider>
					</Layout>
				</Layout>
			</Flex>
		</>
	);
};

export default AppLayout;
