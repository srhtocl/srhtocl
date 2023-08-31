import React from 'react';
import PropTypes from 'prop-types';
//import { FiHeart } from 'react-icons/fi';

const Post = ({ post }) => {
  return (
    <div className="bg-white border-y-2 p-4 my-2 first:mt-4 last:mb-4">
      <div className="text-black text-xl mb-2">{post.content}</div>
      <div className="flex justify-between">
        <div className="text-gray-500">{post.timestamp.toDate().toLocaleDateString()}</div>
        {/*<div className="flex items-center gap-2">
          <span className="text-gray-500">{post.like_count}</span><FiHeart></FiHeart>
        </div>*/}
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.object.isRequired,
    like_count: PropTypes.number.isRequired,
  }).isRequired,
};

export default Post;
