import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCarSide, FaLock, FaTruckMoving, FaThumbsUp } from 'react-icons/fa';
import './PorQueElegirnos.css';

const beneficios = [
    {
        id: 1,
        icon: FaCarSide,
        titleKey: 'whyChooseUs.benefit1.title',
        descKey: 'whyChooseUs.benefit1.desc',
    },
    {
        id: 2,
        icon: FaLock,
        titleKey: 'whyChooseUs.benefit2.title',
        descKey: 'whyChooseUs.benefit2.desc',
    },
    {
        id: 3,
        icon: FaTruckMoving,
        titleKey: 'whyChooseUs.benefit3.title',
        descKey: 'whyChooseUs.benefit3.desc',
    },
    {
        id: 4,
        icon: FaThumbsUp,
        titleKey: 'whyChooseUs.benefit4.title',
        descKey: 'whyChooseUs.benefit4.desc',
    },
];

const PorQueElegirnos = () => {
    const { t } = useTranslation();
    return (
        <section className="elegirnos-container">
            <div className="elegirnos-header">
                <h2>{t('whyChooseUs.title')}</h2>
                <p>{t('whyChooseUs.subtitle')}</p>
            </div>
            <div className="elegirnos-beneficios">
                {beneficios.map((beneficio) => (
                    <div className="beneficio-card" key={beneficio.id}>
                        <div className="icon-wrapper">
                            <beneficio.icon size={40} color="#3d85c6" className="beneficio-icon" />
                        </div>
                        <h3>{t(beneficio.titleKey)}</h3>
                        <p>{t(beneficio.descKey)}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PorQueElegirnos;
