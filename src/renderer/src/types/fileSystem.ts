export type OpenFileDialogReturnType = {
  canceled: boolean;
  filePaths: string;
  error: string;
};

export type OpenFileDialogForImageReturnType = {
  canceled: boolean;
  filePath: string;
  ext: string;
  encodedImage: string;
  downLoadUrl: string;
  error: string;
};

export type OpenFileDialogArgs = {
  title: string;
  filters: [{ name: string; extensions: string[] }];
};
