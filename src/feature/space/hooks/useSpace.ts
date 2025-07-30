"use client";

import { supabase } from '../../../../lib/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useEffect, useState, useRef } from 'react';
import { PresenceState } from '../../../shared/types';
import { endReadingSessionAction, startReadingSessionAction } from '@/app/(main)/actions';
import toast from 'react-hot-toast';


export function useSpace(userId?: string, username?: string) {
  const [presentUsers, setPresentUsers] = useState<PresenceState[]>([]);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  useEffect(() => {

    console.log("--- useEffect 실행! 채널에 접속합니다. ---");
    if (!userId || !username) return;

    // 1. 'space_channel'이라는 이름의 채널에 접속합니다.
    // 손님이면 'guests' 채널, 회원이면 회원 전용 채널에 들어갑니다.
    const channel = supabase.channel(`space_channel_${userId || 'guests'}`);
    channelRef.current = channel;

    // 2. 'presence' 이벤트가 발생하면(누군가 들어오거나 상태를 바꾸면),
    // 접속자 목록(presentUsers) 상태를 업데이트합니다.
    channel.on('presence', { event: 'sync' }, () => {
      const newState = channel.presenceState<PresenceState>();
      setPresentUsers(Object.values(newState).map((p) => p[0]));
    });

    // 3. 채널 구독을 시작합니다.
    channel.subscribe(async (status) => {
      // 4. 구독에 성공하고, 로그인한 사용자라면 나의 현재 상태를 방송(track)합니다.
      if (status === 'SUBSCRIBED' && userId && username) {
        await channel.track({
          user_id: userId,
          is_reading: isReading,
          username: username,
        });
      }
    });

    // 5. 컴포넌트가 사라질 때 채널 구독을 끊습니다.
    return () => { channel.unsubscribe(); };
  }, [userId, username]);

  // 독서 상태 변경
  const toggleReadingStatus = async () => {
    if (!channelRef.current || !userId) return;

    const newReadingStatus = !isReading;

    if (newReadingStatus) { // 독서 시작
      const result = await startReadingSessionAction();
      if (result.success) {
        setCurrentSessionId(result.sessionId);
        setIsReading(true);
        toast.success('독서를 시작합니다!');
      } else {
        toast.error(result.message);
        return;
      }
    } else { // 독서 종료
      if (!currentSessionId) return;
      const result = await endReadingSessionAction(currentSessionId);
      if (result.success) {
        setCurrentSessionId(null);
        setIsReading(false);
        toast.success('독서를 마쳤습니다!');
      } else {
        toast.error(result.message);
        return;
      }
    }

    await channelRef.current.track({
      user_id: userId,
      is_reading: newReadingStatus,
      username: username,
    });
  };

  return { presentUsers, isReading, toggleReadingStatus };
}