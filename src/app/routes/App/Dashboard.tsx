import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useGroups } from '../../../features/groups/hooks/useGroups';
import { useDebug } from '../../../hooks/useDebug';
import { useDashboardDebugOptions } from '../../../features/groups/utils/debuggerFunctions';

import { ROUTES } from '../../routes';
import GroupCard from '../../../features/groups/components/GroupCard';
import Panel from '../../../components/neubrutalist/Panel';

const Dashboard = memo(function Dashboard() {
  const navigate = useNavigate();

  const { groups, loading, reload } = useGroups();
  const { addOption, removeOption } = useDebug();

  useDashboardDebugOptions(reload);

  useEffect(() => {
    const newOption = {
      text: 'Test Dashboard',
      action: () => {
        console.log('this is a test');
      },
    };

    addOption(newOption.text, newOption.action);

    return () => {
      removeOption(newOption.text);
    };
  }, []);

  const PlusIcon = memo(({ className = 'w-4' }: { className?: string }) => <Plus className={className} />);

  const handleAddGroupClicked = async () => {
    navigate(ROUTES.NEW_GROUP);
  };

  return (
    <>
      <div className="relative w-dvw shrink-0 flex-col p-3">
        <main className="flex flex-col items-start">
          <section className="border-wheat-400 mb-8 flex w-full flex-col items-start gap-3 border-b-1 border-dashed pb-8">
            <h1 className="font-gieonto text-left text-4xl font-medium">Debts Clear!</h1>
            <p className="text-xl font-light">No outstanding balance</p>
          </section>
          <section className="w-full">
            <div className="mb-4 flex flex-row items-center gap-2">
              <h2 className="text-xl">Groups</h2>
              <Panel
                onClick={handleAddGroupClicked}
                dropOnClick={true}
                padding="px-3 py-0.5"
                bgColor="bg-accent-600"
                className="text-white"
              >
                <PlusIcon />
              </Panel>
            </div>
            <div className="flex flex-col gap-2">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className="bg-charcoal-500 h-22 w-full animate-pulse cursor-pointer rounded-xl" />
                ))
              ) : (
                <>
                  {groups?.map((doc) => {
                    const docData = doc.data()!;
                    return <GroupCard key={doc.id} id={doc.id} group={docData} />;
                  })}
                </>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
});

export default Dashboard;
