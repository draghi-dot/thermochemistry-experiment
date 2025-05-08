import React from 'react';

const Pipette = ({ isDropping }) => {
    const pipetteStyle = {
        position: 'absolute',
        top: '70px',
        left: '50%',
        transform: 'translateX(-100px)',
        width: '40px',
        height: '200px',
        zIndex: 200,
    };

    const pipetteBodyStyle = {
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '20px',
        height: '150px',
        background: 'linear-gradient(to bottom, #808080, #f0f0f0)',
        borderRadius: '10px 10px 5px 5px',
    };

    const pipetteTipStyle = {
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '6px',
        height: '50px',
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: '2px',
        borderTopRightRadius: '2px',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
    };

    const liquidStyle = {
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '6px',
        height: '80px',
        backgroundColor: '#ff6b4a',
    };

    const dropStyle = {
        position: 'absolute',
        bottom: '-15px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '10px',
        height: '15px',
        backgroundColor: '#ff6b4a',
        borderRadius: '50%',
        display: isDropping ? 'block' : 'none',
        animation: isDropping ? 'dropFall 1s infinite' : 'none',
    };

    const handleStyle = {
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '25px',
        backgroundColor: '#808080',
        borderRadius: '5px',
    };

    return (
        <div style={pipetteStyle}>
            <div style={pipetteBodyStyle}></div>
            <div style={pipetteTipStyle}></div>
            <div style={liquidStyle}></div>
            <div style={dropStyle}></div>
            <div style={handleStyle}></div>
        </div>
    );
};

export default Pipette;