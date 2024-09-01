import React from "react";
import ReactDOM from "react-dom/client";
import MainLayout_v1 from "./components/v1/MainLayout_v1";
import MainLayout_v2 from "./components/v2/MainLayout_v2";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		{/* <MainLayout_v1 /> */}
		<MainLayout_v2 />
	</React.StrictMode>
);
