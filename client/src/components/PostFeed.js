import React from 'react';


const PostFeed = (props) => {

    return(
        <div className='post-feed'>
            {props.posts.map(el=>{
                return (<article className='post' key={el.postId}>
                   <p>{el.text}</p>
                   <span><h6>{el.date}</h6><h6>{el.likes}</h6><h6>{el.shares}</h6></span>

                </article>);
            })}
        </div>
    )
}

export default PostFeed;