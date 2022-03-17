import axios from 'axios';
class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }
  // Starts the upload process.
  upload() {
    console.log('this', this);
    const formData = new FormData(); // 產生表單格式
    console.log(formData);
    return new Promise((resolve) => {
      this.loader.file.then((loadFile) => {
        console.log(loadFile);
        formData.append('file-to-upload', loadFile);
        return axios
          .post(
            `${import.meta.env.VITE_APP_URL}/api/${
              import.meta.env.VITE_APP_PATH
            }/admin/upload`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          .then((res) => {
            console.log(res.data.imageUrl);
            // return res.data.imageUrl;
            resolve({
              default: res.data.imageUrl,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  }
  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}
export default MyUploadAdapter;
