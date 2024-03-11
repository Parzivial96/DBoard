"use client"

//import Image from "next/image";
import { useEffect, useState } from 'react';

interface Notice {
  id: string;
  imageData: string;
  expiryDate: string;
}

export default function Home() {
  const [imageList, setImageList] = useState<Notice[]>([]);

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
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Notice Board</h1>
      <div className="image-grid">
        {imageList.map((image) => (
          <div key={image.id} className="image-container">
            <img src={image.imageData} alt={`Image ${image.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
}