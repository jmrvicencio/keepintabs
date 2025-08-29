import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocFromCache, getDoc, doc, type DocumentSnapshot } from 'firebase/firestore';
import { useAtom } from 'jotai';

import { db } from '../../firebase/firestore';
import { dataFetchedAtom } from '../App';
import Header from '../../components/Header';
import Sidebar from '../../components/sidebar/Sidebar';

function Group() {
  const [dataFetched] = useAtom(dataFetchedAtom);
  const [group, setGroup] = useState<DocumentSnapshot | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { group: groupParam } = useParams();

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

  return (
    <>
      <div className="relative flex w-dvw shrink-0 flex-col gap-8 p-3">
        {showSidebar && (
          <div className="absolute inset-0 h-full w-full bg-black/60" onClick={() => handleShowSidebar(false)}></div>
        )}
        <Header onProfileClicked={handleShowSidebar} />
        This is the current group page
      </div>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </>
  );
}

export default Group;
