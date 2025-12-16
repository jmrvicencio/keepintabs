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

const Notifications = () => {
  const { notifications, seenNotif } = useGetNotifications();
  const [notifs, setNotifs] = useState<QuerySnapshot<NotificationInvite, DocumentData>>();

  useEffect(() => {
    if (!notifs) setNotifs(notifications);
  }, [notifications]);

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
      <section className="border-wheat-400 mx-3 flex grow flex-col items-start gap-2 border-b border-dashed pt-6">
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
      <section>
        {notifs?.docs.map((notifSnap, i) => {
          const notif = notifSnap.data();
          return (
            <div key={i}>
              {notif.groupId} : Seen - {notif.seen ? 'seen' : 'unseen'}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Notifications;
