"use client";

import { supabase } from '../../../../lib/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useEffect, useState, useRef } from 'react';
import { PresenceState } from '../../../shared/types';


export function useSpacePresence(userId?: string, username?: string) {
    const [presentUsers, setPresentUsers] = useState<PresenceState[]>([]);
    const channelRef = useRef<RealtimeChannel | null>(null);
    const startTimeRef = useRef<Date | null>(null);

    // 현재 나의 독서 상태 관리
    const [isReading, setIsReading] = useState(false);

    useEffect(()=>{
        //채널 접속
        const spaceChannel = supabase.channel('space_channel');

        // 이벤트 구독
        spaceChannel.on('presence', {event: 'sync'}, ()=>{
            const newState = spaceChannel.presenceState<PresenceState>();
            const users = Object.values(newState).map((p)=>p[0]);
            setPresentUsers(users);
        });

    // 구독 시작
    spaceChannel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED' && userId && username) {
          // 채널에 성공적으로 접속하면 나의 현재 상태를 알림
          await spaceChannel.track({ 
            user_id: userId, 
            is_reading: false,
            username: username,
          });
        }
      });

      channelRef.current = spaceChannel;

    // 컴포넌트가 언마운트될 때 채널 구독을 해제
    return () => {
        spaceChannel.unsubscribe();
      };
    }, [userId, username]); // isReading 상태가 바뀔 때마다 내 상태를 다시 알림
  
    // 독서 상태 변경
    const toggleReadingStatus = async () => {
      if (!channelRef.current || !userId || !username) return;

      const newReadingStatus = !isReading;
      setIsReading(newReadingStatus); // 내 상태를 먼저 바꾸고
      // 변경된 상태를 채널에 알림
      await channelRef.current.track({ 
        user_id: userId, 
        is_reading: newReadingStatus,
        username: username,
      });

      // 독서 시작 시
      if (newReadingStatus) {
        startTimeRef.current = new Date(); // 현재 시간을 기록
      } 
      // 독서 종료 시
      else if (startTimeRef.current) {
        const endTime = new Date();
        const startTime = startTimeRef.current;

        // 서버 API로 독서 기록 전송
        await fetch('/api/reading-sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
          }),
        });

        startTimeRef.current = null; // 시작 시간 초기화
      }
    };
  
    return { presentUsers, isReading, toggleReadingStatus };
  }