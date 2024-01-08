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
const getFollowers1 = async (username) => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    const userId = await ig.user.getIdByUsername(username);
    const followersFeed = ig.feed.accountFollowers(userId);
    const followers = await followersFeed.items();
    //console.log(`User: ${username}, Followers:`, followers.map(user => user.username));
    const followerUsernames = followers.map(user => user.username);
    
    // Write follower usernames to a file
    fs.writeFile('onlyfansgirlsFollowers.txt', followerUsernames.join('\n'), function(err) {
        if (err) {
            console.log(err);
        }
    });
}
const getFollowers = async (username) => {
    //await login();
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    const userId = await ig.user.getIdByUsername(username);
    const followersFeed = ig.feed.accountFollowers(userId);
    let followers = [];
    let moreAvailable = true;
    while (moreAvailable) {
        try {
            const items = await followersFeed.items();
            followers = followers.concat(items);
            moreAvailable = followersFeed.isMoreAvailable();
            await new Promise(resolve => setTimeout(resolve, 5000)); // wait 5 seconds before fetching next batch
        } catch (error) {
            if (error.name === 'IgActionSpamError') {
                console.log('Rate limit hit, waiting for 60 seconds');
                await new Promise(resolve => setTimeout(resolve, 60000)); // wait 60 seconds
            } else {
                throw error;
            }
        }
    }
    
    const followerUsernames = followers.map(user => user.username);
    console.log(`User: ${username}, Followers:`, followerUsernames);
    fs.writeFile('onlyfansgirlsFollowers.txt', followerUsernames.join('\n'), function(err) {
        if (err) {
            console.log(err);
        }
    });
}
getFollowers('onlyfans._girls_'); // replace <username> with the username you want to check
console.log('test');

