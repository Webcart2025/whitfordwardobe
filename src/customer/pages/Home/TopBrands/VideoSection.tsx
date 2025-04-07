import React from "react";
import "./styles.css";

const VideoSection: React.FC = () => {
    return (
        <div className="video-section">
            <video autoPlay loop muted>
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoSection;
