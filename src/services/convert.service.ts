import Ffmpeg from "fluent-ffmpeg";
import { injectable } from "tsyringe";
import ytdl from "ytdl-core";
import path from "path";
import fs from "fs";

@injectable()
export class ConvertService {
    public async convert(ytUrl: string, outputDir: string = "./downloads") {
        const check = await this.checkVideoAvailability(ytUrl);

        if (!check.isValid) {
            return {
                success: false,
                message: "Invalid YouTube URL."
            }
        }

        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
        const safeTitle = check.title.replace(/[<>:"/\\|?*]+/g, "");
        const outputPath = path.resolve(outputDir, `${safeTitle}.mp3`);

        return new Promise((resolve, reject) => {
            const stream = ytdl(ytUrl, { 
                quality: 'highestaudio',
                filter: 'audioonly' 
            });

            Ffmpeg(stream)
                .audioBitrate(128)
                .save(outputPath)
                .on('end', () => {
                    resolve({ 
                        success: true, 
                        message: "Conversion complete", 
                        path: outputPath 
                    });
                })
                .on('error', (err) => {
                    console.error("FFmpeg Error:", err);
                    resolve({ success: false, message: "Conversion failed during processing." });
                });
        });
    }

    private async checkVideoAvailability(url: string) {
        try {
            const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
            
            const response = await fetch(oEmbedUrl, { method: 'GET' });
            const data = await response.json();

            return {
                isValid: true,
                title: data.title,
                authorName: data.author_name,
                thumbnailUrl: data.thumbnail_url
            }

        } catch (error) {
            console.error("Error connecting to YouTube:", error);
            return {
                isValid: false,
            }
        }
    }
}