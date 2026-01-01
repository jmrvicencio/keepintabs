import { getGroupRoute, ROUTES } from '@/app/routes';
import Loading from '@/components/Loading';
import Panel from '@/components/neubrutalist/Panel';
import useGroupListener from '@/features/groups/hooks/useGroupListener';
import { ArrowLeft, Ellipsis, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Members = () => {
  // Hooks
  const { group: groupParam } = useParams();
  const { group, loading } = useGroupListener(groupParam!);

  // States
  const [addMember, setAddMember] = useState(false);

  // Computed Values
  const groupData = group?.data();

  // -------------------
  // Effects
  // -------------------

  console.log(groupData);

  return loading ? (
    <Loading />
  ) : (
    <>
      <section className="border-wheat-400 rounde border-wheat-400d-lg mx-3 flex grow flex-col items-start gap-2 border-b border-dashed pt-6">
        <div className="w-full">
          <div className="text-ink-800 pointer-cursor mb-4 flex flex-row items-center justify-between gap-2 text-lg font-normal">
            <Link to={getGroupRoute(groupParam!)} className="flex flex-row items-center gap-4 font-semibold">
              <ArrowLeft className="text-ink-800" />
              <h1>{groupData!.name}</h1>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-4">
        <div className="flex flex-col items-center gap-4">
          <h2 className="w-full max-w-120 text-left font-semibold">Group Members</h2>
          <div className="flex w-full max-w-120 flex-col items-center">
            <div
              className={`${addMember && 'add'} group bg-wheat-400/50 flex w-full cursor-pointer flex-col items-center rounded-lg p-4 transition-all`}
              onClick={() => setAddMember((prev) => !prev)}
            >
              <div className="flex h-fit max-h-10 gap-2 transition-all duration-200 group-[.add]:max-h-0">
                <Plus />
                Add member to groups
              </div>
              <div className="max-h-20 w-full overflow-hidden duration-200 not-group-[.add]:max-h-0">
                <form className="flex w-full flex-col">
                  <input
                    id="name"
                    type="text"
                    className="border-charcoal-300 focus:outline-accent-400/60 w-full rounded-md border bg-white px-2 py-1 focus:outline-2"
                    placeholder="Name"
                    // value={inviteName}
                    // onChange={handleInviteNameChange}
                  />
                  <input
                    id="email"
                    // ref={addEmailRef}
                    type="email"
                    className="border-charcoal-300 focus:outline-accent-400/60 w-full rounded-md border bg-white px-2 py-1 not-focus:invalid:border-red-500 focus:outline-2"
                    placeholder="Email (optional)"
                    // value={inviteEmail}
                    // onChange={handleInviteEmailChange}
                    required={false}
                  />
                </form>
              </div>
            </div>
            {Object.entries(groupData!.members).map(([uid, member]) => {
              const hasEmail = !(member?.email == undefined || member?.email == '');
              const hasLinkedUid = !(member?.linkedUid == undefined || member?.email == '');
              const emailLabel = hasEmail ? (hasLinkedUid ? member.email : 'Invite Pending') : '(Not Invited)';

              return (
                <div
                  key={uid}
                  className="border-wheat-400 flex w-full items-center gap-2 rounded-lg border bg-white px-2 py-2"
                >
                  <div className="flex w-full items-center justify-start gap-2">
                    <div
                      className="bg-wheat-400/50 h-7 w-7 rounded-full bg-cover"
                      style={{
                        backgroundImage: `url('${member?.photoUrl ?? ''}')`,
                      }}
                    />
                    <div className="flex flex-col items-baseline">
                      <p>{member.displayName}</p>
                      <p className="text-ink-800/80 text-sm">{emailLabel}</p>
                    </div>
                  </div>
                  <div className="border-wheat-400 aspect-square h-fit w-fit rounded-full border p-1">
                    <Ellipsis className="stroke-ink-800 h-4 w-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Members;
