import * as React from 'react';

export interface IModel {
    text?: string;
    onOpen?: () => Promise<void>;
    onClose?: () => Promise<void>;
}

export class View extends React.Component<IModel> {
    public render() {
        const { text, onClose, onOpen } = this.props;
        
        return (
            <div>
                <p className="App-intro">
                    {
                        !!text &&
                        <>
                            baComponent content {text}
                            <span className='link' onClick={onClose}>
                                &nbsp;close
                            </span>
                        </>
                    }
                    {
                        !text &&
                        <>
                            <span className='link' onClick={onOpen}>
                                open baComponent
                            </span>
                        </>
                    }
                </p>
            </div>
        );
    }
}
