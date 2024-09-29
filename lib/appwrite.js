import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.guzzmega.aora",
    projectId: "66f980c80001eacba244",
    databaseId: "66f982c1003cae1b066e",
    userCollectionId:  "66f98327000334804201",
    videoCollectionId: "66f98342003758a3fbee",
    storageId: "66f984f1002b68f2f9d4"
};

const client = new Client();
client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform);

const account  = new Account(client)
const avatar   = new Avatars(client);
const database = new Databases(client);

export async function signUp(username, email, password) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        
        if(!newAccount) throw Error;

        const avatarUrl = avatar.getInitials(username);

        await signIn(email, password);

        return createUser(newAccount.$id, username, email, avatarUrl);

    } catch (error) {
        console.log('SignUp Error: ' + error)
    }
}

export async function signIn(email, password) {
    try {
        return await account.createEmailPasswordSession(email, password);        
    } catch (error) {
        console.log('SignIn Error: ' + error)
    }
}

export async function createUser(accountId, username, email, avatarUrl) {
    console.log('entrou createUser')
    try {
        return await database.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(), 
            {
                accountId,
                email,
                username,
                avatar: avatarUrl
            }
        )
    } catch (error) {
        console.log('CreateUser Error: ' + error)
    }
}

export async function getCurrentUser() {
    try {

        const currentAccount = await account.get();
        
        if(!currentAccount) throw Error;

        const currentUser = await database.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        
        if(!currentUser) throw Error;

        return currentUser.documents[0];

    } catch (error) {
        console.log('CurrentUser Error: ' + error)
    }
}