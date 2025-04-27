const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Directories to scan
const directories = [
  'src/components',
  'src/app'
];

// Function to update imports in a file
async function updateImports(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    
    // Skip if it's our MotionComponents file
    if (filePath.includes('MotionComponents.tsx')) {
      return;
    }
    
    // Check if the file has framer-motion imports
    if (!content.includes('framer-motion')) {
      return;
    }
    
    console.log(`Updating file: ${filePath}`);
    
    // Determine the relative path to MotionComponents
    const fileDir = path.dirname(filePath);
    const relativeToAnimations = path.relative(fileDir, 'src/components/animations');
    const relativePath = path.join(relativeToAnimations, 'MotionComponents').replace(/\\/g, '/');
    
    // Update the import statements
    let updatedContent = content.replace(
      /import\s+{([^}]+)}\s+from\s+['"]framer-motion['"]/g,
      (match, importGroup) => {
        return `import {${importGroup}} from '${relativePath}'`;
      }
    );
    
    await writeFile(filePath, updatedContent, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
  }
}

// Function to scan a directory for .tsx files
async function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await scanDirectory(fullPath);
    } else if (entry.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx'))) {
      await updateImports(fullPath);
    }
  }
}

// Main function
async function main() {
  console.log('Starting to update framer-motion imports...');
  
  for (const directory of directories) {
    await scanDirectory(directory);
  }
  
  console.log('Finished updating imports!');
}

main().catch(console.error); 