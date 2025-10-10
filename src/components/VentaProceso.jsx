import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLaptop, FaTruck, FaMoneyBillWave } from 'react-icons/fa';
import './VentaProceso.css';

const pasosVenta = [
    {
        id: 1,
        titleKey: 'process.step1.title',
        descKey: 'process.step1.desc',
        icon: FaLaptop,
        color: '#6aa84f',
    },
    {
        id: 2,
        titleKey: 'process.step2.title',
        descKey: 'process.step2.desc',
        icon: FaTruck,
        color: '#f1c232',
    },
    {
        id: 3,
        titleKey: 'process.step3.title',
        descKey: 'process.step3.desc',
        icon: FaMoneyBillWave,
        color: '#3d85c6',
    },
];

const VentaProceso = () => {
    const { t } = useTranslation();
    return (
        <section className="venta-proceso-container">
            <div className="proceso-header">
                <h2>{t('process.title')}</h2>
                <p>{t('process.subtitle')}</p>
            </div>
            <div className="proceso-steps">
                {pasosVenta.map((paso, index) => (
                    <React.Fragment key={paso.id}>
                        <div className="proceso-card">
                            <div className="icon-wrapper">
                                <paso.icon size={40} color="#3d85c6" className="proceso-icon" />
                            </div>
                            <div className="text-content">
                                <h3>{paso.id}</h3>
                                <h4>{t(paso.titleKey)}</h4>
                                <p>{t(paso.descKey)}</p>
                            </div>
                        </div>
                        {index < pasosVenta.length - 1 && <span className="arrow-separator">→</span>}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
};

export default VentaProceso;
