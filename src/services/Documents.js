const gapi = window.gapi;

class DocumentsService {
  APP_FOLDER = 'DocumentTracker';
  DOCUMENTS_FILE = 'data';

  appFolderId = undefined;
  callback = undefined;
  data = undefined;
  documentsFileId = undefined;

  init = (callback) => {
    this.callback = callback;

    this.checkAppFolder();
  };

  checkAppFolder = () => {
    const request = gapi.client.drive.files.list({
      'q': `name="${this.APP_FOLDER}" and mimeType="application/vnd.google-apps.folder" and trashed=false`,
    });

    request.execute(async resp => {
      var files = resp.files;
      if (files && files.length > 0) {
        this.appFolderId = files[0].id;
        
        this.data = await this.loadFileList();
        this.callback(this.data);
      } else {
        this.createAppFolder();
      }
    });
  };

  createAppFolder = () => {
    const request = gapi.client.drive.files.create({
      name: this.APP_FOLDER,
      mimeType: 'application/vnd.google-apps.folder',
      fields: 'id',
    });

    request.execute(async resp => {
      if (resp.id) {
        this.appFolderId = resp.id;
        
        this.data = await this.loadFileList();
        this.callback(this.data);
      }
    });
  };

  loadFileList = () => {
    return new Promise((resolve, reject) => {
      const fields = [
        'createdTime',
        'description',
        'fullFileExtension',
        'id',
        'modifiedTime',
        'name',
        'properties',
        'thumbnailLink',
        'webViewLink',
      ];

      const request = gapi.client.drive.files.list({
        q:  `parents="${this.appFolderId}" and trashed=false`,
        fields: `files(${fields.join(',')})`,
      });

      request.execute(resp => {
        resolve(resp.files);
      });
    });
  };

  saveDocument = async (data, file) => {
    const result = await this.uploadFile({data, file});

    return result;
  };

  createImageData = async ({appFolderId, data, file}) => {
    return new Promise((resolve, reject) => {
      const boundary = '-------314159265358979323846';
      const delimiter = '\r\n--' + boundary + '\r\n';
      const close_delim = '\r\n--' + boundary + '--';

      const reader = new FileReader();
      reader.readAsDataURL(file);

      const {description, title, type} = data;

      reader.onload = () => {
        const contentType = file.type || 'application/octet-stream';
        const metadata = {
          description,
          name: title,
          mimeType: contentType,
          parents: [appFolderId],
          properties: {
            type,
          },
        };
        const {result} = reader;

        let multipartRequestBody =
          delimiter + 'Content-Type: application/json\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter +
          'Content-Type: ' + contentType + '\r\n';

        //Transfer images as base64 string.
        if (contentType.indexOf('image/') === 0) {
          const pos = result.indexOf('base64,');
          multipartRequestBody += 'Content-Transfer-Encoding: base64\r\n' + '\r\n' +
          result.slice(pos < 0 ? 0 : (pos + 'base64,'.length));
        } else {
          multipartRequestBody += + '\r\n' + result;
        }
        multipartRequestBody += close_delim;

        resolve({
          headers: {
            'Content-Type': `multipart/mixed; boundary="${boundary}"`,
          },
          body: multipartRequestBody,
        });
      };
    });
  };

  uploadFile = ({data, file}) => {
    return new Promise(async (resolve, reject) => {
      const {body, headers} = await this.createImageData({
        appFolderId: this.appFolderId,
        file,
        data,
      });

      const request = gapi.client.request({
        body,
        headers,
        method: 'POST',
        params: {
          uploadType: 'multipart',
        },
        path: '/upload/drive/v3/files',
      });

      request.execute(file => {
        resolve(file);
      });
    });
  };

  deleteFile = file => {};
}

export default new DocumentsService();