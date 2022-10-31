import { Result } from "../interface/Detection";

export function sortResultByBboxWithConf(input: any[]) {
	const data: Result[] = parseDetectionResult(input);
	return data.sort((a, b) => {
		return b.size - a.size || a.conf - b.conf;
	});
}

function parseDetectionResult(input: any[]): Result[] {
	return input.map((a): Result => {
		return {
			code: parseInt(a.code),
			conf: parseFloat(a.conf),
			size: parseFloat(a.bbox[2]) * parseFloat(a.bbox[3]),
		};
	});
}

export const tempData = [
	{ code: 0, conf: 0.341559, bbox: ["0.435971", "0.598057", "0.141072", "0.3284"] },
	{ code: 0, conf: 0.378812, bbox: ["0.360229", "0.487512", "0.125976", "0.303423"] },
	{ code: 0, conf: 0.437668, bbox: ["0.53696", "0.524052", "0.180635", "0.32655"] },
	{ code: 0, conf: 0.618755, bbox: ["0.461218", "0.549029", "0.321707", "0.430157"] },
];
