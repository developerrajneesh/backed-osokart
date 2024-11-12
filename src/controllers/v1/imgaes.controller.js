const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
async function getfiles(req, res) {
  // Get the file name from the URL
  const possibleExtensions = [
    ".jpg",
    ".jpeg",
    ".pdf",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
  ];
  const fileName = req.params.name;

  // Construct the file paths with possible extensions
  const possiblePaths = possibleExtensions.map((ext) =>
    path.join(__dirname, "../../", "images", fileName + ext)
  );

  // Check each possible path until we find the file
  let fileFound = false;
  for (const imagePath of possiblePaths) {
    if (fs.existsSync(imagePath)) {
      fileFound = true;
      // Use res.sendFile to send the file directly
      res.sendFile(imagePath, {
        headers: {
          "Content-Type": mime.lookup(imagePath) || "application/octet-stream",
        },
      });
      break;
    }
  }

  // If no file is found, send a 404 response
  if (!fileFound) {
    res.status(404).send("File not found");
  }
}
module.exports = { getfiles };
