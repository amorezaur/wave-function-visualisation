import React from 'react';
import ReactDOM from 'react-dom/client';
import MainLayout_v2 from './components/v2/MainLayout_v2';
import SinLineChart from './components/v2/TestRecharts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<MainLayout_v2 />
		{/* <SinLineChart /> */}
	</React.StrictMode>,
);
