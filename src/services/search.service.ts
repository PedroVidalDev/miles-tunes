import { injectable } from "tsyringe";

@injectable()
export class SearchService {
    public async search(ytUrl: string) {
        const response = await this.checkVideoAvailability(ytUrl);
        return response;
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
                isValid: true,
            }
        }
    }
}