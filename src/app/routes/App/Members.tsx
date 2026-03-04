import { ChangeEvent, MouseEvent, PointerEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { getGroupRoute, ROUTES } from '@/app/routes';
import Button from '@/components/buttons/Button';
import Loading from '@/components/Loading';
import Panel from '@/components/neubrutalist/Panel';
import useGroupListener from '@/features/groups/hooks/useGroupListener';
import { ArrowLeft, Ellipsis, Plus } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useUpdateGroup } from '@/features/groups/hooks/useUpdateGroup';
import { Group, Member, SerializedGroup } from '@/features/groups/types';
import useSendInvite from '@/features/notifications/hooks/useSendInvite';
import { PopupConfirmation, PopupMenu } from '@/features/popup-menu/types';
import { usePopupOverlay } from '@/features/popup-menu/hooks/usePopupOverlay';
import { DocumentSnapshot } from 'firebase/firestore';
import { formatValue } from '@/hooks/useDigitField';
import { auth } from '@/lib/firebase/auth';

const MemberItem = ({
  member,
  uid,
  groupData,
  removeMember,
}: {
  member: Member;
  uid: string;
  groupData: SerializedGroup | undefined;
  removeMember: (...args: any[]) => any;
}) => {
  // Ref
  const menuRef = useRef<HTMLDivElement>(null);

  // Hooks
  const { setPopup, resetPopup, setShowPopup } = usePopupOverlay();

  // Computed Values
  const hasEmail = !(member?.email == undefined || member?.email == '');
  const hasLinkedUid = !(member?.linkedUid == undefined || member?.email == '');
  const emailLabel = hasEmail ? (hasLinkedUid ? member.email : 'Invite Pending') : '(Not Invited)';

  const handleRemoveMember = () => {
    const balance = (groupData!.spent[uid] ?? 0) - (groupData!.expenses[uid] ?? 0);
    const isBalanced = balance == 0;

    if (isBalanced) {
      const popup: PopupConfirmation = {
        type: 'popup-confirmation',
        title: 'Remove Member?',
        body: (
          <>
            Are you sure you want to remove <span className="font-bold">{member.displayName}?</span> All previous
            transactions with member will be locked<span className="font-bold"> This action cannot be undone</span>
          </>
        ),
        confirmText: 'Remove Member',
        confirmCallback: () => removeMember(uid, groupData!),
      };

      setPopup(popup);
    } else {
      const popup: PopupConfirmation = {
        type: 'popup-confirmation',
        title: 'Remove Member?',
        body: (
          <>
            Balance must be cleared before removing member.
            <span className="font-bold"> Remaining Balance: {formatValue(balance)}</span>
          </>
        ),
        isAlert: true,
        confirmText: 'Okay',
      };

      setPopup(popup);
    }
  };

  const handleMenuClicked = () => {
    const popup: PopupMenu = {
      type: 'menu',
      reference: menuRef,
      options: [
        {
          label: 'Edit Member',
        },
        {
          label: 'Resend Invite',
        },
        {
          label: 'Remove Member',
          action: handleRemoveMember,
          ignore: uid == auth.currentUser!.uid,
        },
      ],
    };

    setPopup(popup);
    setShowPopup(true);
  };

  return (
    <div key={uid} className="border-wheat-400 flex w-full items-center gap-2 rounded-lg border bg-white px-2 py-2">
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
      <div
        ref={menuRef}
        onClick={handleMenuClicked}
        className="border-wheat-400 aspect-square h-fit w-fit cursor-pointer rounded-full border p-1"
      >
        <Ellipsis className="stroke-ink-800 h-4 w-4" />
      </div>
    </div>
  );
};

const Members = () => {
  // Ref
  const formRef = useRef<HTMLFormElement>(null);

  // Hooks
  const { group: groupParam } = useParams();
  const { group, loading: groupLoading } = useGroupListener(groupParam!);
  const { addMember, removeMember } = useUpdateGroup(group);
  const sendInvite = useSendInvite();

  // States
  const [forceLoading, setForceLoading] = useState(false);
  const [addMemberField, setAddMemberField] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  // Computed Values
  const groupData = group?.data();
  const loading = groupLoading || forceLoading;

  // -------------------
  // Event Listener
  // -------------------

  const handleChangeNamee = (e: ChangeEvent<HTMLInputElement>) => {
    setInviteName(e.currentTarget?.value ?? '');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(e.currentTarget?.value ?? '');
  };

  const handleCancelClicked = () => {
    setInviteEmail('');
    setInviteName('');
    setAddMemberField(false);
  };

  const handleAddMemberSubmitted = async (e: MouseEvent) => {
    if (formRef.current?.checkValidity() === true) {
      const nextMember: Member = {
        displayName: inviteName,
      };
      if (inviteEmail != '') nextMember.email = inviteEmail;

      setForceLoading(true);

      // Add user to group
      const memberUId = uuid();
      await addMember(nextMember, memberUId);
      // Send user invite notification
      if (inviteEmail != '') {
        await sendInvite(memberUId, inviteEmail, groupData?.name ?? 'a', group?.id ?? 'a');
      }

      setForceLoading(false);

      setInviteEmail('');
      setInviteName('');
      setAddMemberField(false);
      e.preventDefault();

      return;
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <section className="border-wheat-400 rounde border-wheat-400d-lg mx-3 flex flex-col items-start gap-2 border-b border-dashed pt-6">
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
        <div className="flex flex-col items-center gap-4 px-4">
          <h2 className="w-full max-w-120 text-left font-semibold">Group Members</h2>
          <div className="flex w-full max-w-120 flex-col items-center gap-1">
            <div
              className={`${addMemberField && 'add'} group bg-wheat-400/50 flex w-full cursor-pointer flex-col items-center rounded-lg p-4 transition-all`}
              onClick={() => !addMemberField && setAddMemberField(true)}
            >
              <div className="flex h-fit max-h-10 gap-2 transition-all duration-200 group-[.add]:max-h-0">
                <Plus />
                Add member to groups
              </div>
              <div className="max-h-32 w-full overflow-hidden duration-200 not-group-[.add]:max-h-0">
                <form ref={formRef} className="flex w-full flex-col gap-1">
                  <input
                    id="name"
                    type="text"
                    className="border-charcoal-300 focus:outline-accent-400/60 w-full rounded-md border bg-white px-2 py-1 focus:outline-2"
                    placeholder="Name"
                    minLength={1}
                    required
                    value={inviteName}
                    onChange={handleChangeNamee}
                  />
                  <input
                    id="email"
                    type="email"
                    className="border-charcoal-300 focus:outline-accent-400/60 w-full rounded-md border bg-white px-2 py-1 not-focus:invalid:border-red-500 focus:outline-2"
                    placeholder="Email (optional)"
                    value={inviteEmail}
                    onChange={handleEmailChange}
                    required={false}
                  />
                  <div className="flex justify-end gap-2">
                    <Button onClick={handleCancelClicked}>Cancel</Button>
                    <Button type="submit" onClick={handleAddMemberSubmitted}>
                      Add Member
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            {Object.entries(groupData!.members).map(([uid, member]) => (
              <MemberItem key={uid} member={member} uid={uid} groupData={groupData} removeMember={removeMember} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Members;
