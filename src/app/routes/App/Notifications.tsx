import { useState } from 'react';
import Panel from '@/components/neubrutalist/Panel';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/routes';
import { ArrowLeft } from 'lucide-react';
import useNotifications from '@/features/notifications/hooks/useNotifications';
import useGetNotifications from '@/features/notifications/hooks/useGetNotifications';
import { useEffect, useMemo } from 'react';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { NotificationInvite } from '@/features/notifications/types';
import { Group } from '@/features/groups/types';
import useGetUser from '@/features/users/hooks/useGetUser';
import { User } from '@/features/users/types';

const Notifications = () => {
  // Hooks
  const getUser = useGetUser();
  const { notifications, seenNotif } = useGetNotifications();

  // Local States
  const [notifs, setNotifs] = useState<QuerySnapshot<NotificationInvite, DocumentData>>();
  const [users, setUsers] = useState<Record<string, User>>({});

  console.log('users', users);

  // ------------------
  // Effects
  // ------------------

  // Create a copy of notifs
  useEffect(() => {
    if (!notifs) setNotifs(notifications);
  }, [notifications]);

  useEffect(() => {
    async function fetchUsers() {
      const users: Record<string, User> = {};

      for (let notif of notifs?.docs ?? []) {
        const userSnap = await getUser(notif.data().invitedBy);
        if (!userSnap.exists()) continue;

        users[userSnap.id] = userSnap.data()!;
      }

      setUsers(users);
    }

    fetchUsers();
  }, [notifs]);

  // set all notifs to seen
  useEffect(() => {
    async function seenNotifs() {
      const unseenNotifs = notifications?.docs.filter((notif) => !notif.data().seen) ?? [];
      await Promise.all(unseenNotifs.map((notif) => seenNotif(notif.id)));
    }
    seenNotifs();
  }, [notifs]);

  console.log(notifs?.docs.map((notif) => notif.data()));

  return (
    <>
      <section className="border-wheat-400 rounde border-wheat-400d-lg mx-3 flex grow flex-col items-start gap-2 border-b border-dashed pt-6">
        <div className="w-full">
          <div className="text-ink-800 pointer-cursor mb-4 flex flex-row items-center justify-between gap-2 text-lg font-normal">
            <Link to={ROUTES.APP} className="flex flex-row items-center gap-4 font-semibold">
              <Panel bgColor="bg-accent-200" dropOnClick={true}>
                <ArrowLeft className="text-ink-800" />
              </Panel>
              <h2>Notifications</h2>
            </Link>
          </div>
        </div>
      </section>
      <section className="px-4 pt-4">
        {notifs?.size == 0 && <>Nothing to see here!</>}
        {notifs?.docs.map((notifSnap, i) => {
          const notif = notifSnap.data();

          return (
            <div key={i} className="border-wheat-400 flex w-full flex-col rounded-2xl border bg-white p-2">
              <p className="py-2">
                {users?.[notif.invitedBy]?.username ?? 'unkown'} invited you to join{' '}
                <span className="font-semibold">{notif.groupName}</span> - {notif.seen ? 'seen' : 'unseen'}
              </p>
              <div className="flex w-full flex-row justify-stretch gap-4 px-2">
                <div className="bg-wheat-200 border-wheat-400 grow cursor-pointer rounded-lg border p-2">Ignore</div>
                <div className="bg-accent-200 grow cursor-pointer rounded-lg p-2">Accept</div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Notifications;
