const jwt = require("jsonwebtoken");

module.exports = (user: any) => {
    if(user) {
        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET,
            {

            }
        );

        return token;
    } else {
        return null;
    }
};
