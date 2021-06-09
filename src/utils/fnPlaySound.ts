export async function playSound(
  audioRef: React.RefObject<HTMLAudioElement>,
  src: string,
): Promise<void> {
  if (audioRef.current) {
    audioRef.current.src = src;
    await audioRef.current.play();
  }
}
