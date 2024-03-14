import axios from 'axios';
import { dialog } from 'electron';
import fs from 'fs';
import path from 'path';
import { firebaseStorageAvatarUpload } from '../firebase/storage';
import {
  OpenFileDialogArgs,
  OpenFileDialogForImageReturnType,
  OpenFileDialogReturnType,
} from './index.d';

const openFileDialog = async (arg: OpenFileDialogArgs): Promise<OpenFileDialogReturnType> => {
  try {
    const result = await dialog.showOpenDialog({
      title: arg.title,
      properties: ['openFile'],
      filters: arg.filters,
    });
    console.log(`mainProsess-filePath:${result.filePaths[0]}`);
    if (!result.canceled) {
      return { canceled: false, filePath: result.filePaths[0], error: '' };
    } else {
      return { canceled: true, filePath: '', error: '' };
    }
  } catch (error: any) {
    return { canceled: false, filePath: '', error: error.message };
  }
};

// recive request for openDialog for image
// if file is image file then upload to firebase storage and get download url
// return the download url
const openFileDialogForImage = async (
  arg: OpenFileDialogArgs
): Promise<OpenFileDialogForImageReturnType> => {
  try {
    const imageFile = await dialog.showOpenDialog({
      title: arg.title,
      properties: ['openFile'],
      filters: arg.filters,
    });

    if (!imageFile.canceled) {
      const image = fs.readFileSync(imageFile.filePaths[0]);
      let encodedImage = image.toString('base64');

      let ext = path.extname(imageFile.filePaths[0]).toLowerCase().trim().slice(1);

      if (ext === 'svg' || ext === 'gif' || ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
        if (ext === 'svg') {
          ext = 'svg+xml';
        }
        const uploadResult: { downLoadUrl: string; error: string } =
          await firebaseStorageAvatarUpload(imageFile.filePaths[0], image);
        if (uploadResult.error.length > 0) {
          // no error
          return {
            canceled: false,
            filePath: imageFile.filePaths[0],
            ext,
            encodedImage,
            downLoadUrl: '',
            error: uploadResult.error,
          };
        } else {
          // upload error
          return {
            canceled: false,
            filePath: imageFile.filePaths[0],
            ext,
            encodedImage,
            downLoadUrl: uploadResult.downLoadUrl,
            error: '',
          };
        }
      } else {
        // not image file
        return {
          canceled: false,
          filePath: imageFile.filePaths[0],
          ext,
          encodedImage,
          downLoadUrl: '',
          error: '',
        };
      }
    } else {
      // cancelled
      return {
        canceled: true,
        filePath: '',
        ext: '',
        encodedImage: '',
        downLoadUrl: '',
        error: '',
      };
    }
  } catch (error: any) {
    return {
      canceled: false,
      filePath: '',
      ext: '',
      encodedImage: '',
      downLoadUrl: '',
      error: error.message,
    };
  }
};

const getImageData = async (imagePath: string): Promise<string> => {
  try {
    const image = await axios.get(imagePath, { responseType: 'arraybuffer' });

    const base64 = Buffer.from(image.data, 'binary').toString('base64');
    let ext = path.extname(imagePath).toLowerCase().trim().slice(1);
    if (ext === 'svg') {
      ext = 'svg+xml';
    }
    return `data:image/${ext};base64,${base64}`;
  } catch (error: any) {
    return 'error occurred on download image';
  }
};
export { getImageData, openFileDialog, openFileDialogForImage };
