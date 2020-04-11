import { v4 as uuidv4 } from 'uuid';
import Immutable from 'seamless-immutable';

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
      'q': 'name="' + this.APP_FOLDER + '" and mimeType="application/vnd.google-apps.folder" and trashed=false',
    });

    request.execute((resp) => {
      var files = resp.files;
      if (files && files.length > 0) {
        this.appFolderId = files[0].id;
        this.checkFile();
      } else {
        this.createAppFolder();
      }
    });
  };

  checkFile = () => {
    const request = gapi.client.drive.files.list({
      'q': 'name="' + this.DOCUMENTS_FILE + '.json" and trashed=false',
      'fields': 'files(id, name)',
    });

    request.execute((resp) => {
      var files = resp.files;
      if (files && files.length > 0) {
        this.loadFile(files[0].id);
      } else {
        this.createFile();
      }
    });
  };

  createAppFolder = () => {
    const request = gapi.client.drive.files.create({
      name: this.APP_FOLDER,
      mimeType: 'application/vnd.google-apps.folder',
      fields: 'id'
    });

    request.execute((resp) => {
      if (resp.id) {
        this.appFolderId = resp.id;
        this.createFile()
      }
    });
  };

  createFile = () => {
    const request = gapi.client.drive.files.create({
      name: this.DOCUMENTS_FILE + '.json',
      mimeType: 'application/json',
      fields: 'id',
      parents: [this.appFolderId]
    });

    request.execute((resp) => {
      this.initDocumentsFile(resp.id);
    });
  };

  initDocumentsFile = fileId => {
    const content = {
      data: {
        documents: [],
        tags: [],
      },
    };

    const request = gapi.client.request({
      path: '/upload/drive/v3/files/' + fileId + '?uploadType=media',
      method: 'PATCH',
      body: JSON.stringify(content)
    });

    request.execute(() => {
      this.loadFile(fileId);
    });
  };

  loadFile = (fileId) => {
    this.documentsFileId = fileId;

    var request = gapi.client.drive.files.get({
      fileId: this.documentsFileId,
      alt: 'media'
    });

    request.execute((resp) => {
      this.data = resp.data;
      this.callback(this.data);
    });
  };

  updateDocuments = async (documents) => {
    return new Promise((resolve, reject) => {
      const content = {
        data: {
          ...this.data,
          documents: documents,
        },
      };

      const request = gapi.client.request({
        path: '/upload/drive/v3/files/' + this.documentsFileId + '?uploadType=media',
        method: 'PATCH',
        body: JSON.stringify(content)
      });

      request.execute((resp) => {
        resolve(documents);
      });
    });
  };

  saveDocument = async (data, file) => {
    const { documents } = this.data;

    const date = new Date();
    let newDocument = undefined;
    let updatedDocuments = Immutable(documents).asMutable();

    if (data.id) {
      newDocument = documents.filter((document) => {
        return document.id === data.id;
      });

      newDocument = Immutable(newDocument[0]).asMutable();

      newDocument = {
        ...newDocument,
        ...data,
        modified: date.getTime()
      };

      updatedDocuments.forEach((document, i) => {
        if (document.id === data.id) {
          updatedDocuments[i] = newDocument;
        }
      });
    } else {
      const id = uuidv4();
      const fileName = `${id}.jpg`;

      console.log(id)

      const result = await this.uploadFile(file, fileName);

      console.log(result)

      if (result) {
        newDocument = {
          id,
          ...data,
          created: date.getTime(),
          modified: date.getTime()
        };

        updatedDocuments.push(newDocument);
      }
    }

    return this.updateDocuments(updatedDocuments);
  };

  createImageData = async (appFolderId, file, fileName) => {
    return new Promise((resolve, reject) => {
      const boundary = '-------314159265358979323846';
      const delimiter = "\r\n--" + boundary + "\r\n";
      const close_delim = "\r\n--" + boundary + "--";

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const contentType = file.type || 'application/octet-stream';
        const metadata = {
          'name': fileName,
          'mimeType': contentType,
          'parents': [appFolderId]
        };
        const data = reader.result;

        let multipartRequestBody =
          delimiter + 'Content-Type: application/json\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter +
          'Content-Type: ' + contentType + '\r\n';

        //Transfer images as base64 string.
        if (contentType.indexOf('image/') === 0) {
          const pos = data.indexOf('base64,');
          multipartRequestBody += 'Content-Transfer-Encoding: base64\r\n' + '\r\n' +
            data.slice(pos < 0 ? 0 : (pos + 'base64,'.length));
        } else {
          multipartRequestBody += + '\r\n' + data;
        }
        multipartRequestBody += close_delim;

        resolve({
          headers: {
            'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
          },
          body: multipartRequestBody
        });
      };
    });
  };

  uploadFile = (file, fileName) => {
    return new Promise(async (resolve, reject) => {
      const data = await this.createImageData(this.appFolderId, file, fileName);

      const request = gapi.client.request({
        body: data.body,
        headers: data.headers,
        method: 'POST',
        params: {
          uploadType: 'multipart'
        },
        path: '/upload/drive/v3/files'
      });

      request.execute(file => {
        resolve(file);
      });
    });
  };

  deleteProject = document => {
    const { documents } = this.data;

    let updatedDocuments = Immutable(documents).asMutable();

    updatedDocuments = updatedDocuments.filter(currentDocument => {
      return currentDocument.id !== document.id;
    });

    return this.updateDocuments(updatedDocuments);
  };
}

export default new DocumentsService();