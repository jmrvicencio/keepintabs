import { ROUTES } from '@/app/routes';
import { Group } from '../types';
import { Link } from 'react-router-dom';
import Panel from '@/components/neubrutalist/Panel';
import { ArrowLeft } from 'lucide-react';
import UserIcon from '@/components/user_stack/UserIcon';
import Loading from '@/components/Loading';

const JoinGroup = ({ groupData }: { groupData: Group | undefined }) => {
  const isLoading = groupData == undefined;
  console.log(groupData);
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <section className="border-wheat-400 rounde border-wheat-400d-lg mx-3 flex grow flex-col items-start gap-2 border-b border-dashed pt-6">
        <div className="w-full">
          <div className="text-ink-800 pointer-cursor mb-4 flex flex-row items-center justify-between gap-2 text-lg font-normal">
            <Link to={ROUTES.APP} className="flex flex-row items-center gap-4 font-semibold">
              <Panel bgColor="bg-accent-200" dropOnClick={true}>
                <ArrowLeft className="text-ink-800" />
              </Panel>
              <h2>Join Group</h2>
            </Link>
          </div>
        </div>
      </section>
      <section className="flex flex-col">
        {Object.entries(groupData.members).map(([memberId, member]) => (
          <div key={memberId}>{member.displayName}</div>
        ))}
      </section>
    </>
  );
};

export default JoinGroup;
