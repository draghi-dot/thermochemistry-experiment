import React from 'react';

const ProtectionEquipment = () => {
    return (
        <div className="protection-equipment">
            <h3>Echipament de protecție</h3>
            <div className="equipment-icons">
                <div className="equipment-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24">
                        <path fill="#c0c0c0" d="M12,2C8.14,2 5,5.14 5,9c0,2.38 1.19,4.47 3,5.74V17c0,1.1 0.9,2 2,2h4c1.1,0 2-0.9 2-2v-2.26c1.81-1.27 3-3.36 3-5.74C19,5.14 15.86,2 12,2z M14,17h-4v-3h4V17z M12,13c-2.21,0-4-1.79-4-4c0-2.21 1.79-4 4-4s4,1.79 4,4C16,11.21 14.21,13 12,13z" />
                    </svg>
                    <span>Ochelari</span>
                </div>
                <div className="equipment-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24">
                        <path fill="#c0c0c0" d="M13,2V4H15V6H13V8H15V10H13V12H15V14H13V16H15V18H13V20H15V22H7V20H9V18H7V16H9V14H7V12H9V10H7V8H9V6H7V4H9V2H13M9,4V10H10V4H9M10,12V18H9V12H10Z" />
                    </svg>
                    <span>Halat</span>
                </div>
                <div className="equipment-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24">
                        <path fill="#4f7df9" d="M16,4L15,5L15,9C14.66,9 14.33,9.11 14.03,9.31L5.31,4.31C4.85,4.05 4.29,4.05 3.83,4.31C3.37,4.56 3.09,5.04 3.09,5.57L3.12,12C3.12,12.53 3.4,13.01 3.86,13.27L7.6,15.29C8.6,16.34 9.89,17.06 11.3,17.34C11.3,17.56 11.3,17.78 11.3,18C11.3,20.76 13.54,23 16.3,23C19.06,23 21.3,20.76 21.3,18C21.3,15.24 19.06,13 16.3,13C13.54,13 11.3,15.24 11.3,18C11.3,18.22 11.33,18.43 11.36,18.65C10.12,18.39 9,17.77 8.13,16.86L12.61,19.58C13.07,19.83 13.63,19.83 14.09,19.58C14.55,19.32 14.83,18.84 14.83,18.31L14.8,11.88C14.8,11.35 14.52,10.87 14.06,10.61L10.91,8.91L13,7.87L13,10.5H15V4H16Z" />
                    </svg>
                    <span>Mănuși</span>
                </div>
            </div>
        </div>
    );
};

export default ProtectionEquipment;