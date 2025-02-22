const { Client, Databases } = require('node-appwrite');

const client = new Client();
const databases = new Databases(client);

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67b8f1240016a05629d0');

const databaseId = 'mental_health_tracker'; 
const collectionId = 'logs_collection'; 

const addLog = async (logData) => {
  try {
    const response = await databases.createDocument(databaseId, collectionId, 'unique()', logData);
    console.log('Log added successfully:', response);
  } catch (error) {
    console.error('Error adding log:', error);
  }
};


addLog(logData);
