import * as React from 'react';
import { BAComponent } from './baComponent';
import { BBComponent } from './bbComponent';

export interface InputModel {
    text?: string;
}

export class View extends React.Component<InputModel> {
    public render() {
        const { text } = this.props;
        
        return (
            <div>
                <p className="App-intro">
                    bComponent content {text}
                </p>
                <BAComponent />
                <BBComponent />
            </div>
        );
    }
}
