import React from 'react';

interface RecorderState {
    transcription: string;
}

export class Recorder extends React.Component<{}, RecorderState> {
    mediaRecorder: MediaRecorder | null;
    data: Blob | null;

    constructor(props: any) {
        super(props);
        this.mediaRecorder = null;
        this.data = null;
        this.state = {transcription: ""}
    }

    render() {
        return (
            <>
            <div id="buttons">
                <button className="record" onClick={() => this.onRecordStart()}>Record</button>
                <button className="stop" onClick={() => this.onRecordStop()}>Stop</button>
            </div>
            <p>{this.state.transcription}</p>
            </>
        );
    }

    async componentDidMount() {
        const constraints = { audio: true };
        let stream;
        try {
            stream = await navigator.mediaDevices.getUserMedia(constraints)
        } catch (e) {
            console.log('The following error occured: ' + e);
            return
        }
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (e) => {
            this.data = e.data;
        }
        this.mediaRecorder.onstop = async (e) => {
            if (this.data == null) {
                return;
            }
            let formData = new FormData()
            formData.append('test', this.data)
            const response = await fetch('http://localhost:3001/api/whisper', {
                method: 'POST',
                body: formData,
            })
            const parsed = await response.json()
            // var blobUrl = URL.createObjectURL(this.data);
            this.setState({transcription: parsed.transcription})
            // console.log(blobUrl);
        }
    }

    async onRecordStart() {
        if (this.mediaRecorder == null) {
            return;
        }
        this.mediaRecorder.start();
    }

    async onRecordStop() {
        if (this.mediaRecorder == null) {
            return;
        }
        this.mediaRecorder.stop();
    }
}
