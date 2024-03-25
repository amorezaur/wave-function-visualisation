import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
// import "./styles2.css";
import MainPage from "./components/MainPage";
import TestPage from "./components/TestComponents/TestPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		{/* <MainPage /> */}
		<TestPage />
	</React.StrictMode>
);
