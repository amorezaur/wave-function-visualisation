import React, { useState } from "react";
// import "./styles2.css";
import WaveGraph, { WaveGraphProps } from "../WaveGraph";
import { PointCoordinates } from "../PointCoordinates";
import { Button, Menu, MenuProps } from "antd";
import {
	AppstoreOutlined,
	ContainerOutlined,
	DesktopOutlined,
	MailOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
} from "@ant-design/icons";

const TestPage = () => {
	const [showSidebar, setShowSidebar] = useState(true);

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};
	const [dataSource, setDataSource] = useState<PointCoordinates[]>([]);

	const getFileData = (newData: PointCoordinates[]) => {
		setDataSource(newData);
	};

	const waveGraphProps: WaveGraphProps = {
		dataSource: dataSource,
		numberOfPoints: 100,
	};

	type MenuItem = Required<MenuProps>["items"][number];

	function getItem(
		label: React.ReactNode,
		key: React.Key,
		icon?: React.ReactNode,
		children?: MenuItem[],
		type?: "group"
	): MenuItem {
		return {
			key,
			icon,
			children,
			label,
			type,
		} as MenuItem;
	}

	const items: MenuItem[] = [
		getItem("Option 1", "1", <PieChartOutlined />),
		getItem("Option 2", "2", <DesktopOutlined />),
		getItem("Option 3", "3", <ContainerOutlined />),

		getItem("Navigation One", "sub1", <MailOutlined />, [
			getItem("Option 5", "5"),
			getItem("Option 6", "6"),
			getItem("Option 7", "7"),
			getItem("Option 8", "8"),
		]),

		getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
			getItem("Option 9", "9"),
			getItem("Option 10", "10"),

			getItem("Submenu", "sub3", null, [
				getItem("Option 11", "11"),
				getItem("Option 12", "12"),
			]),
		]),
	];

	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	return (
		<>
			<header className="header">
				<button className="hamburger" onClick={toggleSidebar}>
					<div className="menu-icon" />
					<div className="menu-icon" />
					<div className="menu-icon" />
				</button>
				<div className="header-title">Header</div>
			</header>
			<Button
				type="primary"
				onClick={toggleCollapsed}
				style={{ marginBottom: 16 }}
			>
				{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
			</Button>
			<div className="content">
				<Menu
					defaultSelectedKeys={["1"]}
					defaultOpenKeys={["sub1"]}
					mode="inline"
					theme="dark"
					// inlineCollapsed={collapsed}
					// items={items}
				/>
				{/* {showSidebar && <div className="sidebar">Panel boczny</div>} */}
				<div className={`sidebar ${showSidebar ? "show" : ""}`}>
					Panel boczny
				</div>
				<div className="div2">
					<WaveGraph props={waveGraphProps} />
					{/* <Example dataSource={dataSource} /> */}
				</div>
			</div>
			<footer className="footer">Footer</footer>
		</>
	);
};

export default TestPage;
