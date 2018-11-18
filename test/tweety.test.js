const chai = require('chai');
const expect = chai.expect;

const verify = require('../lib/verify');
const read = require('../lib/read');
const User = require('../lib/user');
const Tweet = require('../lib/tweet');

describe('Verify file location', function(){
    it('file does not exist', function(){
       let isValid = verify.verifyPath('whatFile', 'file does not exist');
       expect(isValid).to.equal(false);
    });

    it('file does exist', function(){
        let isValid = verify.verifyPath('tweet.txt', 'file does not exist');
        expect(isValid).to.equal(true);
    });

    it('file path format is incorrect', function(){
        let isValid = verify.verifyPath('@eu\\!/df-+^---///', 'file does not exist');
        expect(isValid).to.equal(false);
    });

    it('no file path provided', function(){
        let isValid = verify.verifyPath(undefined, 'no file path');
        expect(isValid).to.equal(false);
    });

    it('no error description provided', function(){
        let isValid = verify.verifyPath('tweet.txt');
        expect(isValid).to.equal(true);
    }); 

    it('no parameters provided', function(){
        let isValid = verify.verifyPath();
        expect(isValid).to.equal(false);
    }); 
});

describe('Verify if file is a text file', function(){
    it('file is not a text file', function(){
        let isText = verify.verifyIfTextFile('package.json', 'file is not a text file');
        expect(isText).to.equal(false);
    });

    it('file is a text file', function(){
        let isText = verify.verifyIfTextFile('user.txt', 'file is not a text file');
        expect(isText).to.equal(true);
    });

    it('file path format is incorrect', function(){
        let isText = verify.verifyIfTextFile('@eu\\!/df-+^---///', 'path is not valid');
        expect(isText).to.equal(false);
    });

    it('no file path provided', function(){
        let isText = verify.verifyIfTextFile(undefined, 'no file path');
        expect(isText).to.equal(false);
    });

    it('no error description provided', function(){
        let isText = verify.verifyIfTextFile('tweet.txt');
        expect(isText).to.equal(true);
    }); 

    it('no parameters provided', function(){
        let isText = verify.verifyIfTextFile();
        expect(isText).to.equal(false);
    }); 
});

describe('verify username', function(){
    it('valid username', function(){
        
        let result = verify.verifyUsername('Superman');
        expect(result).to.equal(true);
    });

    it('username with special characters', function(){

        let result = verify.verifyUsername('Superman@$');
        expect(result).to.equal(false);
    });

    it('username with more than 15 characters', function(){

        let result = verify.verifyUsername('this_is_more_than_15_characters');
        expect(result).to.equal(false);
    });

    it('username is undefined', function(){

        let result = verify.verifyUsername();
        expect(result).to.equal(false);
    });

    it('username is not a string', function(){

        let result = verify.verifyUsername(888);
        expect(result).to.equal(false);
    });
});

describe('verify tweet', function(){

    it('tweet is valid', function(){

        let result = verify.verifyTweet('sing tweety sing');
        expect(result).to.equal(true);
    });

    it('tweet with 0 characters', function(){

        let result = verify.verifyTweet('');
        expect(result).to.equal(false);
    });

    it('tweet with more than 140 characters', function(){

        let tweet = `Names are random, constructed from real first and last names. 
        Company names are real, but are randomized along with street addresses and do not 
        represent actual locations. City, County, State/Province, and ZIP/Postal are correct for each record.  
        Phone and fax numbers are random, but the area code and exchange for each are correct for their location.`;

        let result = verify.verifyTweet('');
        expect(result).to.equal(false);
    });

    it('no parameters passed', function(){

        let result = verify.verifyTweet();
        expect(result).to.equal(false);
    });
});

describe('read file', function(){
    it('file exists', function(){
        let file = read.readFile('user.txt');
        expect(file).to.be.an('array').that.is.not.empty;
    });

    it('file does not exist', function(){
        let file = read.readFile('us.txt');
        expect(file).to.be.undefined;
    });

    it('file is blank', function(){
        let file = read.readFile('test/sampleBlankFile.txt');
        expect(file).to.be.an('array').that.is.empty;
    });
});

