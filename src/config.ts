interface Config {
	useInitialData: boolean;
}
export const config: Config = {
	useInitialData: true && import.meta.env.DEV,
};
