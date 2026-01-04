import * as dotenv from "dotenv"
import {createError} from "../error.js"
import { response } from "express";
dotenv.config();
//import { Configuration, OpenAIApi } from "openai";
// Import the Google Cloud Prediction service client
import { GoogleGenAI } from "@google/genai";


// Initialize the client with your AI Studio API Key
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_AI_STUDIO_KEY,
});

// Add this inside your generateImage function to debug:
const availableModels = await ai.models.list();
console.log("Your available models:", availableModels);

export const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        // Using Imagen 3 (the standard high-quality model)
        const response = await ai.models.generateImages({
            model: "imagen-4.0-generate-preview-06-06",
            prompt: prompt,
            config: {
                numberOfImages: 1,
                aspectRatio: "1:1",
            },
        });

        // The SDK returns the image data in base64 format inside 'imageBytes'
        const generatedImage = response.generatedImages[0].image.imageBytes;

        return res.status(200).json({ photo: generatedImage });
        
    } catch (error) {
        next(
            createError(
                error.status || 500,
                error.message || "Failed to generate image"
            )
        );
    }
}



// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);


// // controller to generate image

// export const generateImage= async (req, res, next)=>{
//     try {
//         const {prompt} = req.body;

//         const response = await openai.createImage({
//             prompt,
//             n: 1,
//             size: "1024x1024",
//             response_format: "b64_json"
//         });
//         const generatedImage = response.data.data[0].b64_json;
//         return res.status(200).json({photo: generatedImage});
//     } catch (error) {
//         next(
//             createError(
//                 error.status, 
//                 error?.response?.data?.error?.message || error?.message
//             )
//         );
//     }
// }