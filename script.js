// initialize all variable
const videolist = document.querySelector(".videos");
const search = document.querySelector(".btn");

let video = []; // store all the video data in video array

// fetch the data from FreeApi
const fetchData = async () => {
  const data = await fetch(
    "https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=90&query=javascript&sortBy=keep%2520one%253A%2520mostLiked%2520%257C%2520mostViewed%2520%257C%2520latest%2520%257C%2520oldest"
  );
  const Json = await data.json(); // convert all the data to json format

  //console.log(Json.data.data);
  video = Json.data.data;
  videolist.innerHTML = "";
  allVideos(video);
};

// diplay all the video content
function allVideos(video) {
  videolist.innerHTML = "";
  video.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.className = "video-card";
    videoCard.onclick = () => openVideo(video.items.id);
    let thumbnail = video?.items?.snippet?.thumbnails?.high?.url;
    //console.log(thumbnail);

    // create video card
    videoCard.innerHTML = `
        <img src="${thumbnail}" alt="${video?.items?.snippet?.title}">
        <h3>${video?.items?.snippet?.title}</h3>
        <p>${video?.items?.snippet?.channelTitle}</p>
        <p><span>Views :${
          video?.items?.statistics?.viewCount / 1000
        }K</span> <span>Likes :${video?.items?.statistics?.likeCount}</span></p>
        `;
    videolist.appendChild(videoCard);
  });
}

// click to open the video
function openVideo(videoId) {
  window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
}

// search the video on basis of the input
search.addEventListener("click", () => {
  console.log(video);

  const text = document.querySelector(".search-text");

  console.log(text.value);

  const filtered = video.filter(
    (video) =>
      video?.items?.snippet?.title
        .toLowerCase()
        .includes(text.value.toLowerCase()) ||
      video?.items?.snippet?.channelTitle
        .toLowerCase()
        .includes(text.value.toLowerCase())
  );

  // console.log(filtered);
  allVideos(filtered);
});

// call the funtion to fetch the data
fetchData();
