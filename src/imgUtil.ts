/**
 * 预加载图片
 * @params {array} images 图片地址
 */
export function preloadImage(srcArr: string[] = []): Promise<string[]> {
  return new Promise(resolve => {
    const images = Array.from(new Set(srcArr));
    const loaded: string[] = [];
    for (let i = 0; i < images.length; i++) {
      const img = new Image();
      img.src = images[i];
      const push = () => {
        loaded.push(img.src);
        if (loaded.length >= images.length) {
          resolve(loaded);
        }
      };
      img.onload = push;
      img.onerror = push;
    }
  });
}

/**
 * @description: 获取本地图片文件尺寸
 * @param {File} file
 * @return: Promise<{widh: string, height: string}>
 */
export function getFileImageSize(
  file: File
): Promise<{ width: number; height: number } | null> {
  return new Promise(resolve => {
    if (!file) return resolve(null); // 没有选择图片，直接return
    if (!/^image\/[jpeg|png|jpg|gif|svg|ico]/gi.test(file.type)) {
      console.error("文件类型不是图片");
      return resolve(null);
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function() {
      const { width, height } = img;
      resolve({
        width,
        height
      });
    };
    img.onerror = () => resolve(null);
  });
}

