module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('S3_AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('S3_AWS_ACCESS_SECRET'),
        region: env('S3_AWS_REGION'),
        params: {
          Bucket: env('S3_AWS_BUCKET'),
        },
      },
    },
  },
});
