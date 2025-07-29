"use client";

import { supabase } from '../../../../lib/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useEffect, useState, useRef } from 'react';
import { PresenceState } from '../../../shared/types';


export function useSpacePresence(userId?: string, username?: string) {
  const [presentUsers, setPresentUsers] = useState<PresenceState[]>([]);
  const channelRef = useRef<RealtimeChannel | null>(null);
  
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
      const spaceChannel = supabase.channel('space_channel');

      spaceChannel.on('presence', { event: 'sync' }, () => {
          const newState = spaceChannel.presenceState<PresenceState>();
          const users = Object.values(newState).map((p) => p[0]);
          setPresentUsers(users);
      });

      spaceChannel.subscribe(async (status) => {
          if (status === 'SUBSCRIBED' && userId && username) {
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
  }, [userId, username, isReading]);

  const toggleReadingStatus = async () => {
    if (!channelRef.current || !userId || !username) return;

    const newReadingStatus = !isReading;

    // 독서 시작 시
    if (newReadingStatus) {
      const response = await fetch('/api/reading-sessions', { method: 'POST' });
      const data = await response.json();

      if (response.ok) {
        setCurrentSessionId(data.sessionId);
        setIsReading(true);
      } else {
        alert('독서 시작에 실패했습니다: ' + data.error);
        return;
      }
    } 
    // 독서 종료 시
    else {
      if (!currentSessionId) {
        alert('종료할 독서 세션이 없습니다.');
        return;
      }
      
      await fetch('/api/reading-sessions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: currentSessionId }),
      });

      setCurrentSessionId(null);
      setIsReading(false);
    }
  };

  return { presentUsers, isReading, toggleReadingStatus };
}