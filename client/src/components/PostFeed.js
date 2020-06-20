import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faRetweet,
  faCalendarDay,
} from '@fortawesome/free-solid-svg-icons';

const PostFeed = (props) => {
  let timeline = props.timeline || null;
  if (timeline){
    timeline = timeline.map((el) => {
      return (
        <article className="post" key={el.id}>
          <p>{el.text}</p>
          <span>
            <h6>
              <FontAwesomeIcon icon={faCalendarDay} />
              {console.log (typeof el.date)}
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
    });
  }
  return (
    <div className="post-feed">
      {timeline?timeline:null}
      
    </div>
  );
};

export default PostFeed;
