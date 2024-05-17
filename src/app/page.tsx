"use client";

import React, { useEffect, useState } from "react";

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

interface Event {
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
  const [eventList, setEventList] = useState<Event[]>([]);
  const [marqueeList, setMarqueeList] = useState<Marquee[]>([]);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const playSound = () => {
    const audio = new Audio("notification.mp3"); // Replace with the path to your sound file
    audio.play();
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://dboard-api.onrender.com/api/getAllNotice"
        );
        if (response.ok) {
          const data: Notice[] = await response.json();
          setImageList(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch image list");
        }
      } catch (error) {
        console.error("Error fetching image list:", error);
      }
    };

    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://dboard-api.onrender.com/api/getAllTodo"
        );
        if (response.ok) {
          const data: Todo[] = await response.json();
          setTodoList(data);
        } else {
          console.error("Failed to fetch todo list");
        }
      } catch (error) {
        console.error("Error fetching todo list:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://dboard-api.onrender.com/api/getAllEvent"
        );
        if (response.ok) {
          const data: Todo[] = await response.json();
          setEventList(data);
        } else {
          console.error("Failed to fetch event list");
        }
      } catch (error) {
        console.error("Error fetching event list:", error);
      }
    };

    const fetchMarquee = async () => {
      try {
        const response = await fetch(
          "https://dboard-api.onrender.com/api/getAllMarquee"
        );
        if (response.ok) {
          const data: Marquee[] = await response.json();
          setMarqueeList(data);
        } else {
          console.error("Failed to fetch marquee list");
        }
      } catch (error) {
        console.error("Error fetching marquee list:", error);
      }
    };

    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };

    const updateCurrentDate = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString() + " " + days[now.getDay() - 1]);
    };

    fetchImages();
    fetchTodos();
    fetchEvents();
    fetchMarquee();
    updateCurrentTime();
    updateCurrentDate();

    // Update time every second
    const intervalId = setInterval(updateCurrentTime, 1000);

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const noticeResponse = await fetch(
        "https://dboard-api.onrender.com/api/getAllNotice"
      );
      if (noticeResponse.ok) {
        const noticeData: Notice[] = await noticeResponse.json();
        setImageList(prevImageList => {
          if (noticeData.length > prevImageList.length) {
            playSound();
          }
          return noticeData;
        });
      } else {
        console.error("Failed to fetch notice list");
      }

      const todoResponse = await fetch(
        "https://dboard-api.onrender.com/api/getAllTodo"
      );
      if (todoResponse.ok) {
        const todoData: Todo[] = await todoResponse.json();
        setTodoList(prevTodoList => {
          if (todoData.length > prevTodoList.length) {
            playSound();
          }
          return todoData;
        });
      } else {
        console.error("Failed to fetch todo list");
      }

      const eventResponse = await fetch(
        "https://dboard-api.onrender.com/api/getAllEvent"
      );
      if (todoResponse.ok) {
        const eventData: Event[] = await eventResponse.json();
        setEventList(prevEventList => {
          if (eventData.length > prevEventList.length) {
            playSound();
          }
          return eventData;
        });
      } else {
        console.error("Failed to fetch event list");
      }

      const marqueeResponse = await fetch(
        "https://dboard-api.onrender.com/api/getAllMarquee"
      );
      if (marqueeResponse.ok) {
        const marqueeData: Marquee[] = await marqueeResponse.json();
        setMarqueeList(prevMarqueeList => {
          if (marqueeData.length > prevMarqueeList.length) {
            console.log("Marquee Updated");
            playSound();
          }
          return marqueeData;
        });
      } else {
        console.error("Failed to fetch marquee list");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    const intervalId = setInterval(fetchData, 500000); // Fetch data every 5 min

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  useEffect(() => {
    if (imageList.length === 0) {
      // No images yet, return or render a loading state
      return;
    }

    const slideshowInterval = setInterval(() => {
      // Move to the next image
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 35000); // Change the interval as needed (in milliseconds)

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(slideshowInterval);
  }, [imageList]);

  return (
    <div>
      <div className="header">
        <img src="logosmvec.png" alt="SMVEC Logo" width={400} height={80} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h2>Department of Electrical and</h2>
          <h2>Electronics Engineering</h2>
          <h3>Smart Bulletin</h3>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            border: "2px solid black",
            padding: "5px"
          }}
        >
          <h3>{currentDate}</h3>
          <h3>{currentTime}</h3>
        </div>
      </div>
      <div className="marquee-container">
        <div className="marquee-content">
          {marqueeList.map((marquee) => (
            <span key={marquee.id}>
              {String.fromCodePoint(0x1f539)} {marquee.marqueeData}
              {String.fromCodePoint(0x1f539)}
            </span>
          ))}
        </div>
      </div>
      <div className="mainContainer">
        <div className="noticeContainer">
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <img
                src={imageList[currentImageIndex].imageData}
                alt={`Image ${imageList[currentImageIndex].id}`}
              />
            </div>
          )}
        </div>
        <div className="rightContainer">
        <div className="textContainer">
          <center>
            <h2>ANNOUNCEMENTS</h2>
          </center>
          <br />
          <div className="marquee-vertical">
            <div className="marquee-vertical-content">
              {todoList.map((todo) => (
                <span key={todo.id}>
                  {String.fromCodePoint(0x26a1)}
                  {todo.textData}
                </span>
              ))}
            </div>
          </div>
        </div>
        <br/>
        <div className="textContainer">
          <center>
            <h2>EVENTS</h2>
          </center>
          <br />
          <div className="marquee-vertical">
            <div className="marquee-vertical-content">
              {eventList.map((event) => (
                <span key={event.id}>
                  {String.fromCodePoint(0x26a1)}
                  {event.textData}
                </span>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="marquee-container">
        <div className="marquee-content">
  
            <span>
              {String.fromCodePoint(0x1f539)} {"Project by Dr. D. Raja, Savitha. M, Anjana Berlin and Kokilavani. S (Batch 2020-24)"}
              {String.fromCodePoint(0x1f539)}
            </span>
          
        </div>
      </div>
    </div>
  );
}
