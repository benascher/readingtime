chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.log('URL:', url); // Add this line
    var username = '';

    // Extract the username from the URL
    if (url.includes('instagram.com')) {
        var parts = url.split('/');
        console.log('Parts:', parts); // Add this line
        var index = parts.indexOf('www.instagram.com');
        console.log('Index:', index); // Add this line
        if (index !== -1 && index < parts.length - 1) {
            username = parts[index + 1];
        }
    }

    // Use the username in your logic
    console.log('Instagram username:', username);
    

});
console.log('Type of username:', typeof username);
console.log('1241412:');
var postIds = ['username'];

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.log('URL:', url); // Add this line
    var username = '';

    // Extract the username from the URL
    if (url.includes('instagram.com')) {
        var parts = url.split('/');
        console.log('Parts:', parts); // Add this line
        var index = parts.indexOf('www.instagram.com');
        console.log('Index:', index); // Add this line
        if (index !== -1 && index < parts.length - 1) {
            username = parts[index + 1];
        }
    }

    // Use the username in your logic
    console.log('Instagram username:', username);
    var postIds = [username]
    // Iterate over the post IDs and create table rows
    postIds.forEach(function(postId) {
        var row = document.createElement('tr');
        var cell = document.createElement('td');
        cell.textContent = postId;
        row.appendChild(cell);
        document.querySelector('tbody').appendChild(row);
    });
});