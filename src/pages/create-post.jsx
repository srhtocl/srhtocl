import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import { useNavigate } from 'react-router';

import { insertDocument } from '../services/post-methods';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    if (!authContext.user) { navigate("/"); }

  }, []);

  const handleCreate = () => {
    const newPost = {
      content,
      timestamp: new Date(),
      like_count: 0,
    };
    
    insertDocument(newPost);
    setContent('');
  };

  return (
    <div className="m-4">
      <textarea
        placeholder="Post içeriği..."
        className="w-full mb-2 p-2 rounded border"
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 rounded"
        onClick={handleCreate}
      >
        Oluştur
      </button>
    </div>
  );
};

export default CreatePost;
