import React from 'react';
import { SoundRecorder } from './services/SoundRecorder';
import { transcribeSoundToText } from './services/SoundTranscriber';

interface RecorderProps {
    setTranscriptionCallback: (text: string) => void
}

interface RecorderState {
    transcription: string;
    recordingAccepted: boolean
    transcriptionErrored: boolean
}

export class Recorder extends React.Component<RecorderProps, RecorderState> {
    mediaRecorder: MediaRecorder | null;
    data: Blob | null;
    soundRecorder: SoundRecorder;

    constructor(props: RecorderProps) {
        super(props);
        this.mediaRecorder = null;
        this.data = null;
        this.state = {transcription: "", recordingAccepted: true, transcriptionErrored: false}
        this.soundRecorder = new SoundRecorder((soundData) => this.updateRecordedData(soundData))
    }

    async componentDidMount() {
        try {
            await this.soundRecorder.initialize()
        } catch (err) {
            this.setState({recordingAccepted: false})
        }

    }

    async updateRecordedData(soundData: Blob) {
        try {
            const transcription = await transcribeSoundToText(soundData)
            this.props.setTranscriptionCallback(transcription)
            this.setState({transcription})
        } catch(err) {
            this.setState({transcriptionErrored: true})
        }
    }


    render() {
        return (
            <>
            <div id="buttons">
                <button className='border rounded-2xl m-2 p-2 hover:bg-sky-100' onClick={() => this.soundRecorder.start()} disabled={!this.state.recordingAccepted}>
                    Record
                </button>
                <button className='border rounded-2xl m-2 p-2 hover:bg-sky-100' onClick={() => this.soundRecorder.stop()} disabled={!this.state.recordingAccepted}>
                    Stop
                </button>
            </div>
            <p>{this.state.transcription}</p>
            </>
        );
    }
}
