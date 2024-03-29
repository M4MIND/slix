import App from './app';
import { render } from '@testing-library/react';

describe('App', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<App />);
        expect(baseElement).toBeTruthy();
    });

    it('should have a greeting as the title', () => {
        const { getByText } = render(<App />);
        expect(getByText(/Welcome memory-server-test/gi)).toBeTruthy();
    });
});
