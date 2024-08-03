import React, {Dispatch, useEffect, useMemo, useState} from 'react';

interface PaginationProps {
    pagination: {
        pageNumber: number
        pageSize: number
        totalCount: number
    }
    setPagination: Dispatch<any>
}

export const Pagination = ({pagination, setPagination}: PaginationProps) => {
    const {pageNumber, pageSize, totalCount} = pagination;

    const itemCountStart = (pageNumber * pageSize) - pageSize + 1;
    const itemCountEnd = pageNumber * pageSize;
    const totalPages = totalCount / pageSize;

    const selectNewPageHandler = (event: any) => {
        const newPage = event.target.dataset.nav === 'next' ? pageNumber + 1 : pageNumber - 1;
        setPagination({...pagination, pageNumber: newPage})
    }


    return (<div className={'pagination'}>
        <p className={'label title'}>Showing {itemCountStart} to {itemCountEnd} of {totalCount}</p>
        <ul>
            <li className={'label nav'} data-nav={'prev'} onClick={selectNewPageHandler}> &laquo; </li>
            <li className={`label`}>Page: {pageNumber || '0'}</li>
            <li className={`label`}>of {totalPages}</li>
            <li className={'label nav'} data-nav={'next'} onClick={selectNewPageHandler}> &raquo; </li>
        </ul>
    </div>)
}
