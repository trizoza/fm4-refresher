let aud = null;
let src = "";

const infiniteLoop = () => {
  console.log("calling");
  aud = document.querySelector("audio");
  setTimeout(() => {
    if (!aud) {
      console.log("aud", aud);
      return infiniteLoop();
    } else {
      console.log("aud", aud);
      src = aud.src;
      aud.addEventListener("stalled", (event) => {
        console.log("stalled", event);
        aud.src = src;
        aud.load();
        aud.play();
      });
      console.log("aud", aud);
      return aud;
    }
  }, [1000]);
};

infiniteLoop();
