import React, {useEffect, useState} from 'react';

export const TopStories = () => {
    const [stories, setStories] = useState([])
    const [commentsForStoryId, setCommentsForStoryId] = useState(0);
    const [toggleComments, setToggleComments] = useState(false);

    const buildStoriesUI = () => {
        if (!stories || !stories.length) return ''

        return stories.map((story: any, idx) => {
            return (
                <div key={String(idx)} className={'story'}>
                    <ul>
                        <li><span className={'label'}>Title:</span> {story.title}</li>
                        <li><span className={'label'}>By:</span> {story.by}</li>
                        <li><span className={'label'}>URl:</span>{story.url}</li>
                    </ul>
                    {buildCommentsUI(story.id, story.comments)}
                </div>
            )
        })
    }

    const buildCommentsUI = (storyId: number, comments: any) => {
        return (
            <div className={'comments'}>
                <button onClick={() => {
                    setCommentsForStoryId(storyId);
                    setToggleComments(!toggleComments)
                }}>Click for Comments
                </button>
                {((commentsForStoryId === storyId) && toggleComments)
                    ? comments.map((comment: any, idx: number) => {
                            return (
                                <ul key={String(idx)}>
                                    <li><span className={'label'}> By: </span> {comment.by}</li>
                                    <li><span className={'label'}> Comment: </span>
                                        <div dangerouslySetInnerHTML={{__html: comment.text}}/>
                                    </li>
                                </ul>
                            )
                        }
                    )
                    : ''
                }
            </div>
        )
    }

    useEffect(() => {
        fetch('http://localhost:3000/api/top-stories')
            .then(res => res.json())
            .then(res => {
                setStories(res)
            });
    }, []);

    return (
        <div id={'stories'}>
            {buildStoriesUI()}
        </div>
    )
}

