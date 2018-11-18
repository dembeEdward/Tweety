const mime = require('mime');
const colors = require('colors');
const fs = require('fs');

const verifyPath = (path, errorDescription) => {

    let testPath = typeof path === 'string' ? path : '';

    if (!fs.existsSync(testPath)) {

        let errorMessage = typeof errorDescription === 'string' ? errorDescription : 'no file';
        console.log(errorMessage.red);
        return false;
    }

    return true;
}

const verifyIfTextFile = (path, errorDescription) => {

    let testFileTypePath = typeof path === 'string' ? path : '';

    if (mime.getType(testFileTypePath) !== 'text/plain') {

        let errorMessage = typeof errorDescription === 'string' ? errorDescription : 'not a text file';
        console.log(errorMessage.red);
        return false;
    }

    return true;
}

const verifyUsername = (username) => {

    let checkUsername = typeof username === 'string' ? username : '';

    if (/^[a-zA-Z0-9_]+$/g.test(checkUsername) && checkUsername.length > 0 && checkUsername.length <= 15) {
        return true;
    } else {
        return false;
    }
}

const verifyTweet = (tweet) => {

    let checkTweet = typeof tweet === 'string' ? tweet : '';

    if (checkTweet.length > 0 && checkTweet.length <= 140) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    verifyPath,
    verifyIfTextFile,
    verifyUsername,
    verifyTweet
}