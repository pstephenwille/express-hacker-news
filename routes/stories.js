var express = require('express');
const MongoClient = require('mongodb').MongoClient

var router = express.Router();

const MONGO_URL = 'mongodb://localhost:27017/hacker-news'

/* GET users listing. */
router.get(`/top-stories`, async  (req, res, next) => {
    console.log('%c...res', 'color:gold', req.query)

    const stories = await getTopStories();

    res.json(req.query);
});

const getTopStories = async () => {
    const client = await MongoClient.connect(MONGO_URL);
    const dbo = client.db();
    return dbo.collection('stories').find();
}
const getCommentsForStory = async (commentsParentId) => {
    const client = await MongoClient.connect(MONGO_URL);
    const dbo = client.db();
    return dbo.collection('comments').find({parent: commentsParentId});
}

const associateCommentsToStory = (story, comments) => {

}
module.exports = router;
