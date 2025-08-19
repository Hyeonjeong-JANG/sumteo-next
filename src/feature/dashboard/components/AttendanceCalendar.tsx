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

    // 임시 통계 데이터
    const monthlyReadTime = "24시간 30분";
    const monthlyAttendance = "7일";

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
        <div className="card-elevated hover-lift">
            {/* 달력 헤더 */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={goToPreviousMonth}
                    className="glass-button p-3 rounded-xl hover:scale-105 transition-all duration-300 group"
                >
                    <span className="text-xl group-hover:-translate-x-1 transition-transform duration-300">◀</span>
                </button>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gradient-brand mb-1">
                        {monthYear}
                    </h2>
                    <p className="text-text-tertiary text-sm">독서 출석 캘린더</p>
                </div>

                <button
                    onClick={goToNextMonth}
                    className="glass-button p-3 rounded-xl hover:scale-105 transition-all duration-300 group"
                >
                    <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">▶</span>
                </button>
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 gap-2 mb-4">
                {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                    <div key={day} className={`text-center text-sm font-semibold py-3 rounded-lg ${
                        index === 0 ? 'text-error-400 bg-error-500/10' : 
                        index === 6 ? 'text-brand-400 bg-brand-400/10' : 
                        'text-text-secondary bg-white/5'
                    }`}>
                        {day}
                    </div>
                ))}
            </div>

            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7 gap-2 mb-6">
                {days.map((date, index) => {
                    if (!date) {
                        return <div key={index} className="h-12"></div>;
                    }

                    const dateStr = formatDate(date);
                    const attendance = getAttendanceStatus(date);
                    const today = isToday(date);

                    return (
                        <button
                            key={dateStr}
                            onClick={() => setSelectedDate(date)}
                            className={`
                                h-12 rounded-xl text-sm font-semibold transition-all duration-300 
                                hover:scale-105 active:scale-95 relative overflow-hidden
                                ${today
                                    ? 'bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow animate-pulse-glow'
                                    : 'hover:bg-white/10'
                                }
                                ${attendance === true
                                    ? 'bg-gradient-to-br from-success-500/30 to-success-600/30 text-success-300 border-2 border-success-400/50 shadow-lg'
                                    : attendance === false
                                        ? 'bg-gradient-to-br from-error-500/20 to-error-600/20 text-error-300 border border-error-500/30'
                                        : 'text-text-secondary hover:text-text-primary'
                                }
                                ${selectedDate?.toDateString() === date.toDateString()
                                    ? 'ring-2 ring-accent-400 ring-offset-2 ring-offset-transparent shadow-glow-accent'
                                    : ''
                                }
                            `}
                        >
                            {/* 배경 그라데이션 효과 */}
                            {attendance === true && (
                                <div className="absolute inset-0 bg-gradient-to-br from-success-400/20 to-transparent rounded-xl" />
                            )}
                            <span className="relative z-10">{date.getDate()}</span>
                            
                            {/* 출석 완료 표시 */}
                            {attendance === true && (
                                <div className="absolute top-1 right-1 w-2 h-2 bg-success-400 rounded-full shadow-sm" />
                            )}
                            
                            {/* 오늘 표시 */}
                            {today && (
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-sm" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* 통계 및 범례 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                
                {/* 출석 통계 */}
                <div className="text-center p-4 bg-success-500/10 rounded-xl border border-success-500/20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-success-400 rounded-full shadow-sm" />
                        <span className="text-sm font-medium text-success-300">출석 완료</span>
                    </div>
                    <div className="text-xl font-bold text-success-400">
                        {monthlyAttendance}
                    </div>
                </div>

                {/* 독서 시간 */}
                <div className="text-center p-4 bg-brand-400/10 rounded-xl border border-brand-400/20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-brand-400 rounded-full shadow-sm" />
                        <span className="text-sm font-medium text-brand-300">독서 시간</span>
                    </div>
                    <div className="text-xl font-bold text-brand-400">
                        {monthlyReadTime}
                    </div>
                </div>

                {/* 연속 출석 */}
                <div className="text-center p-4 bg-accent-500/10 rounded-xl border border-accent-500/20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-accent-400 rounded-full shadow-sm animate-pulse" />
                        <span className="text-sm font-medium text-accent-300">연속 출석</span>
                    </div>
                    <div className="text-xl font-bold text-accent-400">
                        3일
                    </div>
                </div>
            </div>

            {/* 선택된 날짜 정보 */}
            {selectedDate && (
                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 animate-scale-in">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-text-primary">
                                {selectedDate.toLocaleDateString('ko-KR', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric',
                                    weekday: 'long'
                                })}
                            </h4>
                            <p className="text-sm text-text-secondary mt-1">
                                {getAttendanceStatus(selectedDate) === true 
                                    ? '✅ 독서 완료' 
                                    : getAttendanceStatus(selectedDate) === false 
                                        ? '❌ 독서 미완료' 
                                        : '📅 예정된 날짜'}
                            </p>
                        </div>
                        <button 
                            onClick={() => setSelectedDate(null)}
                            className="text-text-tertiary hover:text-text-primary transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}