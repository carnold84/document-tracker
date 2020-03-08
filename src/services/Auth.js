const gapi = window.gapi;

class AuthService {
  API_KEY = process.env.REACT_APP_KEY;
  CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  SECRET = process.env.REACT_APP_SECRET;

  SCOPES = [
    'https://www.googleapis.com/auth/drive'
  ];

  init = () => {
    return new Promise(resolve => {
      gapi.load('client:auth2', async () => {
        await this.onLoadSuccess();
        await this.onInitSucceed();
        resolve();
      });
    })
  };

  onLoadSuccess = async callback => {
    return await gapi.client.init({
      apiKey: this.API_KEY,
      clientId: this.CLIENT_ID,
      scope: this.SCOPES.join(',')
    });
  };

  onInitSucceed = async () => {
    const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();

    if (isSignedIn) {
      return await this.loadDriveApi();
    } else {
      return await this.signIn();
    }
  };

  signIn = async () => {
    return new Promise(resolve => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(async isSignedIn => {
        await this.loadDriveApi();
        resolve();
      });
      gapi.auth2.getAuthInstance().signIn();
    })
  };

  onInitError = error => {
    console.error(error)
  };

  loadDriveApi = async () => {
    return await gapi.client.load('drive', 'v3');
  };
}

export default new AuthService();
