import { createClient } from '../../../../lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProfileModalClient } from '@/feature/profile/components/ProfileModalClient';
import { Profile } from '@/shared/types';

export default async function ProfilePage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return redirect('/signin');
    }

    const { data } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single();

    const profile: Profile | null = data ? {
        id: user.id,
        username: data.username,
        avatar_url: data.avatar_url,
    } : null;

    return <ProfileModalClient user={user} profile={profile} />;
}