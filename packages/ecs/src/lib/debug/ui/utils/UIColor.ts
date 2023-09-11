export class UIColor {
    static getColor(color: keyof typeof colors) {
        return colors[color];
    }
    static shade(color: string, magnitude: number) {
        if (color.length != 6) {
            return `#${color}`;
        }

        const decimalColor = parseInt(color, 16);

        let r = (decimalColor >> 16) + magnitude;

        r > 255 && (r = 255);
        r < 0 && (r = 0);

        let g = (decimalColor & 0x0000ff) + magnitude;

        g > 255 && (g = 255);
        g < 0 && (g = 0);

        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;

        b > 255 && (b = 255);
        b < 0 && (b = 0);

        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    }
}

const colors = {
    purpleLighter: UIColor.shade('7252D3', 32),
    purpleLight: UIColor.shade('7252D3', 16),
    purple: '#7252D3',
    purpleDark: UIColor.shade('7252D3', -16),
    purpleDarker: UIColor.shade('7252D3', -32),
} as const;
