export const uploadToImgBB = async (file) => {
  const base64 = await toBase64(file);
  const form = new FormData();
  form.append('image', base64.split(',')[1]); // strip the data:image/...;base64, prefix
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    { method: 'POST', body: form }
  );
  const data = await res.json();
  return data.data.url; // the hosted image URL
};

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });