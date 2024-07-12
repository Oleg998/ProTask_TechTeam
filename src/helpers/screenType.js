export const getScreenType = () => {
  const { innerWidth } = window
  if (innerWidth < 768) {
    return "mobile"
  }
  else if(innerWidth < 1440 ){
    return "tablet"
  }
  else {
    return "desktop"
  }
}

export const getDeviceType = () => {
  const userAgent = window.navigator.userAgent;

  if (userAgent.includes("Macintosh")) {
    return "_2x";
  }  else {
    return "_1x";
  }
}
