import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../routes';

import Panel from '../../../components/neubrutalist/Panel';

const NewTransaction = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="relative flex w-full shrink-0 flex-col gap-8 p-3">
      <main className="flex w-full flex-col">
        <div className="mb-4 flex w-full flex-row justify-between">
          <Link to={ROUTES.APP} className="left-0 cursor-pointer">
            <Panel bgColor="bg-accent-200" className="text-ink-800 flex flex-row" dropOnClick={true}>
              Cancel
            </Panel>
          </Link>
          <div className="right-0 cursor-pointer">
            <Panel bgColor="bg-accent-200" className="text-ink-800 flex flex-row" dropOnClick={true}>
              Done
            </Panel>
          </div>
        </div>
        <h1 className="font-gieonto mt-4 text-left text-4xl font-medium">Create Group</h1>
        <form>
          <div className="relative">
            <div className="flex items-baseline justify-between py-2">
              <label htmlFor="name">Group Name</label>
            </div>
            <input
              id="name"
              type="text"
              autoComplete="off"
              className={`peer [.error]:border-error border-charcoal-300 focus:outline-accent-400/60 [.error]:placeholder:text-error w-full rounded-md border-1 bg-white px-2 py-1 focus:outline-2`}
              // placeholder={nameError ? 'Group name is required' : 'Group Name'}
              maxLength={32}
              // value={groupName}
              // onChange={handleGroupNameChange}
              autoFocus
            />
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewTransaction;
