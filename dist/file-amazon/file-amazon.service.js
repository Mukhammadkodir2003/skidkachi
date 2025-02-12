"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileAmazonService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
let FileAmazonService = class FileAmazonService {
    constructor() {
        this.AWS_S3_BUCKET = "chelak";
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }
    async uploadFile(file) {
        console.log(file);
        const { originalname } = file;
        return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, originalname, file.mimetype);
    }
    async s3_upload(file, bucket, name, mimetype) {
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ContentType: mimetype,
            ContentDisposition: "inline",
            CreateBucketConfiguration: {
                LocationConstraint: "ap-south-1",
            },
        };
        try {
            const s3Response = await this.s3.upload(params).promise();
            return s3Response.Location;
        }
        catch (e) {
            console.log(e);
        }
    }
};
exports.FileAmazonService = FileAmazonService;
exports.FileAmazonService = FileAmazonService = __decorate([
    (0, common_1.Injectable)()
], FileAmazonService);
//# sourceMappingURL=file-amazon.service.js.map