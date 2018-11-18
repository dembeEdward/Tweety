const validateArguments = (userArguments) => {

    if(!userArguments.users){
        throw(new Error('please provide users path'));
    }else if(!userArguments.tweets){
        throw(new Error('please provide tweets path'));
    }

    return true;
}

module.exports = validateArguments;