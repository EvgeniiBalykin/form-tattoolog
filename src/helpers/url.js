const getAPIAddrPL = () => {
  return window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://cr.vean-tattoo.pl";
};

export { getAPIAddrPL };
