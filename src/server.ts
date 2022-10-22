import express from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";
import { Request, Response } from "express";

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req: Request, res: Response) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  app.get("/filter-image", async (req: Request, res: Response) => {
    try {
      const { image_url } = req.query;

      if (!image_url) {
        return res.status(400).json({
          message: "Url image is required.",
        });
      }

      const pathImage = await filterImageFromURL(image_url);

      return res.status(200).sendFile(pathImage, () => {
        deleteLocalFiles([pathImage]);
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  });

  // app.use((err: any, req: any, res: any) => {
  //   const statusCode = err?.statusCode || 500;
  //   const status = err.status || "error";

  //   return res.status(statusCode).json({
  //     status: status,
  //     message: err.message,
  //     stack: err.stack,
  //   });
  // });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
