import React from 'react';

const Cell: React.FC<{ cellText: string | null; bgColor: string }> = ({ cellText, bgColor }) => {
    return (
        <div
            style={{
                backgroundColor: bgColor,
                color: 'white',
                display: 'flex',
                height: 32,
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                border: '1px solid rgba(0,0,0,0.1)',
                marginTop: 1,
                marginLeft: 1,
                fontSize: 10,
            }}
        >
            {cellText ? cellText : ''}
        </div>
    );
};

export default Cell;
