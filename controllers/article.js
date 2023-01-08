const user = require('../models/user');

module.exports.getUser((req, res) => {
  const id = req.user_id;

  user.findById(id).then((data) => {
    res.status(200).send({ data });
  });
});
