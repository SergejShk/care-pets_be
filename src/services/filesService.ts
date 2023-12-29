import { Endpoint, S3 } from "aws-sdk";

import { IS3PresignedPostResponse } from "../interface/files";

export class FilesService {
  private endpoint: Endpoint;
  private S3: S3;
  private bucketName: string;

  constructor() {
    this.endpoint = new Endpoint(`s3.${process.env.S3_REGION}.amazonaws.com`);
    this.S3 = new S3({
      endpoint: this.endpoint,
      apiVersion: "2012-10-17",
      region: process.env.S3_REGION,
    });
    this.bucketName = process.env.S3_BUCKET_NAME || "";
  }

  public createPresignedPost = async (
    key: string,
    type: string,
  ): Promise<IS3PresignedPostResponse> => {
    const result = await this.S3.createPresignedPost({
      Bucket: this.bucketName,
      Fields: {
        key: `${key}-${+new Date()}.${type.split("/").pop()}`,
        "Content-Type": type,
      },
      Conditions: [{ "Content-Type": type }],
      Expires: 600,
    });

    return result as unknown as IS3PresignedPostResponse;
  };
}
