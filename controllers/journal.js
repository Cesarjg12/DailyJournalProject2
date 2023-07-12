const Journal = require('../models/journal');
// const Performer = require('../models/performer');

module.exports = {
  index,
  show,
  new: newJournal,
  create
};

async function index(req, res) {
  const journal = await Journal.find({});
  res.render('journals/index', { title: 'Daily Journals', journals });
}

// async function show(req, res) {
//   // Populate the cast array with performer docs instead of ObjectIds
//   const journal = await Journal.findById(req.params.id).populate('cast');
//   // Mongoose query builder approach to retrieve performers not the movie:
//     // Performer.find({}).where('_id').nin(movie.cast)
//   // The native MongoDB approach uses a query object to find 
//   // performer docs whose _ids are not in the movie.cast array like this:
//   const comments = await Comments.find({ _id: { $nin: movie.cast } }).sort('name');
//   res.render('movies/show', { title: 'Movie Detail', movie, performers });
// }

function newJournal(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('journals/new', { title: 'Enter new journal', errorMsg: '' });
}

async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    // Update this line because now we need the _id of the new movie
    const journal = await Journal.create(req.body);
    // Redirect to the new movie's show functionality 
    res.redirect(`/journals/${journal._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('journals/new', { errorMsg: err.message });
  }
}