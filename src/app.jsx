import React, { useState, useEffect } from 'react';
import Chart from './components/Chart.jsx';
import Beaker from './components/Beaker.jsx';
import Controls from './components/Controls.jsx';

const App = () => {
    const [temperature, setTemperature] = useState(25);
    const [reactionType, setReactionType] = useState('');
    const [temperatureData, setTemperatureData] = useState([]);
    const [selectedReaction, setSelectedReaction] = useState(null);
    const [animationState, setAnimationState] = useState('initial'); // 'initial', 'pouring', 'completed'

    const reactions = [
        {
            name: 'HCl + NaOH → NaCl + H₂O',
            reactants: 'HCl+NaOH',
            reactant1: 'HCl',
            reactant2: 'NaOH',
            ti: 22,
            tf: 26,
            deltaT: 4,
            q: 346.05,
            deltaH: -15043.32,
        },
        {
            name: 'H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O',
            reactants: 'H₂SO₄+NaOH',
            reactant1: 'H₂SO₄',
            reactant2: '2 NaOH',
            ti: 22,
            tf: 27,
            deltaT: 5,
            q: 470.87,
            deltaH: -18802.80,
        },
        {
            name: 'HCl + NH₄OH → NH₄Cl + H₂O',
            reactants: 'HCl+NH₄OH',
            reactant1: 'HCl',
            reactant2: 'NH₄OH',
            ti: 22,
            tf: 25,
            deltaT: 3,
            q: 282.04,
            deltaH: -11283.60,
        },
    ];

    const startExperiment = () => {
        console.log('Button clicked! Starting experiment...');
        // Match the reactionType with the reactants field in the reactions array
        const reaction = reactions.find((r) => r.reactants === reactionType);
        if (reaction) {
            setSelectedReaction(reaction);
            setAnimationState('pouring');
            
            // Update the temperature data for the chart
            setTemperatureData((prevData) => [
                ...prevData,
                reaction.ti, // Initial temperature
                reaction.tf, // Final temperature
            ]);
    
            // Update the current temperature
            setTemperature(reaction.tf);
            
            // After 5 seconds, hide beakers and show results (changed from 3 to 5)
            setTimeout(() => {
                setAnimationState('completed');
            }, 5000);
        } else {
            console.error('Reaction not found!');
        }
    };

    return (
        <div>
            <h1>Thermochemistry Experiment Simulator</h1>
            
            <Controls 
                reactionType={reactionType} 
                setReactionType={setReactionType} 
                onStartExperiment={startExperiment} 
            />
            
            {/* Only show the chart and temperature display when animation completes */}
            {animationState === 'completed' && (
                <>
                    <div className="chart-container">
                        <Chart temperatureData={temperatureData} />
                    </div>
                    <div id="temperatureDisplay">🌡️ Temperatură curentă: {temperature.toFixed(1)}°C</div>
                    <div className="results-interpretation">
                        <h2>Interpretarea rezultatelor:</h2>
                        <p>Natura procesului studiat este exotermă</p>
                        <p>Entalpiile reacțiilor (3) și (4) satisfac condiția (1) și efectele (+) reacțiilor (3) și (4) termice sunt mai mari decât cel al reacției (5)</p>
                    </div>
                </>
            )}
            
            {/* Only show the table when animation completes */}
            {animationState === 'completed' && selectedReaction && (
                <div className="results-table">
                    <h2>Se alcătuiește tabelul:</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Reacția studiată</th>
                                <th>Ti (°C)</th>
                                <th>Tf (°C)</th>
                                <th>ΔT (°C)</th>
                                <th>Q (cal)</th>
                                <th>ΔH (cal)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedReaction.name}</td>
                                <td>{selectedReaction.ti}</td>
                                <td>{selectedReaction.tf}</td>
                                <td>{selectedReaction.deltaT}</td>
                                <td>{selectedReaction.q}</td>
                                <td>{selectedReaction.deltaH}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            
            {/* Show beakers before and during animation */}
            {(animationState === 'initial' || animationState === 'pouring') && (
                <div className="solution-beakers">
                    {selectedReaction ? (
                        <>
                            <h3>Soluții reactante:</h3>
                            <div className={`beaker-display ${animationState === 'pouring' ? 'pouring-animation' : ''}`}>
                                <div className="beaker-container left">
                                    <Beaker 
                                        type="acid"
                                        label={selectedReaction.reactant1}
                                        color="#ffcccc" 
                                        className="beaker-left"
                                    />
                                </div>
                                <div className="beaker-container right">
                                    <Beaker 
                                        type="base"
                                        label={selectedReaction.reactant2}
                                        color="#ccffcc" 
                                        className="beaker-right"
                                    />
                                </div>
                                <div className="beaker-container center">
                                        <Beaker 
                                            type="mix"
                                            label="Rezultat" 
                                            color={animationState === 'pouring' ? "#e6e6ff" : "transparent"}
                                            className="beaker-center"
                                            showThermometer={true} // Add this line
                                        />
                                </div>
                                <div className="beaker-container center">
                                    <Beaker 
                                        type="mix"
                                        label="Rezultat" 
                                        color={animationState === 'pouring' ? "#e6e6ff" : "transparent"}
                                        className="beaker-center"
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3>Selectați o reacție</h3>
                            <div className="beaker-display">
                                <Beaker type="acid" />
                                <Beaker type="base" />
                                <Beaker type="mix" />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;