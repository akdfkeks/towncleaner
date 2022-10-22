import { ExifParserFactory } from "ts-exif-parser";
import fs from "fs";
import { log } from "console";
import { Decimal } from "@prisma/client/runtime";
import { IssueImageExifError } from "../error/Error";

export function getLatLngFromImage(fileName: string) {
	try {
		const {
			tags: { GPSLatitude, GPSLongitude },
		} = ExifParserFactory.create(fs.readFileSync(`uploads/${fileName}`)).parse();

		return { imageLat: new Decimal(GPSLatitude), imageLng: new Decimal(GPSLongitude) };
	} catch (err) {
		throw new IssueImageExifError(err);
	}
}
