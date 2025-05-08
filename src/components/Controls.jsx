import React from 'react';

const Controls = ({ reactionType, setReactionType, onStartExperiment }) => {
    const handleChange = (event) => {
        setReactionType(event.target.value);
    };

    return (
        <div className="controls">
            <select value={reactionType} onChange={handleChange}>
                <option value="">Select a reaction</option>
                <option value="HCl+NaOH">HCl + NaOH</option>
                <option value="H₂SO₄+NaOH">H₂SO₄ + NaOH</option>
                <option value="HCl+NH₄OH">HCl + NH₄OH</option>
            </select>
            <button onClick={onStartExperiment}>Amestecă soluțiile!</button>
        </div>
    );
};

export default Controls;