import * as core from '@actions/core';
import * as fs from 'fs';
import * as path from 'path';
import * as tc from '@actions/tool-cache';

const versionRegex = /\b(\d+\.\d+\.\d+\.\d+)\b/;
const toolName = 'msfs-sdk';

async function run(): Promise<void> {
  try {
    const url: string = core.getInput('url');

    let toolPath: string | undefined;

    const version = versionRegex.exec(url)?.groups?.[1];
    if (version) {
      toolPath = tc.find(toolName, version);
      core.info(`Found version ${version} in cache`);
    }

    if (!toolPath) {
      core.info(`Attempting to download SDK`);

      const msfsSdkZipPath = await tc.downloadTool(url);

      core.info(`Extracting SDK`);

      const msfsSdkPath = await tc.extractZip(msfsSdkZipPath);

      core.info(`Reading version from SDK`);

      const downloadedVersion = fs
        .readFileSync(path.join(msfsSdkPath, 'version.txt'), 'utf8')
        .trim();

      if (version && version !== downloadedVersion) {
        core.warning(
          `Version mismatch: expected ${version}, got ${downloadedVersion}`
        );
      }

      core.info(`Caching SDK version ${version}`);

      toolPath = await tc.cacheDir(msfsSdkPath, toolName, downloadedVersion);
    }

    core.exportVariable('MSFS_SDK', toolPath);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
