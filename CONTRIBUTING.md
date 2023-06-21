# Contributing

Chronos encourages contributions to this product.

## Pull Requests

Chronos welcomes all pull requests.

1. Fork the repo and create a working branch from `master`.
2. If you've added any code that requires testing, add tests.
3. If you've changed APIs, update the `README.md`.
4. Check to ensure that all tests pass.
5. Make sure code is formatted with `prettier` and follows the [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/blob/master/react/README.md).
6. Create a pull request to `master`.

## Getting started
- `npm run dev:app` and `npm run dev:electron`: Run Node and Electron at the same time to start Chronos app
  - To make changes to codebase on the Main Process:
    - Files in the main process must be compiled prior to starting the app
      - In the terminal in Chronos directory, input `tsc` to compile typescript files
      - Once compiled, `npm run dev:app` and `npm run dev:electron`
      * Note: If typescript is not installed, `npm install -g typescript` 

## Chronos Website

The `chronosWebsite` branch holds the code for the website. Edit the website by checking out the branch, modifying the website, and then updating the AWS S3 bucket with the changes.
## Issues

Please do not hesitate to file issues that detail bugs or offer ways to enhace Chronos.

Chronos is based off of community feedback and is  always looking for ways to get better. The team behind Chronos is interested to hear about your experience and how we can improve it.

When submitting issues, ensure your description is clear and has instructions to be able to reproduce the issue.

## Get In Touch

We use GitHub as a platform of communication between users and developers to promote transparency, community support and feedback.
