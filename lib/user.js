class User {

    constructor(username = "", follows = []) {
        this.username = username;
        this.follows = follows;
    }
}

module.exports = User;