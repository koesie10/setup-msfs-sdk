<p align="center">
  <a href="https://github.com/koesie10/setup-msfs-sdk/actions"><img alt="setup-msfs-sdk status" src="https://github.com/koesie10/setup-msfs-sdk/workflows/build-test/badge.svg"></a>
</p>

# Setup MSFS SDK Action

This action can be used to setup the MSFS SDK from a ZIP file. It will set the MSFS_SDK environment variable to the path
of the SDK.

## Usage

```yaml
steps:
- uses: koesie10/setup-msfs-sdk@v1
  with:
    url: ${{ secrets.MSFS_SDK_URL }}
```

## Code in Main

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
npm run package
git add dist
git commit -a -m "prod dependencies"
git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  url: ${{ secrets.MSFS_SDK_URL }}
```

See the [actions tab](https://github.com/koesie10/setup-msfs-sdk/actions) for runs of this action! :rocket:

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
