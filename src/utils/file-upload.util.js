// Default file extensions
export const ACCEPTED_FILE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];
// Default file size allowed per file upload, 10MB
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 104857600;

/**
 * Converts a number of bytes to number of Megabytes
 * @param bytes number of bytes
 * @returns number of megabytes
 */
const convertBytesToMB = (bytes) => {
  const MEGA_BYTES_PER_BYTE = 1048576;
  return Math.round(bytes / MEGA_BYTES_PER_BYTE);
};

// Map for the different types of errors a file upload may encounter
const errorTypesMap = {
  tooLarge: (fileSize) => ({
    message: "File Size Is Too Large",
    details: `The maximum file size is ${convertBytesToMB(fileSize)} MB.`,
  }),
  typeNotValid: (requiredTypes) => ({
    message: "File Type not Accepted",
    details: `File type is not accepted. Please upload a ${requiredTypes}`,
  }),
  tooManyDocs: () => ({
    message: "Multiple Files Detected",
    details: "Only one file may be uploaded.",
  }),
};

/**
 * Dynamically creates a regex to check file type from array of accepted file types
 * @param requiredTypes array of allowed file types for upload
 * @returns regex
 */
function buildFileTypeRegex(requiredTypes) {
  let formattedRequiredTypes = requiredTypes.map((t) => `\\${t}`).join("|");
  formattedRequiredTypes = `(${formattedRequiredTypes})$`;
  return new RegExp(formattedRequiredTypes, "i");
}

/**
 * Validates files available for upload, checks by file type, file size, and number of files
 * @param newFiles array of new files for upload
 * @param allowedNumberOfFiles number of allowed uploads
 * @param requiredTypes array of allowed file types for upload
 * @param maxFileSizeInBytes max file size allowed for upload, defaults to 52428800 (50MB)
 * @returns errorObject - error object to display
 */
const validateFilesForUpload = (
  newFiles,
  allowedNumberOfFiles,
  requiredTypes,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES
) => {
  let errorObject;
  let regexFileType;

  if (requiredTypes) {
    regexFileType = buildFileTypeRegex([...requiredTypes]);
  }

  for (let i = 0; i < newFiles.length; i++) {
    const file = newFiles[i];
    if (allowedNumberOfFiles && i > allowedNumberOfFiles - 1) {
      return errorTypesMap.tooManyDocs();
    }
    if (regexFileType && !regexFileType.exec(file.name)) {
      const typesStringified = `${requiredTypes.slice(0, requiredTypes.length - 1).join(", ")} or ${
        requiredTypes[requiredTypes.length - 1]
      }`;
      return errorTypesMap.typeNotValid(typesStringified);
    }
    if (file.size > maxFileSizeInBytes) {
      return errorTypesMap.tooLarge(maxFileSizeInBytes);
    }
  }
  return null;
};

export { DEFAULT_MAX_FILE_SIZE_IN_BYTES, convertBytesToMB, buildFileTypeRegex, validateFilesForUpload };