describe('find user in users', function(){

    let users = [
        new User('Superman', ['Batman']),
        new User('Batman', []),
        new User('The_Flash', ['Batman'])
    ];

    it('username is within users', function(){

        let result = read.findUserInUsers(users, 'Batman');
        expect(result).to.be.greaterThan(-1);
    });

    it('username is not within users', function(){

        let result = read.findUserInUsers(users, 'Aquaman');
        expect(result).to.equals(-1);
    });

    it('username is undefined', function(){

        let result = read.findUserInUsers(users);
        expect(result).to.equals(-1);
    });

    it('users is not an array', function(){

        let result = read.findUserInUsers({}, 'Batman');
        expect(result).to.equals(-1);
    });

    it('no parameters passed', function(){

        let result = read.findUserInUsers();
        expect(result).to.equals(-1);
    })
});

describe('sort users array', function(){

    it('users sorted in ascending order of username', function(){

        let users = [
            new User('Superman', ['Batman']),
            new User('Batman', []),
            new User('Wonder_Woman', ['Batman'])
        ];

        let result = read.sortUsers(users);
        expect(result).to.be.an('array').that.is.not.empty;
        expect(result.length).to.equals(3);
        expect(result[0].username).to.equals('Batman');
        expect(result[1].username).to.equals('Superman');
        expect(result[2].username).to.equals('Wonder_Woman');
    });

    it('users of wrong format passed', function(){

        let users = [1, 2, 4, 9];

        let result = read.sortUsers(users);
        expect(result).to.be.an('array').that.is.not.empty;
        expect(result.length).to.equals(4);
    });

    it('no parameters passed', function(){

        let result = read.sortUsers();
        expect(result).to.be.undefined;
    });

    it('users is not an array', function(){

        let result = read.sortUsers("test");
        expect(result).to.equal("test");
    });

});

describe('get users', function(){

    const username = 'Wonder_Woman';
    const followsData = 'Supergirl, Batman';

    it('add data to users', function(){

        let users = [];
        let result = read.getUsers(users, username, followsData);
        expect(result).to.be.an('array').that.is.not.empty;
        expect(result.length).to.equals(3);
        expect(users[0]).to.have.property('username');
        expect(users[0]).to.have.property('follows');
        expect(users[0].follows).to.be.an('array');
        expect(users[0].username).to.be.a('string');
    });

    it('result ordered by username', function(){

        let users = [];
        let result = read.getUsers(users, username, followsData);
        expect(users[0].username).to.equals('Batman');
        expect(users[1].username).to.equals('Supergirl');
        expect(users[2].username).to.equals('Wonder_Woman');
    });

    it('Exsisting user is not added more than once', function(){

        let users = [
            new User('Wonder_Woman', [])
        ];
        let customFollowsData = 'Batman';
        let result = read.getUsers(users, username, customFollowsData);
        expect(result).to.be.an('array').that.is.not.empty;
        expect(result.length).to.equals(2);
    });

    it('New user added from follow data is added with no follows', function(){

        let users = [
            new User('Wonder_Woman', [])
        ];
        let customFollowsData = 'Batman';
        let result = read.getUsers(users, username, customFollowsData);
        expect(result[0].follows).to.be.an('array').that.is.empty;
    });

    it('Follows does not duplicate username', function(){

        let users = [
            new User('Batman', []),
            new User('Wonder_Woman', ['Batman'])
        ];
        let customFollowsData = 'Batman';
        let result = read.getUsers(users, username, customFollowsData);
        expect(result[1].follows).to.be.an('array').that.is.not.empty;
        expect(result[1].follows.length).to.equals(1);
    });

    it('Users is not an array', function(){

        let users = "Batman";
        let customFollowsData = 'Batman';
        let result = read.getUsers(users, username, customFollowsData);
        expect(result).to.equal(users);
    });

    it('username is not a string', function(){

        let users = [
            new User('Batman', []),
            new User('Wonder_Woman', ['Batman'])
        ];
        let customFollowsData = 'Batman';
        let result = read.getUsers(users, 1, customFollowsData);
        expect(result).to.deep.equal(users);
    });

    it('follows data is not a string', function(){

        let users = [
            new User('Batman', []),
            new User('Wonder_Woman', ['Batman'])
        ];
        let customFollowsData = 'Batman';
        let result = read.getUsers(users, username, 1);
        expect(result).to.deep.equal(users);
    });

    it('no parameters passed', function(){

        let result = read.getUsers();
        expect(result).to.be.undefined;
    });
});

