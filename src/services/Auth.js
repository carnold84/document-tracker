const gapi = window.gapi;

class AuthService {
  API_KEY = 'AIzaSyBbFeqijKbGKfv8IRYMIcO037xlI6d1NGc';
  CLIENT_ID = '336672386049-379vq0uvqrbivmt6qjck5ski62s4oclg.apps.googleusercontent.com';
  SECRET = 'BTtLJOZzBe0KsQQiTif6mmCC';

  SCOPES = [
    'https://www.googleapis.com/auth/drive.metadata.readonly'
  ];

  init = callback => {
    console.log('init')
    gapi.load('client:auth2', () => {
      this.onLoadSuccess(callback);
    });
  };

  onLoadSuccess = async callback => {
    console.log('onLoadSuccess')
    await gapi.client.init({
      apiKey: this.API_KEY,
      clientId: this.CLIENT_ID,
      scope: this.SCOPES.join(',')
    });
    console.log('api init')
    //callback(true);
    this.onInitSucceed(callback);
  };

  onInitSucceed = callback => {
    console.log('onInitSucceed')
    const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();

    if (isSignedIn) {
      this.loadDriveApi(isSignedIn, callback);
    } else {
      gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => {
        console.log('isSignedIn', isSignedIn)
        this.loadDriveApi(isSignedIn, callback);
      });
      gapi.auth2.getAuthInstance().signIn();
    }
  };

  onInitError = error => {
    console.error(error)
  };

  loadDriveApi = (result, callback) => {
    gapi.client.load('drive', 'v3', () => {
      this.driveApiLoaded(result, callback);
    });
  };

  driveApiLoaded = (result, callback) => {
    callback(result);
  };
}

export default new AuthService();
