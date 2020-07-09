import moment from 'moment';

export const formatFileName = (file) => {
    const date = moment().format('YYYYMMDD');
    const randomString = Math.random().toString(36).substring(2, 7);
    const lastDot = file.lastIndexOf('.');
    const ext = file.substring(lastDot + 1);
    const fileName = file.substring(0, lastDot);
    const cleanFileName = fileName.toLowerCase().replace(/[^0-9a-z]/gi, '-');
    const newFilename = `uploads/${date}-${randomString}-${cleanFileName}.${ext}`;
    return newFilename.substring(0, 60);
  };