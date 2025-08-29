import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocFromCache, getDoc, doc, type DocumentSnapshot } from 'firebase/firestore';
import { useAtom } from 'jotai';

import { db } from '../../firebase/firestore';
import { dataFetchedAtom } from '../App';
import Header from '../../components/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { Menu } from 'lucide-react';

function Group() {
  const [dataFetched] = useAtom(dataFetchedAtom);
  const [group, setGroup] = useState<DocumentSnapshot | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { group: groupParam } = useParams();

  const groupData = group?.data();

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const groupDoc = doc(db, `groups/${groupParam}`);

        let groupSnap;
        if (dataFetched) {
          groupSnap = await getDocFromCache(groupDoc);
        } else {
          groupSnap = await getDoc(groupDoc);
        }

        setGroup(groupSnap);
      } catch (err) {
        throw err;
      }
    };

    fetchDoc();
  }, []);

  const handleShowSidebar = (state: boolean | null = null) => {
    if (state) setShowSidebar(state);
    else setShowSidebar(!showSidebar);
  };

  console.log('group: ', group?.data());
  console.log('from cache? ', group?.metadata.fromCache);

  return (
    <>
      <div className="relative flex w-dvw shrink-0 flex-col gap-8 pt-3">
        {showSidebar && (
          <div className="absolute inset-0 h-full w-full bg-black/60" onClick={() => handleShowSidebar(false)}></div>
        )}
        <div className="px-3">
          <Header onProfileClicked={handleShowSidebar} />
        </div>
        <main className="flex h-full flex-col items-start gap-8">
          <section className="flex w-full flex-col items-start gap-3 px-3">
            <div className="flex w-full flex-row items-center justify-between">
              <h1 className="font-noto-sans text-sand text-left text-4xl font-medium">{groupData?.name}</h1>
              <Menu className="w-8 cursor-pointer" />
            </div>
            <p className="text-xl font-light">
              You are owed <span className="font-bold">Php 20,000</span>
            </p>
            <div className="bg-charcoal-500 rounded-xl p-3 text-base">
              <p>Julian owes you Php 20,000</p>
              <p>You owe Marlon Php 20,000</p>
            </div>
            <p className="text-xs opacity-72">Debts are being simplified</p>
            <div className="border-charcoal-300 cursor-pointer rounded-xl border-1 px-3 py-1">See full breakdown</div>
          </section>
          <section className="bg-shell-300 h-full w-full rounded-3xl">This is a test</section>
        </main>
      </div>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </>
  );
}

export default Group;
