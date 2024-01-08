require("dotenv").config();
const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const fs = require('fs');

const postToInsta = async () => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    const imageBuffer = await get({
        url: 'https://i.imgur.com/ENnhQXm.jpg',
        encoding: null, 
    });
    await ig.publish.photo({
        file: imageBuffer,
        caption: 'Really nice photo from the internet!', // nice caption (optional)
    });
}
const getFollowers = async (username) => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    const userId = await ig.user.getIdByUsername(username);
    const followersFeed = ig.feed.accountFollowers(userId);
    const followers = await followersFeed.items();
    console.log(`User: ${username}, Followers:`, followers.map(user => user.username));
}
getFollowers('miasecret21'); // replace <username> with the username you want to check
console.log('test');
// Create a new file called miaFollowers.txt and write "text" to it
fs.writeFile('miaFollowers.txt', 'text', function(err) {
    if (err) {
        console.log(err);
    }
}   );
