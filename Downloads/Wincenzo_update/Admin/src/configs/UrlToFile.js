const UrlToFile = (url, ImgName) => {
  let arr = url?.split(",");
  let mime = url ? arr[0]?.match(/:(.*?);/) : "";

  const data = url ? arr[1] : "";
  let datastr = atob(data);
  let n = datastr?.length;
  let dataArr = new Uint8Array(n);
  while (n--) {
    dataArr[n] = datastr.charCodeAt(n);
  }
  let file = new File([dataArr], ImgName, { type: mime });
  return file;
};
export default UrlToFile;
