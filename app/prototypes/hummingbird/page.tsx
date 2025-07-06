"use client";

// Template for creating a new prototype
// To use this template:
// 1. Create a new folder in app/prototypes with your prototype name
// 2. Copy this file and styles.module.css into your new folder
// 3. Create an 'images' folder for your prototype's images
// 4. Rename and customize the component and styles as needed

import { useState } from 'react';
import styles from './styles.module.css';

interface Post {
  id: number;
  username: string;
  content: string;
  timestamp: string;
}

export default function HummingbirdFeed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: 'Sarah',
      content: 'Just launched my new portfolio website! 🚀',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      username: 'Michael',
      content: 'Working on some exciting UI animations today. Stay tuned!',
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      username: 'Emma',
      content: 'Does anyone have recommendations for good design podcasts?',
      timestamp: '6 hours ago'
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now(),
      username: 'You',
      content: newPost,
      timestamp: 'Just now'
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className={styles.pageWrapper}>
      <nav className={styles.navigation}>
        <a href="/" className={styles.homeLink}>← Home</a>
      </nav>
      
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Hummingbird</h1>
          <p className={styles.subtitle}>Share your thoughts</p>
        </header>

        <main className={styles.main}>
          <section className={styles.createSection}>
            <form onSubmit={handleSubmit} className={styles.postForm}>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's happening?"
                className={styles.postInput}
              />
              <button type="submit" className={styles.postButton}>
                Post
              </button>
            </form>
          </section>

          <section className={styles.feedSection}>
            <div className={styles.feed}>
              {posts.map(post => (
                <article key={post.id} className={styles.post}>
                  <div className={styles.postHeader}>
                    <div className={styles.avatar}>
                      {post.username[0]}
                    </div>
                    <div className={styles.postMeta}>
                      <span className={styles.username}>{post.username}</span>
                      <span className={styles.timestamp}>{post.timestamp}</span>
                    </div>
                  </div>
                  <p className={styles.content}>{post.content}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
} 