import { ChangeEvent, FormEvent, useState, KeyboardEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ChevronLeft, X, UserRound } from 'lucide-react';
import { ROUTES } from '../../routes';
import { Member } from '@/features/groups/types';
import { auth } from '../../../lib/firebase/auth';
import useAddGroup from '@/features/groups/hooks/useAddGroup';
import Loading from '../../../components/Loading';
import Panel from '../../../components/neubrutalist/Panel';
import { usePopupOverlay } from '@/features/popup-menu/hooks/usePopupOverlay';
import { PopupOverlay } from '@/features/popup-menu/types';
import useSendInvite from '@/features/notifications/hooks/useSendInvite';

const NewGroup = () => {
  // Refs
  const formRef = useRef<HTMLFormElement>(null);
  const addEmailRef = useRef<HTMLInputElement>(null);

  // Hooks
  const navigate = useNavigate();
  const sendInvite = useSendInvite();

  // Local States
  const [groupName, setGroupName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const addGroup = useAddGroup(auth.currentUser!);

  const handleDoneClicked = async () => {
    if (groupName == '') {
      setNameError(true);
      return;
    }
    if (submitting) {
      return;
    }
    setSubmitting(true);

    debugger;
    const [groupId, inviteKey] = await addGroup(groupName, members);
    await Promise.all(
      members.map((member) => {
        if (member?.email) return sendInvite(member.email, groupName, groupId, inviteKey);
      }),
    );

    navigate(ROUTES.APP);
  };

  const handleGroupNameSubmitted = (e: FormEvent) => {
    e.preventDefault();
    handleDoneClicked();
  };

  const handleGroupNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextName = e.target.value;
    setGroupName(nextName);

    if (nextName === '') setNameError(true);
    else setNameError(false);
  };

  const handleInviteNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInviteName(e.target.value);
  };

  const handleInviteEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(e.target.value);
    addEmailRef.current?.setCustomValidity('');
  };

  const handleUserSubmit = (e: FormEvent) => {
    console.log('form enter');
    e.preventDefault();
    console.log('submitting form');
    handleAddMember();
  };

  const handleAddMember = () => {
    const newMember: Member = { displayName: inviteName };
    if (inviteEmail != '') {
      if (findMembers(inviteEmail).length > 0) {
        addEmailRef.current?.setCustomValidity('This email is already being used by another member');
        addEmailRef.current?.reportValidity();
        addEmailRef.current?.focus();
        return;
      }
      newMember.email = inviteEmail;
    }

    setMembers((prev) => [...prev, newMember]);
    setInviteEmail('');
    setInviteName('');
  };

  const handleRemoveMember = (i: number) => {
    const nextMembers = members.filter((member, _i) => {
      return _i != i;
    });

    setMembers(nextMembers);
  };

  const findMembers = (email: string, id: number = -1) => {
    return members.filter((member, i) => {
      return member.email != '' && member.email?.toLowerCase() === email.toLowerCase() && id != i;
    });
  };

  return submitting ? (
    <Loading />
  ) : (
    <div className="relative flex w-full shrink-0 flex-col gap-8 p-3">
      <main className="flex w-full flex-col">
        <div className="mb-4 flex w-full flex-row justify-between">
          <Link to={ROUTES.APP} className="left-0 cursor-pointer">
            <Panel bgColor="bg-accent-200" className="text-ink-800 flex flex-row" dropOnClick={true}>
              Cancel
            </Panel>
          </Link>
          <div className="right-0 cursor-pointer">
            <Panel
              onClick={handleDoneClicked}
              bgColor="bg-accent-200"
              className="text-ink-800 flex flex-row"
              dropOnClick={true}
            >
              Done
            </Panel>
          </div>
        </div>
        <h1 className="font-gieonto mt-4 text-left text-4xl font-medium">Create Group</h1>
        <form onSubmit={handleGroupNameSubmitted}>
          <div className="relative">
            <div className="flex items-baseline justify-between py-2">
              <label htmlFor="name">Group Name</label>
              <p className="text-xs">{groupName.length}/32</p>
            </div>
            <input
              id="name"
              type="text"
              autoComplete="off"
              className={`${nameError && 'error'} peer [.error]:border-error border-charcoal-300 focus:outline-accent-400/60 [.error]:placeholder:text-error w-full rounded-md border bg-white px-2 py-1 focus:outline-2`}
              placeholder={nameError ? 'Group name is required' : 'Group Name'}
              maxLength={32}
              value={groupName}
              onChange={handleGroupNameChange}
              autoFocus
            />
          </div>
        </form>
        <div className="relative my-4 pt-2 text-left">
          <h2 className="font-bold">Add Members</h2>
          <p className="mb-2 text-sm">User will get a notification if the account exists</p>
          <form
            method="submit"
            onSubmit={handleUserSubmit}
            autoComplete="off"
            className="flex flex-col gap-2"
            ref={formRef}
          >
            <div className="flex flex-row gap-2">
              <input
                id="name"
                type="text"
                className="border-charcoal-300 focus:outline-accent-400/60 w-0 grow-2 rounded-md border bg-white px-2 py-1 focus:outline-2"
                placeholder="Name"
                value={inviteName}
                onChange={handleInviteNameChange}
              />
              <input
                id="email"
                ref={addEmailRef}
                type="email"
                className="border-charcoal-300 focus:outline-accent-400/60 w-0 grow-3 rounded-md border bg-white px-2 py-1 not-focus:invalid:border-red-500 focus:outline-2"
                placeholder="Email (optional)"
                value={inviteEmail}
                onChange={handleInviteEmailChange}
                required={false}
              />
            </div>

            <button style={{ display: 'none' }} type="submit" />
            <div className="w-fit">
              <Panel
                bgColor="bg-accent-200 [.inactive]:bg-ink-300"
                padding="px-2 py-0.5"
                inactive={inviteName == ''}
                onClick={handleAddMember}
              >
                Add Member
              </Panel>
            </div>
          </form>
          <div className="mt-6 flex flex-col gap-2">
            {members.map((member, i) => (
              // Mmebers to be added to the group
              <div key={i} className="rounded-lg border bg-white p-2">
                <AddedUser
                  id={i}
                  member={member}
                  onClick={() => {
                    handleRemoveMember(i);
                  }}
                  setMembers={setMembers}
                  findMembers={findMembers}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const PhotoUrlOverlay = ({
  initialPhotoUrl,
  updatePhotoUrl,
}: {
  initialPhotoUrl: string;
  updatePhotoUrl: (val: string) => any;
}) => {
  const [photoUrl, setGroupName] = useState(initialPhotoUrl);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextGroupName = e.currentTarget.value;
    setGroupName(nextGroupName);
  };

  const handlePreSubmit = () => {
    updatePhotoUrl(photoUrl);
  };

  return (
    <form className="flex w-full flex-col items-center gap-2 py-4" onSubmit={handlePreSubmit}>
      <input
        className="border-charcoal-300 focus:outline-accent-400/60 [.error]:placeholder:text-error w-full rounded-md border bg-white px-2 py-1 focus:outline-2"
        type="text"
        value={photoUrl}
        onChange={handleChange}
        autoFocus
      />
      <Panel bgColor="bg-accent-200 [.inactive]:bg-ink-300" padding="px-2 py-0.5" onClick={handlePreSubmit}>
        Submit
      </Panel>
    </form>
  );
};

const AddedUser = ({
  id,
  member,
  onClick: handleClick,
  setMembers,
  findMembers,
}: {
  id: number;
  member: Member;
  onClick: () => any;
  setMembers: (state: any) => void;
  findMembers: (email: string, id: number) => Member[];
}) => {
  // Hooks
  const { setPopup, setShowPopup, resetPopup } = usePopupOverlay();

  // Local States

  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    setEditName(false);

    updateMembers();
  };

  const handleEmailBlur = () => {
    emailInputRef.current?.setCustomValidity('');
    if (emailInputRef.current?.validity.valid == false) {
      emailInputRef.current?.reportValidity();
      emailInputRef.current?.focus();
      return;
    } else if (findMembers(input, id).length > 0) {
      emailInputRef.current?.setCustomValidity('This email is already being used by another member');
      emailInputRef.current?.reportValidity();
      emailInputRef.current?.focus();
      return;
    }

    setEditName(false);
    setEditEmail(false);

    updateMembers();
  };

  const updateMembers = () => {
    setMembers((prev: Member[]) => {
      const nextMembers = [...prev];
      const nextMember = { ...nextMembers[id] };
      nextMembers[id] = nextMember;

      if (editName) nextMember.displayName = input;
      else nextMember.email = input;

      return nextMembers;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editEmail) handleEmailBlur();
    else handleBlur();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    emailInputRef.current?.setCustomValidity('');
    setInput(e.target.value);
  };

  const handleUpdateImageUrl = (val: string) => {
    setImageUrl(val);
    resetPopup();

    setMembers((prev: Member[]) => {
      const nextMembers = [...prev];
      const nextMember = { ...nextMembers[id] };
      nextMembers[id] = nextMember;

      if (val == '') {
        delete nextMember.photoUrl;
      } else {
        nextMember.photoUrl = val;
      }

      return nextMembers;
    });
  };

  const handleImageClicked = () => {
    const ImageUrlPopup: PopupOverlay = {
      type: 'popup-overlay',
      title: 'Update Photo Url',
      body: <PhotoUrlOverlay initialPhotoUrl={imageUrl} updatePhotoUrl={handleUpdateImageUrl} />,
    };

    setPopup(ImageUrlPopup);
    setShowPopup(true);
  };

  return (
    <div className="border-ink-800 flex flex-row items-center gap-3 not-first:mt-2 not-first:border-t not-first:pt-4">
      <div
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-cover"
        onClick={handleImageClicked}
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      >
        {imageUrl == '' && <UserRound className="h-6 w-6 stroke-[1.5px]" />}
      </div>
      <div className="flex grow flex-col">
        {editName ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              className="focus:outline-accent-400/60 w-full rounded-md bg-white px-2 outline-0 focus:outline-2"
              onBlur={handleBlur}
              onChange={handleChange}
              autoFocus
            />
          </form>
        ) : (
          <p
            className="cursor-pointer font-semibold"
            onClick={() => {
              setEditName(true);
              setEditEmail(false);
              setInput(member.displayName);
            }}
          >
            {member.displayName}
          </p>
        )}
        {editEmail ? (
          <form onSubmit={handleSubmit}>
            <input
              ref={emailInputRef}
              type="email"
              value={input}
              className="focus:outline-accent-400/60 w-full rounded-md bg-white px-2 outline-0 focus:outline-2"
              onBlur={handleEmailBlur}
              onChange={handleChange}
              autoFocus
            />
          </form>
        ) : (
          <p
            className={`${!member.email && 'empty'} text-ink-800/80 [.empty]:text-ink-400 cursor-pointer`}
            onClick={() => {
              setEditEmail(true);
              setEditName(false);
              setInput(member.email ?? '');
            }}
          >
            {member.email ? member.email : 'no email set'}
          </p>
        )}
      </div>
      <X onClick={handleClick} className="cursor-pointer" />
    </div>
  );
};

export default NewGroup;
