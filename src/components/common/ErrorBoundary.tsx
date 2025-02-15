import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
    padding: 20px;
    margin: 20px;
    border: 1px solid #ff0000;
    border-radius: 4px;
    background-color: #fff5f5;
    color: #ff0000;
`;

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorContainer>
                    <h2>Something went wrong.</h2>
                    <p>{this.state.error?.message}</p>
                </ErrorContainer>
            );
        }

        return this.props.children;
    }
} 