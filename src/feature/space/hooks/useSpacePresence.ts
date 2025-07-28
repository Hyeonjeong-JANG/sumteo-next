"use client";

import { supabase } from '../../../../lib/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

type PresenceState = {
    user_id: string;
    is_reading: boolean;
    username: string;
};

export function useSpacePresence(userId: string, username: string) {
    const [presentUsers, setPresentUsers] = useState<PresenceState[]>([]);
    const [channel, setChannel] = useState<RealtimeChannel | null>(null);

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
        if (status === 'SUBSCRIBED') {
          // 채널에 성공적으로 접속하면 나의 현재 상태를 알림
          await spaceChannel.track({ 
            user_id: userId, 
            is_reading: isReading,
            username: username,
          });
        }
      });

      setChannel(spaceChannel);

    // 컴포넌트가 언마운트될 때 채널 구독을 해제
    return () => {
        spaceChannel.unsubscribe();
      };
    }, [userId, isReading, username]); // isReading 상태가 바뀔 때마다 내 상태를 다시 알림
  
    // 독서 상태 변경
    const toggleReadingStatus = async () => {
      if (!channel) return;
      const newReadingStatus = !isReading;
      setIsReading(newReadingStatus); // 내 상태를 먼저 바꾸고
      // 변경된 상태를 채널에 알림
      await channel.track({ 
        user_id: userId, 
        is_reading: newReadingStatus,
        username: username,
      });
    };
  
    return { presentUsers, isReading, toggleReadingStatus };
  }