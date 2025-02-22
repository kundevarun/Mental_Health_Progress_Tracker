const { Client, Account } = require('appwrite');
const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67b8f1240016a05629d0');   
const account = new Account(client);

exports.login = async (req, res) => {
  try {
    const result = await account.createOAuth2Session('google');
    res.json(result); 
  } catch (error) {
    res.status(500).send(error.message);
  }
};
