import { UTApi } from "uploadthing/server"
import { createUploadthing } from 'uploadthing/express';

const f = createUploadthing();
const utapi = new UTApi();

async function uploadFiles(imgData: FormData) {
  const img = imgData.getAll("files");
  console.log(img);

}

export const uploadRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  }).onUploadComplete((data) => {
    //uploadFiles(data);
    console.log('upload completed', data);
  }),
};
