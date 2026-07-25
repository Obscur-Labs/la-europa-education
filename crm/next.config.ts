import path from 'node:path';
import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  // Dependencies are hoisted to the workspace root, so file tracing must start
  // there — otherwise hoisted packages are missed in the build output.
  outputFileTracingRoot: path.join(process.cwd(), '..'),
};

export default config;
