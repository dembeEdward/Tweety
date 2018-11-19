const colors = require('colors');

const displayTweets = (users, tweets) => {

    if(Array.isArray(users) && Array.isArray(tweets)){
        for(let user of users){

            let username = typeof user.username === 'string' ? user.username : '';
            
            if(username){

                let viewableUsers = [username];
                let follows = user.follows;

                if(Array.isArray(follows)){
                    viewableUsers = viewableUsers.concat(follows);
                }

                let displayColour = getRandomColour();

                console.log(username[displayColour]);

                for(let tweetInfo of tweets){

                    let tweetUsername = tweetInfo.username ? tweetInfo.username : '';
                    let tweet = tweetInfo.tweet ? tweetInfo.tweet : '';

                    if(tweetUsername && tweet){
                        
                        let showTweet = viewableUsers.indexOf(tweetUsername);

                        if(showTweet > -1){
                            console.log(`   @${tweetUsername}: ${tweet}`[displayColour])
                        }
                    }
                }
            }
        }
    }
};

const getRandomColour = () => {

    let allColours = ['green', 'yellow', 'blue', 'magenta', 'cyan'];
    let randomIndex = getRandomInt(0, 4);

    return allColours[randomIndex];
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = displayTweets;
