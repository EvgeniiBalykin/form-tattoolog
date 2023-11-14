export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    try {
      reader.readAsDataURL(file);
    } catch (e) {
      reject(e);
    }
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });