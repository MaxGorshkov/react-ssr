import * as React from 'react';

export interface InputModel {
    text: string;
}

export class View extends React.Component<InputModel> {
    public render() {
        const { text } = this.props;
        
        return (
            <p className="App-intro">
                bComponent content {text}
            </p>
        );
    }
}
