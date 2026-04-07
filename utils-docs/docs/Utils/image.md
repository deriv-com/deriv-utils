---
sidebar_position: 2
---

# image

### compressImage

Compress an image and return it as a Blob by utilizing a Promise that resolves with the compressed image as a Blob (`Promise<Blob>`).

#### Options

- `src[required]: string` - The source image URL or data URI.
- `filename[required]: string` - The desired filename for the compressed image.
- `options[optional]: {maxWidth?: number; quality?: number;}` - Options for image compression.

              -- **maxWidth [default: 2560]** The maximum width for the compressed image.

              -- **quality [default: 0.9]** - The image quality (0 to 1) for compression.

### convertToBase64

Convert a File to a Base64 encoded image representation.

It returns a Promise that resolves with an object containing the Base64 image data and the filename. `Promise<{filename: string; src: string}>`

#### Options

- `file[required]: File` - The File object to convert to Base64.

### isSupportedImageFormat

Check if a given filename has a supported image format extension.

It returns **True** if the filename has a supported image format extension, **false** otherwise.

#### Options

- `filename[required]: string` - The filename to check for a supported image format.

### compressImageFile

Convert image to base64 and compress an image file if it is a supported image format.

It returns a Promise that resolves with the compressed image as a Blob. `Promise<Blob>`

#### Options

- `file[required]: File` - The File object to compress.

### numToUint8Array

Get Uint8Array from number.

It returns `Uint8Array`.

#### Options

- `num[required]: number` - The number to convert to Uint8Array.
- `arraySize[optional]: number` - default 4.

### generateChunks

Turn binary into array of chunks.

It returns an array of Uint8Array chunks. `Uint8Array[]`

#### Options

- `binary[required]: Uint8Array` - Uint8Array to be chunked.

### readFile

Read a file and return it as modified object with a buffer of the file contents.

It returns a Promise that resolves with the file as a TFileObject. `Promise<{filename?: File["name"]; buffer: FileReader["result"]; fileSize: File["size"];}>`

#### Options

- `file[required]: Blob` - The file to read.
