const Journal = require('../models/journal');

module.exports = {
    create,
    delete: deleteReview
};


async function deleteReview(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    const journal = await Journal.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
    // Rogue user!
    if (!journal) return res.redirect('/journals');
    // Remove the review using the remove method available on Mongoose arrays
    journal.reviews.remove(req.params.id);
    // Save the updated movie doc
    await journal.save();
    // Redirect back to the movie's show view
    res.redirect(`/journals/${journal._id}`);
  }

async function create(req, res) {
    const journal = await Journal.findById(req.params.id);
  
    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
  
    // We can push (or unshift) subdocs into Mongoose arrays
    journal.reviews.push(req.body);
    try {
      // Save any changes made to the movie doc
      await journal.save();
    } catch (err) {
      console.log(err);
    }
    res.redirect(`/journal/${journal._id}`);
  }