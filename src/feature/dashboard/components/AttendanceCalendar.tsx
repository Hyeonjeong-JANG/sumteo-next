'use client';

import React, { useState } from 'react';

// 기존 스타일 시스템을 사용한 커스텀 달력
export function AttendanceCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // 출석 데이터 (임시)
    const attendanceData = {
        '2024-03-08': true, // 출석
        '2024-03-15': false, // 결석
        '2024-03-22': true,
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // 이전 달의 빈 칸들
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // 이번 달의 날짜들
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const getAttendanceStatus = (date: Date) => {
        const dateStr = formatDate(date);
        return attendanceData[dateStr as keyof typeof attendanceData];
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const days = getDaysInMonth(currentDate);
    const monthYear = currentDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long'
    });

    return (
        <div className="card max-w-md mx-auto">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={goToPreviousMonth}
                    className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                    <span className="text-xl">◀</span>
                </button>

                <h2 className="text-xl font-semibold text-slate-200">
                    {monthYear}
                </h2>

                <button
                    onClick={goToNextMonth}
                    className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                    <span className="text-xl">▶</span>
                </button>
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 gap-1 mb-3">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-slate-400 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((date, index) => {
                    if (!date) {
                        return <div key={index} className="h-10"></div>;
                    }

                    const dateStr = formatDate(date);
                    const attendance = getAttendanceStatus(date);
                    const today = isToday(date);

                    return (
                        <button
                            key={dateStr}
                            onClick={() => setSelectedDate(date)}
                            className={`
                h-10 rounded-lg text-sm font-medium transition-all duration-200
                ${today
                                    ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                                    : 'hover:bg-slate-700/50'
                                }
                ${attendance === true
                                    ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                                    : attendance === false
                                        ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                                        : 'text-slate-300'
                                }
                ${selectedDate?.toDateString() === date.toDateString()
                                    ? 'ring-2 ring-amber-400'
                                    : ''
                                }
              `}
                        >
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>

            {/* 범례 */}
            <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-green-600/50 border border-green-500/50"></div>
                        <span className="text-slate-400">출석</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-red-600/50 border border-red-500/50"></div>
                        <span className="text-slate-400">결석</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-blue-600"></div>
                        <span className="text-slate-400">오늘</span>
                    </div>
                </div>
            </div>
        </div>
    );
}