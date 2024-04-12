import React from "react";
import ReactPlayer from "react-player";
import isIos from "../../helpers/isIos";

function VideoWrapper({ video }) {
  return (
    <ReactPlayer
      className="video-wrapper"
      url={isIos() ? video.hls : video.dashManifest}
      controls={true}
      width={"100%"}
      height={"100%"}
      playsInline={true}
      volume={1}
      muted={true}
      loop={true}
      // playing={true}
      fallback={
        <div className="video-wrapper">
          <video
            preload="auto"
            playsInline
            src={video.fallback}
            type="video/mp4"
            className="video"
            controls
            autoPlay
            loop
          ></video>
        </div>
      }
    />
  );
}

export default VideoWrapper;
