import { ExifParserFactory } from "ts-exif-parser";
import fs from "fs";
import { log } from "console";
import { IssueImageExifError } from "../error/Error";
import { MSG } from "../config/message";
import { errorGenerator } from "./errorGenerator";

export function getLatLngFromImage(fileName: string) {
	try {
		const {
			tags: { GPSLatitude, GPSLongitude },
		} = ExifParserFactory.create(fs.readFileSync(`uploads/origin/${fileName}`)).parse();

		if (!GPSLatitude || !GPSLongitude) throw new IssueImageExifError(MSG.FAILURE.IMAGE.PARSE);

		return { lat: GPSLatitude, lng: GPSLongitude };
	} catch (err) {
		throw err;
	}
}
