import { ChangeEvent, FormEvent, useState, KeyboardEvent, useRef } from 'react';
import { Link } from 'react-router-dom';

import { ChevronLeft, X, UserRound } from 'lucide-react';
import { ROUTES } from '../../routes';
import Button from '../../../components/buttons/Button';
import SmallButton from '../../../components/buttons/SmallButton';

interface Member {
  name: string;
  email?: string;
}

const NewGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleGroupNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleInviteNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInviteName(e.target.value);
  };

  const handleInviteEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(e.target.value);
  };

  const handleUserSubmit = (e: FormEvent) => {
    console.log('form enter');
    e.preventDefault();
    console.log('submitting form');
    handleAddMember();
  };

  const handleAddMember = () => {
    const newMember: Member = { name: inviteName };
    if (inviteEmail != '') newMember.email = inviteEmail;

    setMembers((prev) => [...prev, newMember]);
    setInviteEmail('');
    setInviteName('');
  };

  const handleRemoveMember = (nameToRemove: string) => {
    const nextMembers = members.filter((member) => {
      return member.name != nameToRemove;
    });

    setMembers(nextMembers);
  };

  const findMembers = (email: string, id: number) => {
    return members.filter((member, i) => {
      return member.email === email && id != i;
    });
  };

  return (
    <div className="relative flex w-dvw shrink-0 flex-col gap-8 p-3">
      <main className="flex w-full flex-col">
        <div className="relative mb-4 w-full">
          <Link to={ROUTES.APP} className="absolute left-0 cursor-pointer">
            <p className="text-accent-200 flex flex-row">
              <ChevronLeft />
              Cancel
            </p>
          </Link>
          <div className="absolute right-0 cursor-pointer">
            <p className="text-accent-200 flex flex-row">Done</p>
          </div>

          <h1 className="font-medium">Create Group</h1>
        </div>
        <form
          onSubmit={() => {
            console.log('submitting name form');
          }}
        >
          <div className="relative mx-2">
            <div className="text-cream/70 flex items-baseline justify-between py-2">
              <label htmlFor="name">Group Name</label>
              <p className="text-xs">{groupName.length}/32</p>
            </div>
            <input
              id="name"
              type="text"
              autoComplete="off"
              className="peer border-charcoal-300 bg-charcoal-300/20 focus:outline-accent-400/60 w-full rounded-md border-1 px-2 py-1 focus:outline-2"
              placeholder="New Group"
              maxLength={32}
              value={groupName}
              onChange={handleGroupNameChange}
              autoFocus
            />
          </div>
        </form>
        <div className="relative m-4 mx-2 pt-2 text-left">
          <h2 className="font-bold">Add Members</h2>
          <p className="text-cream/70 mb-2 text-sm">User will get a notification if the account exists</p>
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
                className="border-charcoal-300 bg-charcoal-300/20 focus:outline-accent-400/60 w-0 grow-2 rounded-md border-1 px-2 py-1 focus:outline-2"
                placeholder="Name"
                value={inviteName}
                onChange={handleInviteNameChange}
              />
              <input
                id="email"
                type="email"
                className="border-charcoal-300 bg-charcoal-300/20 focus:outline-accent-400/60 w-0 grow-3 rounded-md border-1 px-2 py-1 not-focus:invalid:border-red-500 focus:outline-2"
                placeholder="Email (optional)"
                value={inviteEmail}
                onChange={handleInviteEmailChange}
                required={false}
              />
            </div>

            <button style={{ display: 'none' }} type="submit" />
            <SmallButton inactive={inviteName != '' ? false : true} onClick={handleAddMember}>
              Add Member
            </SmallButton>
          </form>
          {members.length > 0 && (
            <div className="border-charcoal-300 mt-6 rounded-lg border-1 p-2">
              {members.map((member, i) => (
                <AddedUser
                  key={i}
                  id={i}
                  member={member}
                  onClick={() => {
                    handleRemoveMember(member.name);
                  }}
                  setMembers={setMembers}
                  findMembers={findMembers}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
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
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [input, setInput] = useState('');
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

      if (editName) nextMember.name = input;
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

  return (
    <div className="border-charcoal-300/30 flex flex-row items-center gap-3 not-first:mt-2 not-first:border-t-1 not-first:pt-4">
      <UserRound className="text-cream/60 h-5 w-5" />
      <div className="flex grow-1 flex-col">
        {editName ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              className="focus:outline-accent-400/60 bg-charcoal-300/20 w-full rounded-md px-2 outline-0 focus:outline-2"
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
              setInput(member.name);
            }}
          >
            {member.name}
          </p>
        )}
        {editEmail ? (
          <form onSubmit={handleSubmit}>
            <input
              ref={emailInputRef}
              type="email"
              value={input}
              className="focus:outline-accent-400/60 bg-charcoal-300/20 w-full rounded-md px-2 outline-0 focus:outline-2"
              onBlur={handleEmailBlur}
              onChange={handleChange}
              autoFocus
            />
          </form>
        ) : (
          <p
            className="text-cream/70 cursor-pointer"
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
