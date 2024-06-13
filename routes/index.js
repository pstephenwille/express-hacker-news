var express = require('express');
const MongoClient = require('mongodb').MongoClient

var router = express.Router();

const MONGO_URL = 'mongodb://localhost:27017/hacker-news'

router.get('', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


/* GET users listing. */
router.get(`/top-stories`, async (req, res, next) => {
    const stories = await getTopStories();
    const topStoriesWithComments = await Promise.all(
        stories.map(async story => {
            const comments = await getCommentsForStory(story.id)
            story.comments = comments;

            return story;
        }));

    res.json(topStoriesWithComments);
});

const getTopStories = async () => {
    const client = await MongoClient.connect(MONGO_URL);
    const dbo = client.db();
    const foo = await dbo.collection('stories').find().toArray();
    return foo;
}
const getCommentsForStory = async (commentsParentId) => {
    const client = await MongoClient.connect(MONGO_URL);
    const dbo = client.db();
    return await dbo.collection('comments').find({parent: commentsParentId}).toArray();
}

module.exports = router;
