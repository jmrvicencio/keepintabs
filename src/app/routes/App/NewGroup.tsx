import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { ChevronLeft } from 'lucide-react';
import { ROUTES } from '../../routes';

const NewGroup = () => {
  const [groupName, setGroupName] = useState('');

  const handleGroupNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleUserSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('submitting form');
  };

  return (
    <div className="relative flex w-dvw shrink-0 flex-col gap-8 p-3">
      <main className="flex w-full flex-col">
        <div className="relative mb-4 w-full">
          <Link to={ROUTES.APP} className="absolute left-0">
            <p className="text-accent-200 pointer-cursor flex flex-row">
              <ChevronLeft />
              Cancel
            </p>
          </Link>
          <Link to={ROUTES.APP} className="absolute right-0">
            <p className="text-accent-200 pointer-cursor flex flex-row">Done</p>
          </Link>

          <h1 className="font-medium">Create Group</h1>
        </div>
        <form>
          <div className="relative mx-2">
            <div className="text-cream/70 flex items-baseline justify-between py-2">
              <label htmlFor="name">Group Name</label>
              <p className="text-xs">{groupName.length}/32</p>
            </div>
            <input
              id="name"
              type="text"
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
          <form onSubmit={handleUserSubmit} autoComplete="false" className="flex flex-row gap-2">
            <input
              id="name"
              type="text"
              className="border-charcoal-300 bg-charcoal-300/20 focus:outline-accent-400/60 w-0 grow-2 rounded-md border-1 px-2 py-1 focus:outline-2"
              placeholder="Name"
              value={groupName}
              onChange={handleGroupNameChange}
            />
            <input
              id="name"
              type="email"
              className="border-charcoal-300 bg-charcoal-300/20 focus:outline-accent-400/60 w-0 grow-3 rounded-md border-1 px-2 py-1 focus:outline-2"
              placeholder="Email (optional)"
              value={groupName}
              onChange={handleGroupNameChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewGroup;
