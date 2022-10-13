import IssueModel from "../model/IssueModel";
import ImageModel from "../model/ImageModel";
import { Inject, Service } from "typedi";
import AuthModel from "../model/AuthModel";
import fs from "fs";
import config from "../config/index";
import storage from "../config/s3Config";
import { ImageFile } from "src/interface/AWS";

@Service()
class ImageService {
	@Inject("IssueModel") private issueModel: IssueModel;
	@Inject("ImageModel") private imageModel: ImageModel;
	@Inject("ImageModel") private authModel: AuthModel;

	public async uploadImageToS3(fileData: Express.Multer.File): Promise<any> {
		try {
			const fileContent: Buffer = fs.readFileSync(fileData.path);

			const params: { Bucket: string; Key: string; Body: Buffer } = {
				Bucket: config.bucketName,
				Key: fileData.originalname,
				Body: fileContent,
			};

			const result = await storage.upload(params).promise();

			const file: ImageFile = {
				link: result.Location,
				fileName: fileData.originalname,
			};
		} catch (e) {}
	}
}

export default ImageService;
