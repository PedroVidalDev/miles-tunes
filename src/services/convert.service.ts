import { injectable } from "tsyringe";
import { spawn } from "child_process";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";

@injectable()
export class ConvertService {

    public async convert(ytUrl: string, outputDir: string = "./downloads") {
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
        
        const timestamp = Date.now();
        const outputPath = path.resolve(outputDir, `audio-${timestamp}.mp3`);

        return new Promise((resolve, reject) => {
            console.log("1. Spawning yt-dlp...");

            const ytDlp = spawn('yt-dlp', [
                '-o', '-',             
                '-q',                  
                '--no-progress',       
                '-f', 'bestaudio',     
                ytUrl
            ]);

            const command = ffmpeg(ytDlp.stdout)
                .audioBitrate(128)
                .save(outputPath);

            command.on('start', (commandLine) => {
                console.log('2. FFmpeg process started:', commandLine);
            });

            command.on('progress', (progress) => {
                console.log(`3. Processing: ${progress.timemark}`);
            });

            command.on('end', () => {
                console.log('4. FFmpeg finished processing');
                resolve({ 
                    success: true, 
                    message: "Conversion complete", 
                    path: outputPath 
                });
            });

            command.on('error', (err) => {
                console.error('FFmpeg Error:', err.message);
                ytDlp.kill();
                resolve({ success: false, message: "Conversion failed during processing." });
            });

            ytDlp.stderr.on('data', (data) => {
                console.error(`yt-dlp stderr: ${data}`);
            });

            ytDlp.on('close', (code) => {
                if (code !== 0) {
                    console.log(`yt-dlp exited with code ${code}`);
                }
            });
        });
    }
}