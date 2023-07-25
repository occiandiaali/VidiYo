import { YTTranscript } from "./TranscribeVideo";

export async function ExtractSS(s: string) {
  const tScript = await YTTranscript(s);
  const res = tScript.slice(0, 24);
  return res;
}
