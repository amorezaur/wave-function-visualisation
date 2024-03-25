import React, { useState } from "react";
import "./styles2.css";

const TestPage = () => {
	const [showSidebar, setShowSidebar] = useState(true);

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	return (
		<>
			<header className="header">
				<button className="hamburger" onClick={toggleSidebar}>
					<div className="menu-icon"></div>
					<div className="menu-icon"></div>
					<div className="menu-icon"></div>
				</button>
				<div className="header-title">Header</div>
			</header>
			<div className="content">
				{/* {showSidebar && <div className="sidebar">Panel boczny</div>} */}
				<div className={`sidebar ${showSidebar ? "show" : ""}`}>
					Panel boczny
				</div>
				<div className="div2">Div 2</div>
			</div>
			<footer className="footer">Footer</footer>
		</>
	);
};

export default TestPage;
