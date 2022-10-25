import { ExifParserFactory } from "ts-exif-parser";
import fs from "fs";
import { log } from "console";
import { Decimal } from "@prisma/client/runtime";
import { IssueImageExifError } from "../error/Error";
import { MSG } from "../config/message";

export function getLatLngFromImage(fileName: string) {
	try {
		const {
			tags: { GPSLatitude, GPSLongitude },
		} = ExifParserFactory.create(fs.readFileSync(`uploads/${fileName}`)).parse();

		return { lat: new Decimal(GPSLatitude), lng: new Decimal(GPSLongitude) };
	} catch (err) {
		throw new IssueImageExifError(MSG.FAILURE.IMAGE.PARSE);
	}
}
