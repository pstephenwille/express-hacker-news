import React, {useCallback, useEffect, useState} from 'react';
import {Pagination} from "./Pagination";

export const TopStories = () => {
    const [stories, setStories] = useState([])
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        pageSize: 10,
        totalCount: 0
    })
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
        if(!comments.length) return 'no comments'

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

    const getPaginatedStories = useCallback(() => {
        const storiesUrl = `http://localhost:3000/api/top-stories?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`
        fetch(storiesUrl)
            .then(res => res.json())
            .then(res => {
                setStories(res.data)
                setPagination(res.pagination)
            });
    }, [pagination.pageNumber]);

    useEffect(() => {
        getPaginatedStories()
    }, [pagination.pageNumber]);

    return (
        <div id={'stories'}>
            <Pagination pagination={pagination} setPagination={setPagination}/>
            {buildStoriesUI()}
            <Pagination pagination={pagination} setPagination={setPagination}/>
        </div>
    );
}

