import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/emmanuelandela/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'jep0wuk4';


// cloudinary.config({
//   cloud_name: process.env.APP_CLOUD_NAME,
//   api_key: process.env.APP_API_KEY,
//   api_secret: process.env.APP_API_SECRET
// });

const uploadFile = (fileUpload) => {
  const formData = new FormData();
  formData.append('file', fileUpload);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('api_key', '775893692394327');
  axios({
    url: CLOUDINARY_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    },
    data: formData
  })
    .then(res => console.log(res))
    .catch(err => console.error(err));
};
export default uploadFile;
