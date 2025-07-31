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

    // 1. 현재 독서 상태를 데이터베이스에서 확인
    const checkCurrentReadingStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('reading_sessions')
          .select('id')
          .eq('user_id', userId)
          .is('end_time', null)
          .order('start_time', { ascending: false })
          .limit(1)
          .single();

        if (data && !error) {
          setIsReading(true);
          setCurrentSessionId(data.id);
        } else {
          setIsReading(false);
          setCurrentSessionId(null);
        }
      } catch (error) {
        console.log('독서 상태 확인 중 오류:', error);
        setIsReading(false);
        setCurrentSessionId(null);
      }
    };

    checkCurrentReadingStatus();

    // 2. 모든 사용자가 하나의 공통 채널에 접속합니다.
    // 이렇게 해야 서로 다른 사용자들의 독서 상태를 실시간으로 볼 수 있습니다.
    const channel = supabase.channel('reading_space_shared');
    channelRef.current = channel;

    // 3. 'presence' 이벤트가 발생하면(누군가 들어오거나 상태를 바꾸면),
    // 접속자 목록(presentUsers) 상태를 업데이트합니다.
    channel.on('presence', { event: 'sync' }, () => {
      const newState = channel.presenceState<PresenceState>();
      setPresentUsers(Object.values(newState).map((p) => p[0]));
    });

    // 4. 채널 구독을 시작합니다.
    channel.subscribe(async (status) => {
      // 5. 구독에 성공하고, 로그인한 사용자라면 나의 현재 상태를 방송(track)합니다.
      if (status === 'SUBSCRIBED' && userId && username) {
        // 현재 독서 상태로 track
        await channel.track({
          user_id: userId,
          is_reading: isReading,
          username: username,
        });
      }
    });

    // 6. 컴포넌트가 사라질 때 채널 구독을 끊습니다.
    return () => { channel.unsubscribe(); };
  }, [userId, username]);

  // isReading 상태가 변경될 때마다 실시간 상태를 업데이트
  useEffect(() => {
    if (channelRef.current && userId && username) {
      channelRef.current.track({
        user_id: userId,
        is_reading: isReading,
        username: username,
      });
    }
  }, [isReading, userId, username]);

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
      console.log('종료하려는 세션 ID:', currentSessionId);
      if (!currentSessionId) return;
      const result = await endReadingSessionAction(currentSessionId);
      // endReadingSessionAction은 성공시 success 필드가 없고 message만 있음
      if (result.message === '독서가 완료되었습니다') {
        setCurrentSessionId(null);
        setIsReading(false);
        toast.success('독서를 마쳤습니다!');
      } else {
        toast.error(result.message || '세션 종료에 실패했습니다');
        return;
      }
    }
  };

  return { presentUsers, isReading, toggleReadingStatus };
}