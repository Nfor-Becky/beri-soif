import React from 'react';

interface MetricCardProps {
    title: string;
    value: string | number;
    children?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, children }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <p className="text-2xl font-bold text-blue-600">{value}</p>
            {children && <div className="mt-2">{children}</div>}
        </div>
    );
};

export default MetricCard;