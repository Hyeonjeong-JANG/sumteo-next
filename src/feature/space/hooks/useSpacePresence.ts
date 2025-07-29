"use client";

import { supabase } from '../../../../lib/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useEffect, useState, useRef } from 'react';
import { PresenceState } from '../../../shared/types';


export function useSpacePresence(userId?: string, username?: string) {
  const [presentUsers, setPresentUsers] = useState<PresenceState[]>([]);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  useEffect(() => {
    // userId나 username이 없으면 아무것도 실행하지 않음 (손님 모드)
    if (!userId || !username) return;

    const spaceChannel = supabase.channel('space_channel');

    spaceChannel.on('presence', { event: 'sync' }, () => {
      const newState = spaceChannel.presenceState<PresenceState>();
      const users = Object.values(newState).map((p) => p[0]);
      setPresentUsers(users);
    });

    spaceChannel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await spaceChannel.track({
          user_id: userId,
          is_reading: isReading,
          username: username,
        });
      }
    });

    channelRef.current = spaceChannel;

    return () => {
      spaceChannel.unsubscribe();
    };
  }, [userId, username]);

  const toggleReadingStatus = async () => {
    if (!channelRef.current || !userId) return;

    const newReadingStatus = !isReading;

    if (newReadingStatus) { // 독서 시작
      const response = await fetch('/api/reading-sessions', { method: 'POST' });
      const data = await response.json();
      if (response.ok) {
        setCurrentSessionId(data.sessionId);
        setIsReading(true);
      } else {
        alert('독서 시작 실패: ' + data.error);
        return;
      }
    } else { // 독서 종료
      if (!currentSessionId) return;
      await fetch('/api/reading-sessions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: currentSessionId }),
      });
      setCurrentSessionId(null);
      setIsReading(false);
    }

    await channelRef.current.track({
      user_id: userId,
      is_reading: newReadingStatus,
      username: username,
    });
  };

  return { presentUsers, isReading, toggleReadingStatus };
}