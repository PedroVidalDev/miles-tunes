import { injectable } from "tsyringe";
import { spawn } from "child_process";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";

export interface ConvertResult {
    success: boolean;
    message: string;
    path?: string;
}

@injectable()
export class ConvertService {

    public async convert(ytUrl: string, outputDir: string = "./downloads"): Promise<ConvertResult> {
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
        const cookiePath = path.resolve('./cookies.txt');
        const absoluteOutputDir = path.resolve(outputDir);

        const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(ytUrl)}&format=json`;
            
        const response = await fetch(oEmbedUrl, { method: 'GET' });
        const data = await response.json();
    
        const outputPath = path.resolve(outputDir, `${data.title}.mp3`);

        return new Promise((resolve, reject) => {
            console.log("1. Spawning yt-dlp...");

            const args = [
                '--js-runtimes', 'node:/usr/local/bin/node',
                '--cookies', cookiePath,
                '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                '-o', '-',             
                '-q',                  
                '--no-progress',       
                '-f', 'bestaudio/best',     
                
                ytUrl
            ];

            const ytDlp = spawn('yt-dlp', args, { cwd: absoluteOutputDir });

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