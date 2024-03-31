import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./components/MainPage";
import TestPage from "./components/TestComponents/TestPage";
import AntdLayout from "./components/AntdLayout/AntdLayout";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		{/* <MainPage /> */}
		{/* <TestPage /> */}
		<AntdLayout />
	</React.StrictMode>
);
