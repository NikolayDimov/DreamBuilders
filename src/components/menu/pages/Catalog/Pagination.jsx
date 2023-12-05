import React from 'react';
import { Link } from 'react-router-dom';


const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation">
            <ul class="pagination pagination-lg justify-content-center m-0">
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <Link to={`#${number}`} onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;