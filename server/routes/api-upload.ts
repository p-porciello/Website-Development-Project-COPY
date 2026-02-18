import { createRouteHandler } from 'uploadthing/next';
import { uploadRouter } from './image-router';

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});
