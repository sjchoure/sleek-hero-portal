
import { motion } from "framer-motion";

const backgroundVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut"
    }
  }
};

const BackgroundVideo = () => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={backgroundVariants}
      className="absolute inset-0"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-ironman-dark to-black/50">
        <motion.div className="absolute inset-0">
          <iframe 
            src="https://drive.google.com/file/d/10tydhnleEUyOmAyIY1Z1N6QonnCGdezf/preview" 
            className="absolute inset-0 w-full h-full"
            allow="autoplay"
            style={{ pointerEvents: "none" }}
            frameBorder="0"
          ></iframe>
          {/* Add a script to automatically play the video and hide controls */}
          <div 
            dangerouslySetInnerHTML={{ 
              __html: `
                <script>
                  window.onload = function() {
                    const iframe = document.querySelector('iframe');
                    if (iframe && iframe.contentWindow) {
                      // Try to find and autoplay the video within the iframe
                      const message = JSON.stringify({
                        event: 'command',
                        func: 'playVideo'
                      });
                      iframe.contentWindow.postMessage(message, '*');
                    }
                  }
                </script>
              `
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BackgroundVideo;
