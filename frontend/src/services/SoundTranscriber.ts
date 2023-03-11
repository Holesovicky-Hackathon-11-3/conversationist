
export async function transcribeSoundToText(soundFile: Blob): Promise<string> {
    let formData = new FormData()
        formData.append('test', soundFile)
        try {
            const response = await fetch('http://localhost:3001/api/whisper', {
                method: 'POST',
                body: formData,
            })
            const parsed = await response.json()
            return parsed.transcription
        } catch (err) {
            console.log('Whisper API error', err)
            throw new Error('Cannot transcribe sound')
        }

}