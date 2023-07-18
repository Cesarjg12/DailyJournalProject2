# Daily Journal
**App Use:** Ever want to just jot down what you did today or ideas of what you wanna do? Well you can in three simple categories of Morning, Noon, and Evening. Feel free to write what you did or whatever you have planned and if you did not do it, you can simply edit it with the quick edit function! Changed your mind on your journal post? Go ahead and delete the post! Feel free to comment on your own posts or other people's post as well.

---

**Link to App
[Daily Journal](https://dailyjournal-6aaaa9a51646.herokuapp.com/)

---

## Home page
![home page](public/images/Homepage.png)


---

## Logged In
*Logging in will allow you to see other user's journals as well as comment on them. You can make your own journal as well.

![Journal Page](public/images/Journals.png)

---

## A posted Journal
![Journal](public/images/Testjournal.png)

---

## Code Preview
'''js
const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userAvatar: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
'''

---

## Technologies
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

**Tested on browsers**

![Google](https://img.shields.io/badge/google-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white)
![Safari](https://img.shields.io/badge/Safari-000000?style=for-the-badge&logo=Safari&logoColor=white)

---

## Future Enhancements

[Trello](https://trello.com/b/ZYImv1TB/daily-journal)
- A more energentic homepage
- Allow users to reply to comments
- Notify users if another user replied to their journal or comment