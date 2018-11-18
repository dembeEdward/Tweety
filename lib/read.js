const fs = require('fs');
const User = require('./user');
const Tweet = require('./tweet');
const verify = require('./verify');

const readFile = (path) => {

    let filePath = typeof path === 'string' ? path : '';
    let file = [];

    if (path) {
        try {
            let content = fs.readFileSync(path, 'utf8');
            file = content.split(/\r?\n/);
            file = file.filter(info => {
                return info;
            });
        } catch (e) {
            file = undefined;
        }
    }

    return file;
}

const ReadFileContent = (fileContent, separatorToUse, fileType) => {

    let result = [];
    let separator = typeof separatorToUse === 'string' ? separatorToUse : '';
    let type = typeof fileType === 'string' ? fileType : '';

    if (Array.isArray(fileContent) && separator && type) {
        for (let line of fileContent) {
            if (typeof line === 'string' && line.includes(separator)) {

                let separatorIndex = line.indexOf(separator);
                let afterSeparatorIndex = separatorIndex + separator.length
                let username = line.substr(0, separatorIndex).trim();

                let userValid = verify.verifyUsername(username);
                if (userValid) {
                    afterSeparatorData = line.substr(afterSeparatorIndex, line.length);

                    if (type.toUpperCase() === 'USERS') {
                        result = getUsers(result, username, afterSeparatorData);
                    } else if (type.toUpperCase() === 'TWEETS') {
                        result = getTweets(result, username, afterSeparatorData);
                    }
                }
            }
        }
    }

    return result;
}

const getUsers = (users, username, followsData) => {

    if (Array.isArray(users) && typeof username === 'string' && typeof followsData === 'string') {

        let follows = followsData.split(',');

        follows = follows.map(info => {

            info = info.trim();
            return info;
        });

        follows = follows.filter(info => {

            return info !== '' && verify.verifyUsername(info);
        });

        let findUser = findUserInUsers(users, username);

        if (findUser === -1) {
            users.push(new User(username, follows));
        }

        for (let follow of follows) {

            let findFollowInUsers = findUserInUsers(users, follow);

            if (findFollowInUsers === -1) {
                users.push(new User(follow, []));
            }

            if (findUser > -1) {

                let usersFollows = users[findUser].follows;
                let alreadyFollowing = usersFollows.indexOf(follow);

                if (alreadyFollowing === -1) {
                    usersFollows.push(follow);
                }
            }
        }

        if (users.length > 0) {
            users = sortUsers(users);
        }
    }

    return users;
}

const findUserInUsers = (users, username) => {

    let findUser = -1;

    if (Array.isArray(users)) {
        findUser = users
            .map(info => {
            return info.username
        }).indexOf(username);
    }

    return findUser;
};

const sortUsers = (users) => {

    if (Array.isArray(users)) {

        users.sort((a, b) => {

            if (a.username && b.username) {

                let usernameA = a.username.toUpperCase();
                let usernameB = b.username.toUpperCase();

                if (usernameA < usernameB) {
                    return -1;
                }

                if (usernameA > usernameB) {
                    return 1;
                }
            }

            return 0;
        });
    }

    return users;
}

const getTweets = (tweets, username, tweetData) => {

    if(Array.isArray(tweets) && typeof username === 'string' && typeof tweetData === 'string'){
        if (verify.verifyTweet(tweetData)) {
            tweets.push(new Tweet(username, tweetData));
        }
    }

    return tweets;
}

module.exports = {
    readFile,
    ReadFileContent,
    getUsers,
    getTweets,
    findUserInUsers,
    sortUsers
};