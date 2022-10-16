import { ExifParserFactory } from "ts-exif-parser";
import fs from "fs";
import { log } from "console";
import { Decimal } from "@prisma/client/runtime";

export function getLatLngFromImage(fileName: string) {
	try {
		const {
			tags: { GPSLatitude, GPSLongitude },
		} = ExifParserFactory.create(fs.readFileSync(`uploads/${fileName}`)).parse();

		return { imageLat: new Decimal(GPSLatitude), imageLng: new Decimal(GPSLongitude) };
	} catch (e) {
		log(e);
		throw new Error(e.message);
	}
}
