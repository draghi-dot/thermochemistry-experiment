function calculateEnthalpy(mass, specificHeat, deltaT) {
    return mass * specificHeat * deltaT;
}

function calculateHeatTransfer(heatLost, heatGained) {
    return heatLost + heatGained;
}

function calculateFinalTemperature(initialTemp, mass1, specificHeat1, mass2, specificHeat2) {
    const totalHeat = (mass1 * specificHeat1 * initialTemp) + (mass2 * specificHeat2 * initialTemp);
    const totalMass = mass1 + mass2;
    return totalHeat / (totalMass * (specificHeat1 + specificHeat2));
}

function calculateDeltaT(reactionType) {
    switch (reactionType) {
        case 'HCl+NaOH':
            return 10; // Example temperature change
        case 'H2SO4+NaOH':
            return 15;
        case 'HCl+NH4OH':
            return 5;
        default:
            return 0;
    }
}

export { calculateEnthalpy, calculateHeatTransfer, calculateFinalTemperature, calculateDeltaT };