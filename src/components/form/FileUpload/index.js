import { Button, FormControl, FormHelperText, Grid, Stack, Typography } from "@mui/material";
import { UploadFile as UploadIcon, DeleteOutlined as DeleteIcon } from "@mui/icons-material";
import { FieldProps, getIn } from "formik";
import { useRef, useState } from "react";

// Components
import { CardImage } from "@components/image";

// Utils
import { ACCEPTED_FILE_EXTENSIONS, validateFilesForUpload } from "@utils/file-upload.util";

// Styles
import { FileUploadContainer } from "./index.styles";

const requiredFileExtensionsDescription = `${ACCEPTED_FILE_EXTENSIONS.map((extension) =>
  extension.substring(1).toUpperCase()
)
  .join(", ")
  .replace(/, ([^,]*)$/, " or $1")}`;
const allowedUploadCount = 1;

const FileUpload = (props) => {
  const {
    field,
    fullWidth,
    form: { isSubmitting, touched, errors, setFieldValue, validateField },
  } = props;

  const [selectedFile, setSelectedFile] = useState<File | null>(field.value);
  const hiddenFileInputRef = useRef<HTMLInputElement>(null);

  const helperText = `Accepted file types ${requiredFileExtensionsDescription}`;
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  const handleUploadClick = () => {
    hiddenFileInputRef.current?.click();
  };

  const handleNewFileUpload = async (files) => {
    if (!files) return;

    const errorObject = validateFilesForUpload(files, allowedUploadCount, ACCEPTED_FILE_EXTENSIONS);

    if (!errorObject) {
      const newFile = files[0];
      setSelectedFile(newFile);
      setFieldValue(field.name, newFile);
    }
  };

  const handleDraggableItem = (actionType) => (e) => {
    switch (actionType) {
      case "placed":
        e.preventDefault();
        e.stopPropagation();
        handleNewFileUpload(e.dataTransfer.files);
        break;
      case "over":
        e.preventDefault();
        e.stopPropagation();
        break;
      default:
        break;
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setFieldValue(field.name, null);
    /** validateField used to handle checking any validation when the file is removed immediately instead of waiting for the submit button to be pressed again */
    validateField(field.name);
  };

  return (
    <FormControl fullWidth={fullWidth}>
      <Stack direction="row" spacing={2} justifyContent="center" mb={1}>
        {selectedFile && (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <CardImage
                height={142}
                objectFit="contain"
                alt={selectedFile.name}
                src={URL.createObjectURL(selectedFile)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack justifyContent="center" alignItems={{ xs: "center", md: "flex-start" }}>
                <Typography>{selectedFile.name}</Typography>
                <Button disabled={isSubmitting} variant="text" onClick={removeSelectedFile} startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </Stack>
            </Grid>
          </Grid>
        )}
        {!selectedFile && (
          <FileUploadContainer
            sx={{ p: 2, flexGrow: 1 }}
            onDrop={handleDraggableItem("placed")}
            onDragOver={handleDraggableItem("over")}
          >
            <Stack alignItems="center">
              <input
                ref={hiddenFileInputRef}
                type="file"
                style={{ display: "none" }}
                accept={ACCEPTED_FILE_EXTENSIONS.join(", ")}
                onChange={(e) => handleNewFileUpload(e.target.files)}
              />
              <UploadIcon />
              <Typography>Drag and Drop here</Typography>
              <Typography>or</Typography>
              <Button variant="text" onClick={handleUploadClick}>
                Browse Files
              </Button>
            </Stack>
          </FileUploadContainer>
        )}
      </Stack>
      <FormHelperText error={showError}>{showError ? fieldError : helperText}</FormHelperText>
    </FormControl>
  );
};

export default FileUpload;
