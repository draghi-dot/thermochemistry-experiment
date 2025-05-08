import React from 'react';

const Beaker = ({ type, label, color, className, showThermometer }) => {
    const beakerStyle = {
        background: color || '#e6f7ff',
        border: '4px solid #999',
        borderBottom: '18px solid #999',
        width: '180px',
        height: '220px',
        position: 'relative',
        borderRadius: '5px 5px 0 0',
        display: 'inline-block',
    };

    // Updated thermometer styles for inline application
    const thermometerStyle = {
        position: 'absolute',
        right: '25px',
        top: '-80px', // Makes it stick out from the top
        height: '280px', // Much longer
        width: '30px',
        zIndex: 100, // Ensure it's above everything
    };

    const thermometerBulbStyle = {
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '30px',
        height: '30px',
        backgroundColor: '#ff4d4d',
        border: '3px solid #999',
        borderRadius: '50%',
        zIndex: 101,
    };

    const thermometerStemStyle = {
        position: 'absolute',
        bottom: '25px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '12px',
        height: '240px', // Much longer
        backgroundColor: '#ff4d4d',
        border: '3px solid #999',
        borderRadius: '12px 12px 0 0',
        zIndex: 101,
    };

    const thermometerReadingStyle = {
        position: 'absolute',
        top: '5px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'white',
        border: '1px solid #999',
        borderRadius: '4px',
        padding: '2px 5px',
        fontSize: '14px',
        fontWeight: 'bold',
        zIndex: 102,
    };

    return (
        <div className={`beaker ${type} ${className || ''}`} style={beakerStyle}>
            {label && <div className="beaker-label">{label}</div>}
            {showThermometer && (
                <div style={thermometerStyle}>
                    <div style={thermometerBulbStyle}></div>
                    <div style={thermometerStemStyle}></div>
                    <div style={thermometerReadingStyle}>°C</div>
                </div>
            )}
        </div>
    );
};

export default Beaker;