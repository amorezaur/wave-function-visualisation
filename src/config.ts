interface Config {
	useInitialData: boolean;
}
export const config: Config = {
	useInitialData: false && import.meta.env.DEV,
};
//TODO plik do usuniecia? s
