import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../routes';

import Panel from '../../../components/neubrutalist/Panel';
import PanelButton from '../../../components/neubrutalist/PanelButton';

const NewTransaction = () => {
  const [total, setTotal] = useState('4,231.00');
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
        {/* <h1 className="font-gieonto mt-4 text-left text-4xl font-medium">New Transaction</h1> */}
        <form className="px-4 outline-none">
          <div className="m-auto max-w-120 border-1 border-black bg-white p-6">
            <div className="border-ink-400 relative flex flex-col border-b-1 border-dashed py-6">
              <input
                id="name"
                type="text"
                autoComplete="off"
                step="off"
                min="0"
                inputMode="decimal"
                className={`peer w-full rounded-md border-0 text-center text-4xl font-bold outline-none`}
                maxLength={32}
                value={total}
                autoFocus
              />
              <p className="text-ink-400 pr-2 text-sm font-light">
                Total Amount <span className="font-bold">(PHP)</span>
              </p>
            </div>
            <div className="border-ink-400 relative flex flex-col gap-1 border-b-1 border-dashed py-6 text-base">
              <p className="text-ink-400 mb-2 font-light">(Tap on items to edit)</p>
              <div className="flex flex-row">
                <label htmlFor="description" className="text-ink-400 text-sm font-light">
                  Description:
                </label>
                <input
                  id="description"
                  type="text"
                  autoComplete="off"
                  step="off"
                  min="0"
                  inputMode="decimal"
                  className={`w-full rounded-md border-0 text-right font-bold outline-none`}
                  maxLength={32}
                  value={total}
                  autoFocus
                />
              </div>
              <div className="flex flex-row">
                <label htmlFor="paid_by" className="text-ink-400 text-sm font-light">
                  Paid By:
                </label>
                <input
                  id="paid_by"
                  type="text"
                  autoComplete="off"
                  step="off"
                  min="0"
                  inputMode="decimal"
                  className={`w-1 grow-1 rounded-md border-0 text-right font-bold outline-none`}
                  maxLength={32}
                  value={total}
                  autoFocus
                />
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewTransaction;
