import { PointCoordinates } from './PointCoordinates';
import { TangentCoefficients } from './TangentCoefficients';

export interface Configuration {
	XAxisDataKey: keyof PointCoordinates;
	YAxisDataKey: keyof PointCoordinates;
	showGraphTangent: boolean;
	tangentCoefficients?: TangentCoefficients;
}
