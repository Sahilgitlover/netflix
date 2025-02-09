const fs = require("fs");
const path = require("path");

const USER_GIVEN_FILENAME = process.argv[2] || "output";

function copyDirectory(src, dest) {
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true }); // Create destination directory if it doesn't exist
	}

	fs.readdirSync(src).forEach((file) => {
		const srcPath = path.join(src, file);
		const destPath = path.join(dest, file);

		if (fs.lstatSync(srcPath).isDirectory()) {
			copyDirectory(srcPath, destPath); // Recursively copy subdirectories
		} else {
			fs.copyFileSync(srcPath, destPath); // Copy files
		}
	});

	console.log(`Copied ${src} to ${dest}`);
}
console.log("Copying the dist to dist_copy");

copyDirectory(
	path.join(__dirname, "./dist"),
	path.join(__dirname, "./dist_copy")
);

// Read the input HTML file (modify 'index.html' to your actual file name)
const htmlFilePath = path.join(__dirname, "./dist_copy/index.html");
let htmlContent = fs.readFileSync(htmlFilePath, "utf8");

// Update the <script> src and <link> href paths
try {
	htmlContent = htmlContent.replace(
		/(src|href)=["']\/assets\/(.*?)["']/g,
		(match, attr, filename) =>
			`${attr}="/${USER_GIVEN_FILENAME}_assets/${filename}"`
	);
} catch (error) {
	console.error("Failed to rename asset paths");
}
try {
	htmlContent = htmlContent.replace(
		/<link\s+rel=\"icon\"[^>]*?href=\"\/Logo\.(.*?)\"/g,
		(match, ext) =>
			`<link rel="icon" type="image/svg+xml" href="/${USER_GIVEN_FILENAME}.${ext}"`
	);
} catch (error) {
	console.error("Failed to rename icon path");
}

// Write the modified HTML back to the file
fs.writeFileSync(htmlFilePath, htmlContent, "utf8");

console.log("Updated asset and icon paths");

fs.renameSync(
	path.join(__dirname, "./dist_copy/assets"),
	path.join(__dirname, `./dist_copy/${USER_GIVEN_FILENAME}_assets`)
);

console.log("Renamed assets folder");

try {
	console.log("Changing the file names inside dist_copy...");
	const filenames = fs.readdirSync(path.join(__dirname, "./dist_copy"));
	filenames.forEach((oldName) => {
		for (let i = 0; i < oldName.length; ++i) {
			if (oldName.at(i) == ".") {
				const newName = (strAfter1stDot =
					USER_GIVEN_FILENAME + "." + oldName.substring(i + 1, oldName.length));
				fs.renameSync(
					path.join(__dirname, `./dist_copy/${oldName}`),
					path.join(__dirname, `./dist_copy/${newName}`)
				);

				break;
			}
		}
	});
} catch (error) {}

console.log("Checking if previous build exists...");

if (fs.existsSync(path.join(__dirname, "#SUNU_OS_dist"))) {
	console.log("Removing previous build...");
	fs.rmSync(path.join(__dirname, "#SUNU_OS_dist"), {
		recursive: true,
		force: true,
	});

	console.log("Removed previous build");
} else console.log("Previous build does not exist...");

fs.renameSync(
	path.join(__dirname, "./dist_copy"),
	path.join(__dirname, `./#SUNU_OS_dist`)
);

console.log("Renamed dist folder");
