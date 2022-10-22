import * as core from '@actions/core';
import * as fs from 'fs';
import * as path from 'path';
import * as tc from '@actions/tool-cache';

async function run(): Promise<void> {
  try {
    const url: string = core.getInput('url');

    const msfsSdkZipPath = await tc.downloadTool(url);
    const msfsSdkPath = await tc.extractZip(msfsSdkZipPath);

    const version = fs
      .readFileSync(path.join(msfsSdkPath, 'version.txt'), 'utf8')
      .trim();

    const cachedPath = await tc.cacheDir(msfsSdkPath, 'msfs-sdk', version);

    core.exportVariable('MSFS_SDK', cachedPath);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
