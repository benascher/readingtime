require("dotenv").config();
const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');

const ig = new IgApiClient();

const login = async () => {
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
}

const postToInsta = async () => {
    await login();
    const imageBuffer = await get({
        url: 'https://imgur.com/xA4wDMM.jpg',
        encoding: null, 
    });
    await ig.publish.photo({
        file: imageBuffer,
        caption: 'Really nice photo from the internet!', // nice caption (optional)
    });
}

const getFollowers = async (username) => {
    await login();
    const userId = await ig.user.getIdByUsername(username);
    const followersFeed = ig.feed.accountFollowers(userId);
    const followers = await followersFeed.items();
    console.log(`User: ${username}, Followers:`, followers.map(user => user.username));
}

//postToInsta();
getFollowers('miasecret21'); // replace <username> with the username you want to check
