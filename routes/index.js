var express = require('express');
const MongoClient = require('mongodb').MongoClient

var router = express.Router();

const MONGO_URL = 'mongodb://localhost:27017/hacker-news'

router.get('', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


/* GET users listing. */
router.get(`/top-stories`, async (req, res, next) => {
    let {pageNumber, pageSize} = req.query;
    pageNumber = parseInt(pageNumber, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 10;
    let paginatedResp = {pageNumber, pageSize, totalCount:0}
    const stories = await getTopStories(pageNumber, pageSize);
    const topStoriesWithComments = await Promise.all(
        stories[0].data.map(async story => {
            const comments = await getCommentsForStory(story.id)
            story.comments = comments;

            return story;
        }));
    paginatedResp = {
        pagination: {...paginatedResp, totalCount: stories[0].metadata[0].totalCount},
        data: topStoriesWithComments
    };

    res.json(paginatedResp);
});

const getTopStories = async (page, pageSize) => {
    const client = await MongoClient.connect(MONGO_URL);
    const dbo = client.db();
    const stories = await dbo.collection('stories').aggregate([
        {
            $facet: {
                metadata: [{$count: 'totalCount'}],
                data: [{$skip: (page - 1) * pageSize}, {$limit: pageSize}],
            },
        },
    ]).toArray();

    // const stories = await dbo.collection('stories').find().toArray();

    return stories;
}
const getCommentsForStory = async (commentsParentId) => {
    const client = await MongoClient.connect(MONGO_URL);
    const dbo = client.db();
    return await dbo.collection('comments').find({parent: commentsParentId}).toArray();
}

module.exports = router;
