import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './components/Post';

function App() {
  const [posts, setPosts] = useState([]);
  const [textArea, setTextArea] = useState({
    value: "",
  });

  const getPostfromDB = () => {
    fetch('http://localhost:3001/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.data.reverse());
      });
  };

  useEffect(() => {
    getPostfromDB()
  }, [])

  useEffect(() => {
    getPostfromDB()
  }, [posts])

  const textChangeHandler = (e) => {
    setTextArea({
      value: e.target.value,
    })
  }

  const submitHandler = () => {
    fetch('http://localhost:3001/posts',
      {
        method: 'POST',
        body: JSON.stringify(textArea),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(res => {
        setTextArea({
          value: ""
        });
      });
  };

  return (
    <div className='react-app-component text-center'>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Enter your post</label>
                  <textarea
                    className="form-control"
                    id="post-content"
                    rows="3"
                    value={textArea.value}
                    onChange={(e) => textChangeHandler(e)}></textarea>
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      onClick={() => submitHandler()}>Post</button>
                  </div>
                </div>
              </div>
            </div>
            {posts.map((post) => {
              return (
                <div>
                  <Post post_data={post} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;