const verify = require('./lib/verify');
const validateArguments = require('./lib/validateArguments');
const read = require('./lib/read');
const displayTweets = require('./lib/displayTweets');
const path = require('path');

const userArguments = require('yargs')
    .option('users', {
    alias: 'u',
    type: 'string',
    describe: 'path to users file location'
})
    .option('tweets', {
        alias: 't',
        type: 'string',
        describe: 'path to tweets file location'
    })
    .check(validateArguments)
    .argv;

const main = () => {

    let usersPath = "";
    let tweetsPath = "";

    try {

        usersPath = path.resolve(userArguments.users);
        tweetsPath = path.resolve(userArguments.tweets);
    } catch (e) {
        console.log('Error passing input arguments. Please start tweety with --help'.red);
        process.exit(1);
    }

    /*verify if file locations exist*/
    let isUsersPathValid = verify.verifyPath(usersPath, 'Please provide a valid users path');
    if (!isUsersPathValid) 
        process.exit(1);
    
    let isTweetsPathValid = verify.verifyPath(tweetsPath, 'Please provide a valid tweets path');
    if (!isTweetsPathValid) 
        process.exit(1);
    
    /*verify if locations contain text files*/
    let isUserFileText = verify.verifyIfTextFile(usersPath, 'Users file must be a text file');
    if (!isUserFileText) 
        process.exit(1);
    
    let isTextFileText = verify.verifyIfTextFile(tweetsPath, 'Users file must be a text file');
    if (!isTextFileText) 
        process.exit(1);
    
    /*get file content*/
    let usersFileContent = read.readFile(usersPath);
    if (usersFileContent === undefined) 
        exitWithReason('Error reading users file');
    if (usersFileContent.length === 0) 
        exitWithReason('No users avalible for tweety to sing about');
    let users = read.ReadFileContent(usersFileContent, 'follows', 'users');
    if (users.length === 0) 
        exitWithReason('No users avalible for tweety to sing about');
    
    let tweetsFileContent = read.readFile(tweetsPath);
    if (tweetsFileContent === undefined) 
        exitWithReason('Error reading tweets file');
    let tweets = read.ReadFileContent(tweetsFileContent, '> ', 'tweets');
    /*Display*/
    displayTweets(users, tweets);
}

const exitWithReason = (reason) => {

    console.log(reason.red);
    process.exit(1);
}

main();
