import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./components/MainPage";
import TestPage from "./components/TestComponents/TestPage";
import AntdLayout from "./components/AntdLayout/AntdLayout";
import MainLayout from "./components/Version3/MainLayout";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		{/* <MainPage /> */}
		{/* <TestPage /> */}
		{/* <AntdLayout /> */}
		<MainLayout />
	</React.StrictMode>
);
