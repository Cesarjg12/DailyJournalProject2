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