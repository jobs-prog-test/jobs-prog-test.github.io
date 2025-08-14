#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TARGET_REPO = 'https://github.com/jobs-prog-test/jobs-prog-test.github.io.git';
const BUILD_DIR = 'dist';
const TEMP_DIR = '.temp-deploy';

console.log('🚀 Starting deployment to jobs-prog-test.github.io...');

try {
  // Clean up any existing temp directory
  if (fs.existsSync(TEMP_DIR)) {
    console.log('🧹 Cleaning up existing temp directory...');
    execSync(`rm -rf ${TEMP_DIR}`);
  }

  // Build the project first
  console.log('🔨 Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  // Check if build was successful
  if (!fs.existsSync(BUILD_DIR)) {
    throw new Error('Build directory not found. Build may have failed.');
  }

  // Clone the target repository
  console.log('📥 Cloning target repository...');
  execSync(`git clone ${TARGET_REPO} ${TEMP_DIR}`, { stdio: 'inherit' });

  // Copy built files to the temp directory
  console.log('📋 Copying built files...');
  execSync(`cp -r ${BUILD_DIR}/* ${TEMP_DIR}/`, { stdio: 'inherit' });

  // Copy .nojekyll file if it exists
  if (fs.existsSync('.nojekyll')) {
    console.log('📄 Copying .nojekyll file...');
    execSync(`cp .nojekyll ${TEMP_DIR}/`, { stdio: 'inherit' });
  }

  // Navigate to temp directory
  process.chdir(TEMP_DIR);

  // Create and switch to gh-pages branch
  console.log('🌿 Creating gh-pages branch...');
  execSync('git checkout -b gh-pages', { stdio: 'inherit' });

  // Add all files
  console.log('➕ Adding files to git...');
  execSync('git add .', { stdio: 'inherit' });

  // Always commit and push to ensure gh-pages branch is updated
  console.log('💾 Committing changes...');
  try {
    execSync('git commit -m "Deploy to gh-pages branch"', { stdio: 'inherit' });
  } catch (error) {
    // If no changes to commit, create an empty commit
    console.log('📝 Creating empty commit...');
    execSync('git commit --allow-empty -m "Deploy to gh-pages branch"', { stdio: 'inherit' });
  }

  // Push to the repository
  console.log('📤 Pushing to repository...');
  execSync('git push origin gh-pages', { stdio: 'inherit' });

  console.log('✅ Deployment successful!');
  console.log('🌐 Your site should be available at: https://jobs-prog-test.github.io');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
} finally {
  // Clean up temp directory
  console.log('🧹 Cleaning up...');
  process.chdir('..');
  if (fs.existsSync(TEMP_DIR)) {
    execSync(`rm -rf ${TEMP_DIR}`);
  }
}