describe('get tweets', function(){

    let username = 'Batman';
    let tweetData = 'I am Batman';

    it('add a tweet', function(){

        let tweets = [];
        let result = read.getTweets(tweets, username, tweetData);

        expect(result).to.be.an('array').that.is.not.empty;
        expect(result.length).to.equal(1);
        expect(result[0]).to.have.property('username');
        expect(result[0]).to.have.property('tweet');
        expect(result[0].username).to.equal(username);
        expect(result[0].tweet).to.equal(tweetData);
    });

    it('tweets is not an array', function(){

        let tweets = 1;
        let result = read.getTweets(tweets, username, tweetData);

        expect(result).to.equal(tweets);
    });

    it('username is not a string', function(){

        let tweets = [];
        let result = read.getTweets(tweets, 1, tweetData);

        expect(result).to.be.an('array').that.is.empty;
    });

    it('tweet data is not a string', function(){

        let tweets = [];
        let result = read.getTweets(tweets, username, 1);

        expect(result).to.be.an('array').that.is.empty;
    });

    it('no parameters passed', function(){

        let result = read.getTweets();
        expect(result).to.be.undefined;
    });
});

describe('read file content', function(){

    const usersFileContent = [
        'Superman follows Batman',
        'Wonder_Woman follows Supergirl',
        'Superman follows The_Flash, Green_Arrow, Aquaman',
        'Batman follows Batman'
    ];

    const tweetsFileContent = [
        'Superman> Having a kyrptonight of a day',
        'Wonder_Woman> Batman can you not please',
        'Batman> I am BATMAN',
    ];

    it('content of users', function(){
        
        let users = read.ReadFileContent(usersFileContent, 'follows', 'users');
        expect(users).to.be.an('array').that.is.not.empty;
        expect(users[0]).to.have.property('username');
        expect(users[0]).to.have.property('follows');
        expect(users[0].follows).to.be.an('array');
        expect(users[0].username).to.be.a('string');
        expect(users.length).to.equal(7);
    });

    it('content of tweets', function(){

        let tweets = read.ReadFileContent(tweetsFileContent, '> ', 'tweets');
        expect(tweets).to.be.an('array').that.is.not.empty;
        expect(tweets[0]).to.have.property('username');
        expect(tweets[0]).to.have.property('tweet');
        expect(tweets[0].username).to.be.a('string');
        expect(tweets[0].tweet).to.be.a('string');
        expect(tweets.length).to.equal(3);
    });

    it('content is not an array', function(){

        let result = read.ReadFileContent({}, 'follows', 'users');
        expect(result).to.be.an('array').that.is.empty;
    });

    it('separator is not a string', function(){

        let result = read.ReadFileContent(usersFileContent, 1, 'users');
        expect(result).to.be.an('array').that.is.empty;
    });

    it('file type is not a string', function(){

        let result = read.ReadFileContent(usersFileContent, 'follows', 1);
        expect(result).to.be.an('array').that.is.empty;
    });

    it('no parameters are passed', function(){

        let result = read.ReadFileContent();
        expect(result).to.be.an('array').that.is.empty;
    });

    it('content with line without separator', function(){

        let content = [...tweetsFileContent];

        content.push('This line has no separator');
        content.push('This>line');

        let result = read.ReadFileContent(content, '> ', 'tweets');
        expect(result).to.be.an('array').that.is.not.empty;
        expect(result.length).to.be.equal(3);
    });
});