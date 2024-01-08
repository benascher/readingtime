const { IgApiClient } = require('instagram-private-api');

// Define the extension function
async function getHighestLikedPost() {
    // Create a new instance of the Instagram API client
    const ig = new IgApiClient();
    
    // Login to Instagram
    await ig.login('your_username', 'your_password');

    // Fetch the user's posts
    const userFeed = ig.feed.user(ig.state.cookieUserId);
    const posts = await userFeed.items();

    // Calculate the highest liked post
    let highestLikedPost = null;
    let highestLikes = 0;
    for (const post of posts) {
        if (post.like_count > highestLikes) {
            highestLikedPost = post;
            highestLikes = post.like_count;
        }
    }

    // Return the highest liked post
    return highestLikedPost;
}

// Export the extension function
module.exports = getHighestLikedPost;
