import React from 'react';

const TimeSlotSelection = ({ 
    availability, 
    sessionType, 
    selectedTimeInfo, 
    onTimeSelect 
}) => {
    const selectTime = (date, time) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        onTimeSelect({ date: formattedDate, time });
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Available Times</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {availability.map((dateObj) => {
                    const date = dateObj.date;
                    return Object.entries(dateObj.time_slots).map(([time, sessionTypes]) => {
                        // Only show time slots that include the selected session type
                        if (!sessionTypes.includes(sessionType)) {
                            return null;
                        }

                        const displayDate = new Date(date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                        });

                        const isSelected = selectedTimeInfo?.date === new Date(date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        }) && selectedTimeInfo?.time === time;

                        return (
                            <button
                                key={`${date}-${time}`}
                                type="button"
                                onClick={() => selectTime(date, time)}
                                className={`p-4 text-left border rounded transition-colors duration-200 ${
                                    isSelected 
                                        ? 'bg-blue-500 text-white' 
                                        : 'hover:bg-blue-50'
                                }`}
                            >
                                <div className="font-semibold">{displayDate}</div>
                                <div className={isSelected ? 'text-white' : 'text-gray-600'}>{time}</div>
                            </button>
                        );
                    });
                })}
            </div>
        </div>
    );
};

export default TimeSlotSelection; 