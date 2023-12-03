import { ChangeEvent } from 'react';

export const formatDateToUTC = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toUTCString();
};

export const onImageFileChange = (e: ChangeEvent<HTMLInputElement>, setImageUrl: (url: string) => void) => {
  if (e.target.files && e.target.files[0]) {
    const fileType = e.target.files[0].type.split('/')[0];
    //only image file acceptable
    if (fileType !== 'image') {
      setImageUrl('');
      return (e.target.value = '');
    }
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  }
};
