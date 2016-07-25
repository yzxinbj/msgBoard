module.exports = {
    Comment: {
        name: {type: String, require: true},
        email: {type: String, require: true},
        title: {type: String, require: true},
        comment: {type: String, require: true},
        createAt: {type: Date, default: Date.now}
    }
};
