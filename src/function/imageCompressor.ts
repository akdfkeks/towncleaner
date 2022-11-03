import sharp from "sharp";
import fs from "fs";

export async function compressImage(fileName: string, width: number) {
	try {
		return new Promise((resolve, reject) => {
			sharp(`uploads/origin/${fileName}`)
				.resize({ width })
				.withMetadata()
				.toBuffer((err, data) => {
					if (err) reject();
					fs.writeFileSync(`uploads/comp/${fileName}`, data);
					resolve(true);
				});
		});
	} catch (err) {
		console.log(err);
		throw err;
	}
}
