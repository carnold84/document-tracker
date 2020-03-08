const gapi = window.gapi;

class AuthService {
  API_KEY = process.env.REACT_APP_KEY;
  CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  SECRET = process.env.REACT_APP_SECRET;

  SCOPES = [
    'https://www.googleapis.com/auth/drive'
  ];

  init = callback => {
    console.log(this.API_KEY)
    gapi.load('client:auth2', () => {
      this.onLoadSuccess(callback);
    });
  };

  onLoadSuccess = async callback => {
    await gapi.client.init({
      apiKey: this.API_KEY,
      clientId: this.CLIENT_ID,
      scope: this.SCOPES.join(',')
    });

    this.onInitSucceed(callback);
  };

  onInitSucceed = callback => {
    const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();

    if (isSignedIn) {
      this.loadDriveApi(isSignedIn, callback);
    } else {
      gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => {
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
