export default (string) => {
  var wordLength = string.length;
  if (wordLength <= 11) {
    return string;
  } else {
    return string.slice(0, 11) + "...";
  }
};
