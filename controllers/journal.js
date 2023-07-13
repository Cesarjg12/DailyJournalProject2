const Journal = require('../models/journal');

module.exports = {
  index,
  show,
  new: newJournal,
  create,
  edit,
  update,
  deleteJournal,
  addComment
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
  try {
    const journal = await Journal.findById(req.params.id).populate('comments');
    if (!journal) {
      throw new Error('Journal not found');
    }
    res.render('journals/show', { title: 'Journal Detail', journal });
  } catch (err) {
    console.log(err);
    res.render('error', { message: 'Error retrieving journal details', error: err });
  }
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

async function edit(req, res) {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) {
      throw new Error('Journal not found');
    }
    res.render('journals/edit', { title: 'Edit Journal', journal });
  } catch (err) {
    console.log(err);
    res.render('error', { message: 'Error retrieving journal details', error: err });
  }
}

async function update(req, res) {
  try {
    const journal = await Journal.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      morningEntry: req.body.morningEntry,
      noonEntry: req.body.noonEntry,
      eveningEntry: req.body.eveningEntry
    });
    res.redirect(`/journals/${journal._id}`);
  } catch (err) {
    console.log(err);
    res.render('error', { message: 'Error updating journal', error: err });
  }
}

async function deleteJournal(req, res) {
  try {
    await Journal.findByIdAndDelete(req.params.id);
    res.redirect('/journals');
  } catch (err) {
    console.log(err);
    res.render('error', { message: 'Error deleting journal', error: err });
  }
}

async function addComment(req, res) {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) {
      throw new Error('Journal not found');
    }
    const { content } = req.body;
    const comment = {
      content,
      user: req.user._id,
      userName: req.user.name,
      userAvatar: req.user.avatar
    };
    journal.comments.push(comment);
    await journal.save();
    res.redirect(`/journals/${journal._id}`);
  } catch (err) {
    console.log(err);
    res.render('error', { message: 'Error adding comment', error: err });
  }
}