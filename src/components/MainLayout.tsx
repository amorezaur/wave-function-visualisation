import { Button, Flex, Layout, Space, Typography } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import Example from './Example';
import { PointCoordinates } from './PointCoordinates';
import ReadFile from './ReadFile';
import Settings, { Configuration, defaultSettings } from './Settings';
import './styles.css';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const flexStyle: CSSProperties = {
	textAlign: 'center',
	flex: 1,
	flexDirection: 'column',
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
	backgroundColor: 'aliceblue',
};

const siderStyle: CSSProperties = {
	overflowY: 'auto',
	overflowX: 'hidden',
};

const layoutStyle: CSSProperties = {};

const MainLayout = () => {
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
						<Typography.Title
							style={{
								color: 'white',
								marginTop: 0,
								marginBottom: 0,
								wordBreak: 'normal',
							}}
							level={3}
						>
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
							<Example dataSource={dataSource} settings={settings} setSettings={setSettings} />
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

export default MainLayout;
