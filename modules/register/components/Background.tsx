const Background = () => (
  <>
    <div className="pointer-events-none absolute top-0 left-0 -z-10 h-screen w-screen bg-black/60" />
    <video
      src="./video/register.mp4"
      autoPlay
      muted
      loop
      className="pointer-events-none absolute top-0 left-0 -z-20 h-screen w-screen object-cover"
      poster="/img/videoPoster.png"
      playsInline
    />
  </>
);

export default Background;
