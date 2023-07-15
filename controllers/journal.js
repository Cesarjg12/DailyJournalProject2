const Journal = require('../models/journal');
const User = require('../models/user');

module.exports = {
  index,
  show,
  new: newJournal,
  create,
  edit,
  update,
  deleteJournal,
  addComment,
  deleteComment
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
    const journal = await Journal.findById(req.params.id)
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'User'
        }
      })
      .populate('user')
      .exec();

    if (!journal) {
      throw new Error('Journal not found');
    }

    res.render('journals/show', { title: 'Journal Detail', journal, user: req.user });
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
      eveningEntry: req.body.eveningEntry,
      user: req.user._id
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
    const journal = await Journal.findById(req.params.id).populate('user');

    if (!journal) {
      throw new Error('Journal not found');
    }

    // Check if user owns the journal
    if (!journal.user || journal.user._id.toString() !== req.user._id.toString()) {
      throw new Error('Unauthorized');
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
    const journalId = req.params.id;

    const journal = await Journal.findById(journalId);

    if (!journal) {
      throw new Error('Journal not found');
    }

    // Check if user owns the journal
    if (!journal.user.equals(req.user._id)) {
      throw new Error('Unauthorized');
    }

    await Journal.findByIdAndDelete(journalId);
    res.redirect('/journals');
  } catch (err) {
    console.log(err);
    res.render('error', { message: 'Error deleting journal', error: err });
  }
}

async function addComment(req, res) {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const journal = await Journal.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            content,
            user: req.user._id,
            userName: req.user.name,
            userAvatar: req.user.avatar,
          },
        },
      },
      { new: true }
    ).populate('comments.user');

    if (!journal) {
      throw new Error('Journal not found');
    }

    res.redirect(`/journals/${journal._id}`);
  } catch (err) {
    console.log(err);
    res.render('error', { message: 'Error adding comment', error: err });
  }
}


async function deleteComment(req, res) {
  try {
    const journalId = req.params.id;
    const commentId = req.params.commentId;

    const journal = await Journal.findById(journalId);

    if (!journal) {
      throw new Error('Journal not found');
    }

    const comment = journal.comments.find((c) => c._id.equals(commentId));

    if (!comment) {
      throw new Error('Comment not found');
    }

    // Checks that the comment is = to same user
    if (!comment.user.equals(req.user._id)) {
      throw new Error('Unauthorized');
    }

    // Removes a comment from the array
    journal.comments = journal.comments.filter((c) => !c._id.equals(commentId));
    await journal.save();

    res.redirect(`/journals/${journalId}`);
  } catch (err) {
    console.log(err);
    res.render('error', { message: 'Error deleting comment', error: err });
  }
}