"use client";

import { React, useEffect, useState } from 'react';

interface Notice {
  id: string;
  imageData: string;
  expiryDate: string;
}

interface Todo {
  id: string;
  textData: string;
  expiryDate: string;
}

interface Marquee {
  id: string;
  marqueeData: string;
  expiryDate: string;
}

export default function Home() {
  const [imageList, setImageList] = useState<Notice[]>([]);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [marqueeList, setMarqueeList] = useState<Marquee[]>([]);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://dboard-api.onrender.com/api/getAllNotice');
        if (response.ok) {
          const data: Notice[] = await response.json();
          setImageList(data);
          setLoading(false);
        } else {
          console.error('Failed to fetch image list');
        }
      } catch (error) {
        console.error('Error fetching image list:', error);
      }
    };

    const fetchTodos = async () => {
      try {
        const response = await fetch('https://dboard-api.onrender.com/api/getAllTodo');
        if (response.ok) {
          const data: Todo[] = await response.json();
          setTodoList(data);
        } else {
          console.error('Failed to fetch todo list');
        }
      } catch (error) {
        console.error('Error fetching todo list:', error);
      }
    };

    const fetchMarquee = async () => {
      try {
        const response = await fetch('https://dboard-api.onrender.com/api/getAllMarquee');
        if (response.ok) {
          const data: Marquee[] = await response.json();
          setMarqueeList(data);
        } else {
          console.error('Failed to fetch marquee list');
        }
      } catch (error) {
        console.error('Error fetching marquee list:', error);
      }
    };

    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };

    fetchImages();
    fetchTodos();
    fetchMarquee();
    updateCurrentTime();

    // Update time every second
    const intervalId = setInterval(updateCurrentTime, 1000);

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (imageList.length === 0) {
      // No images yet, return or render a loading state
      return;
    }

    const slideshowInterval = setInterval(() => {
      // Move to the next image
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 10000); // Change the interval as needed (in milliseconds)

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(slideshowInterval);
  }, [imageList]);

  return (
    <div>
      <div className="header">
        <img src="logosmvec.png" alt="SMVEC Logo" width={400} height={80}/>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <h2>Electrical and Electronics Engineering Department</h2>
          <h3>Notice Board</h3>
        </div>
        <h3>{currentTime}</h3>
      </div>
      <div className="marquee-container">
        <div className="marquee-content">
          {marqueeList.map((marquee) => (
            <span key={marquee.id}>* {marquee.marqueeData} *</span>
          ))}
        </div>
      </div>
      <div className='mainContainer'>
        <div className='noticeContainer'>
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <img
                src={imageList[currentImageIndex].imageData}
                alt={`Image ${imageList[currentImageIndex].id}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          )}
        </div>
        <div className='textContainer'>
          <center><h2>Today Plan</h2></center>
          <br/>
          <div className="marquee-vertical">
            <div className="marquee-vertical-content">
                {todoList.map((todo) => (
                    <span key={todo.id}>* {todo.textData} *</span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
