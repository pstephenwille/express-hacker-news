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
    const itemCountStart = (pageNumber * pageSize) - pageSize;
    const itemEndCount = pageNumber * pageSize;
    const showingNRecords = `${itemCountStart === 0 ? 1 : itemCountStart} to ${itemEndCount}`
    const totalPages = totalCount / pageSize;
    const selectNewPage = (event: any) => {
        const newPage = event.target.dataset.nav === 'next' ? pageNumber + 1 : pageNumber - 1;
        setPagination({...pagination, pageNumber: newPage})
    }


    return (<div className={'pagination'}>
        <p className={'label title'}>Showing {showingNRecords} of {totalCount}</p>
        <ul>
            <li className={'label nav'} data-nav={'prev'} onClick={selectNewPage}> &laquo; </li>
            <li className={`label`}>Page: {pageNumber || '0'}</li>
            <li className={`label`}>of {totalPages}</li>
            <li className={'label nav'} data-nav={'next'} onClick={selectNewPage}> &raquo; </li>
        </ul>
    </div>)
}
