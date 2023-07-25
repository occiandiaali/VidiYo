import { YoutubeTranscript } from "youtube-transcript";

export async function YTTranscript(input: string) {
  try {
    const response = await YoutubeTranscript.fetchTranscript(input);
    const data = response.slice(0, 24);
    return data;
  } catch (e) {
    console.error(e);
  }
}
