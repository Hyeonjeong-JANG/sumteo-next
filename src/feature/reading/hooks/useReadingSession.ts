'use client';

import { useState } from 'react';

export function useReadingSession() {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startSession = async () => {
    try {
      const response = await fetch('/api/reading-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start' })
      });

      const data = await response.json();
      
      if (response.ok) {
        setCurrentSessionId(data.sessionId);
        setIsRecording(true);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.error };
      }
    } catch (error) {
      return { success: false, message: '독서 시작 중 오류가 발생했습니다.' };
    }
  };

  const endSession = async () => {
    if (!currentSessionId) return { success: false, message: '활성 세션이 없습니다.' };

    try {
      const response = await fetch('/api/reading-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'end', sessionId: currentSessionId })
      });

      const data = await response.json();
      
      if (response.ok) {
        setCurrentSessionId(null);
        setIsRecording(false);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.error };
      }
    } catch (error) {
      return { success: false, message: '독서 종료 중 오류가 발생했습니다.' };
    }
  };

  return {
    isRecording,
    startSession,
    endSession
  };
}