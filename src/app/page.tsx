"use client"

//import Image from "next/image";
import React, { useEffect, useState } from 'react';

interface Notice {
  id: string;
  imageData: string;
  expiryDate: string;
}

export default function Home() {
  const [imageList, setImageList] = useState<Notice[]>([]);
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
        } else {
          console.error('Failed to fetch image list');
        }
      } catch (error) {
        console.error('Error fetching image list:', error);
      } finally {
        setLoading(false); // Set loading to false once images are fetched
      }
    };

    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };

    fetchImages();
    updateCurrentTime();

    // Update time every second
    const intervalId = setInterval(updateCurrentTime, 1000);

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
        <h1>Notice Board</h1>
        <h4>{currentTime}</h4>
      </div>
      <div className="marquee-container">
        <div className="marquee-content">
          <span>Your Marquee Content Goes Here. </span>
          {/* Repeat the content as needed */}
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
          <h2>Today Plan</h2>
        </div>
      </div>
      <div className="marquee-container">
        <div className="marquee-content">
          <span>Your Marquee Content Goes Here. </span>
          {/* Repeat the content as needed */}
        </div>
      </div>
    </div>
  );
}