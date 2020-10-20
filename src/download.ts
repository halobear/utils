/**
 * @description: 根据地址下载
 * @param {String} href
 * @param {String} name
 */
export function download(href: string, name = `${Date.now()}.txt`) {
  const a = document.createElement("a");
  a.download = name;
  a.style.display = "none";
  a.href = href;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * @description: 下载blob对象
 * @param {Blob} blob
 * @param {String} name
 */
export function downloadBlob(blob: Blob, name: string) {
  const href = URL.createObjectURL(blob);
  download(href, name);
}

/**
 * @description: 下载文字
 * @param {String} str
 * @param {String} name
 */
export function downloadStr(str: string, name: string) {
  const blob = new Blob([str]);
  downloadBlob(blob, name);
}

/**
 * @description: 下载图片
 * @param {String} src
 * @param {String} name
 */
export function downloadImage(src: string, name = `${Date.now()}.png`) {
  const image = new Image();
  image.setAttribute("crossOrigin", "anonymous");
  image.src = src;
  image.onload = function() {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(image, 0, 0, image.width, image.height);
      const href = canvas.toDataURL("image/png");
      download(href, name);
    }
  };
}
