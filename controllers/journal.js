const Journal = require('../models/journal');

module.exports = {
  index,
  show,
  new: newJournal,
  create
};

async function index(req, res) {
  try {
    const journals = await Journal.find({});
    res.render('journals/index', { title: 'Daily Journals', journals: journals });
  } catch (err) {
    console.log(err);
    res.render('error', { message: 'Error retrieving journals' });
  }
}


async function show(req, res) {
  const journal = await Journal.findById(req.params.id);
  res.render('journals/show', { title: 'Journal Detail', journal });
}

function newJournal(req, res) {
  res.render('journals/new', {
    title: 'Enter new journal',
    errorMsg: '',
    morningEntry: '',
    noonEntry: '',
    eveningEntry: ''
  });
}

async function create(req, res) {
  try {
    const journal = await Journal.create({
      title: req.body.title,
      morningEntry: req.body.morningEntry,
      noonEntry: req.body.noonEntry,
      eveningEntry: req.body.eveningEntry
    });
    res.redirect(`/journals/${journal._id}`);
  } catch (err) {
    console.log(err);
    res.render('journals/new', {
      errorMsg: err.message,
      morningEntry: req.body.morningEntry,
      noonEntry: req.body.noonEntry,
      eveningEntry: req.body.eveningEntry
    });
  }
}