import * as AWS from "aws-sdk";
export declare class FileAmazonService {
    AWS_S3_BUCKET: string;
    s3: AWS.S3;
    uploadFile(file: any): Promise<string | undefined>;
    s3_upload(file: any, bucket: any, name: any, mimetype: any): Promise<string | undefined>;
}
