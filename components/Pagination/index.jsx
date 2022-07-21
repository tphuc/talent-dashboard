import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import React from 'react';
import { styled } from 'stitches.config';



const PaginationContainer = styled('div', {
    display: "flex",
    alignItems: "center"
})


const PaginationControl = styled('div', {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '$4',
    padding: '0px $2',
    fontSize: '$3',
    height: '$6',
    lineHeight: 'normal',
    fontWeight: 400,
    userSelect: "none",
    // boxShadow: `0 2px 10px $colors$blackA3`,
    transition: "0.2s ease all",
    background: "$mauve2",
    cursor: "pointer",
    boxSizing: "border-box",
    border: "1px solid $mauve4",
    '&:hover': {
        background: "$mauve3"
    }
})

const Text = styled('span', {
    mx: "$2"
})


export function Pagination({ currentPage = 1, onPageChange = (page) => { }, maxPage = 10 }) {
    return <PaginationContainer>
        <PaginationControl onClick={() => {
            if (currentPage > 1)
                onPageChange(currentPage - 1)
        }}
            css={{
                color: currentPage > 1 ? '$mauve12' : '$mauve6'
            }}
        >
            <ArrowLeftIcon />
        </PaginationControl>
        <Text px='1em'>{currentPage} of {maxPage ? maxPage : 1}</Text>
        <PaginationControl onClick={() => {
            if (currentPage < maxPage) {
                onPageChange(currentPage + 1)
            }
        }}
            css={{
                color: currentPage < maxPage ? '$mauve12' : '$mauve6'
            }}
        >
            <ArrowRightIcon />
        </PaginationControl>
    </PaginationContainer>
}