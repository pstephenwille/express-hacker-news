const axios = require('axios');
const MongoClient = require('mongodb').MongoClient

const initApp = {}
const hackerNewsBaseUrl = 'https://hacker-news.firebaseio.com/v0/';
const mongoUrl = 'mongodb://localhost:27017/hacker-news'

initApp.getHackerNewsData = async () => {
    const topItems = await getTopItems();
    const storiesData = await getStoriesForTopItems(topItems.data.splice(10));
    const stories = storiesData
        .filter(story => story.status === 'fulfilled')
        .map(story => story.value.data);
    saveAllToMongo('stories', stories);

    const storyComments = stories.flatMap(story => story.kids);

    const commentsData = await getCommentsForStories(storyComments);
    const comments = commentsData
        .filter(comment => comment.status === 'fulfilled')
        .map(comment => comment.value.data);

    saveAllToMongo('comments', comments);
}

const getTopItems = async () => {
    return await axios.get(`${hackerNewsBaseUrl}/topstories.json`);
};

const getStoriesForTopItems = async (topItems) => {
    return await Promise.allSettled(topItems.map(itemId => axios.get(`${hackerNewsBaseUrl}/item/${itemId}.json`)));
};

const getCommentsForStories = async (comments) => {
    return await Promise.allSettled(comments.map(commentId => axios.get(`${hackerNewsBaseUrl}/item/${commentId}.json`)));
};

const saveAllToMongo = async (collectionName, documentsList) => {
    const client = await MongoClient.connect(mongoUrl);
    const dbo = client.db();
    const result = await dbo.collection(collectionName).insertMany(documentsList);
}

module.exports = initApp
