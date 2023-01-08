const user = require("../models/user");
const { successful } = require("../utils/constants");

module.exports.getUser((req, res) => {
    const id = req.user_id;
    user.findById(id)
        .then((data) => {
            res.status(successful).send({ data });
        })
        .catch((e) => {
            if (e.statusCode === 404) {
                res.status(404).send({ message: `User not found` });
            }
        });
});
