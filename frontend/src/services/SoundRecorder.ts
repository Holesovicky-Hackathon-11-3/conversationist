
export type SoundCallback = (soundData: Blob) => void

export class SoundRecorder {
    mediaRecorder: MediaRecorder | null
    soundData: Blob | null;
    callback: SoundCallback

    constructor(callback: SoundCallback) {
        this.mediaRecorder = null
        this.soundData = null
        this.callback = callback
    }

    async initialize() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        this.mediaRecorder = new MediaRecorder(stream)
        this.mediaRecorder.ondataavailable = (e) => {
            this.soundData = e.data;
        }
        this.mediaRecorder.onstop = async (e) => {
            if (this.soundData == null) {
                return;
            }
            this.callback(this.soundData)
        }
    }

    start() {
        if (this.mediaRecorder == null) {
            return;
        }
        this.mediaRecorder.start();
    }

    stop() {
        if (this.mediaRecorder == null) {
            return;
        }
        this.mediaRecorder.stop();
    }
}