import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faRetweet,
  faCalendarDay,
} from '@fortawesome/free-solid-svg-icons';

const PostFeed = (props) => {
  return (
    <div className="post-feed">
      {props.posts.map((el) => {
        return (
          <article className="post" key={el.postId}>
            <p>{el.text}</p>
            <span>
              <h6>
                <FontAwesomeIcon icon={faCalendarDay} />
                {el.date}
              </h6>
              <h6>
                <FontAwesomeIcon icon={faHeart} />
                {el.likes}
              </h6>
              <h6>
                <FontAwesomeIcon icon={faRetweet} />
                {el.shares}
              </h6>
            </span>
          </article>
        );
      })}
    </div>
  );
};

export default PostFeed;
