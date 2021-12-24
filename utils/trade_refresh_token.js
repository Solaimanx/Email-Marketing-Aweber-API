const ClientOAuth2 = require("client-oauth2");

const GetNewToken = async (oldAccessToken) => {
  const OAUTH_URL = "https://auth.aweber.com/oauth2";
  const TOKEN_URL = "https://auth.aweber.com/oauth2/token";
  const scopes = [
    "account.read",
    "list.read",
    "list.write",
    "subscriber.read",
    "subscriber.write",
    "email.read",
    "email.write",
    "subscriber.read-extended",
    "landing-page.read",
  ];

  const aweberAuth = new ClientOAuth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLINET_SECRET,
    accessTokenUri: TOKEN_URL,
    authorizationUri: `${OAUTH_URL}/authorize`,
    redirectUri: "http://localhost:4000/callback",
    scopes,
  });

  const user = await aweberAuth
    .createToken(oldAccessToken, process.env.REFRESH_TOKEN, "bearer")
    .refresh();

    const { accessToken } = user

    const newAccessToken = accessToken

    return newAccessToken

};

module.exports = { GetNewToken };
