export const getBase64ImageUrl = async (
  imageId: string,
  highQuality = false
): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/w_${
      highQuality ? 400 : 200
    }/e_blur:10,q_1,f_webp/${imageId}`
  );

  const buffer = await response.arrayBuffer();
  const data = Buffer.from(buffer).toString('base64');
  return `data:image/webp;base64,${data}`;
};
