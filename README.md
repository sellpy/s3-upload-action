# s3-upload-action

This action upload a file to AWS S3

## Usage

### `workflow.yml` Example

Place in a `.yml` file such as this one in your `.github/workflows` folder. [Refer to the documentation on workflow YAML syntax here.](https://help.github.com/en/articles/workflow-syntax-for-github-actions)

```yaml
name: Upload to S3

on: [pull_request]

jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: sellpy/s3-upload-action@master
        with:
          aws_secret_access_key_id: ${{ secrets.AWS_SECRET_ACCESS_KEY_ID }}
          aws_secret_access_key: ${{ secrets.AWS_SECRET_ACCESS_KEY}}
          aws_bucket: ${{ secrets.AWS_BUCKET }}
          source_file_path: 'path/to/file.json'
          destination_file_path: 'destination/file.json'
```
## Action inputs

The following settings must be passed as environment variables as shown in the example. Sensitive information, especially `aws_key_id` and `aws_secret_access_key`, should be [set as encrypted secrets](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables) — otherwise, they'll be public to anyone browsing your repository's source code

| name                    | description                                                                                                                                                          |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `aws_secret_access_key_id`  | (Required) Your AWS Secret Access Access Key Id. |
| `aws_secret_access_key`     | (Required) Your AWS Secret Access Key. |
| `aws_bucket`                | (Required) The name of the bucket you're upload to. |
| `source_file_path`          | (Required) The local file you wish to upload to S3. |
| `destination_file_path`     | (Required) The destination path in S3 |
| `aws_region`                | (Optional) The AWS region of the bucket. Defaults to `eu-west-1` |
| `acl`                       | (Optional) The Access Control List of the uploaded object. Defaults to `public-read` |
                                                                      |