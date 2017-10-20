const validateFileUpload = (fileUploadPath) => {
  if (fileUploadPath === '') {
    return true;
  }
  const extension = fileUploadPath.substring(
    fileUploadPath.lastIndexOf('.') + 1).toLowerCase();
  if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
    return true;
  }
  return false;
};
export default validateFileUpload;
