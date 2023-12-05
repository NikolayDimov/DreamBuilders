import React from 'react';
import './ProjectComments.css';

export const ProjectCommentsRenderer = ({ comments, formatTimestamp }) => {
    return (
        <div className="mb-5">
            <h3 className="text-uppercase mb-4">Comments</h3>
            {comments.map(comment => (
                <div key={comment.id} className="d-flex mb-4">
                    {/* You can customize the comment display as per your UI */}
                    <div className="ps-3">
                        <h6>{comment.name} <small><i>{formatTimestamp(comment.timestamp)}</i></small> </h6>
                        <p>{comment.commentText}</p>
                    </div>
                </div>
            ))
            }
        </div >
    );
};




