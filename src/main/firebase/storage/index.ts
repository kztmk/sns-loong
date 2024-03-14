import { StorageError, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import path from 'path';

import { getCurrentUserId } from '../auth';
import firebaseApp from '../index';

const storage = getStorage(firebaseApp);

// firebase storege image upload
const firebaseStorageAvatarUpload = async (avatarFileName: string, avatarFile: Buffer) => {
  const userId = getCurrentUserId();
  const uploadResult = { downLoadUrl: '', error: '' };
  if (userId) {
    try {
      const storageRef = ref(
        storage,
        `userData/${userId}/images/avatar/${path.basename(avatarFileName)}`
      );
      await uploadBytes(storageRef, avatarFile);
      uploadResult.downLoadUrl = await getDownloadURL(storageRef);
      return uploadResult;
    } catch (error) {
      uploadResult.error = (error as StorageError).message;
      return uploadResult;
    }
  } else {
    uploadResult.error = 'User not logged in';
    return uploadResult;
  }
};

export { firebaseStorageAvatarUpload };
