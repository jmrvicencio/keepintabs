import { useState, useEffect, useMemo, ChangeEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

import Panel from '../../../components/neubrutalist/Panel';
import useDigitField from '../../../hooks/useDigitField';
import useInputField from '../../../hooks/useInputField';
import { useGroups } from '../../../features/groups/hooks/useGroups';
import { currentGroup } from '../../../store/currentGroup';
import useAddTransaction from '../../../features/groups/hooks/useAddTransaction';

const NewTransaction = () => {
  // Call Hooks
  const { groups, loading } = useGroups();
  const location = useLocation();
  const navigate = useNavigate();

  // Local States
  const [groupId, setGroupId] = useState(location.state?.groupId);
  const returnRoute = location.state?.groupId ? `${ROUTES.GROUPS}/${groupId}` : ROUTES.APP;

  // Form Values
  const { value: total, handleChange: handleTotalChanged } = useDigitField();
  const { value: description, handleChange: handleDescriptionChanged } = useInputField('');

  // Late Hooks
  const addTransaction = useAddTransaction(groupId);

  // Check if we should display subpage
  const [showSplitType, setShowSplitType] = useState(false);

  const groupName: string = useMemo(() => {
    let currGroupId: string = groupId;
    if (!groupId || loading) return ' ';

    if (!groupId) {
      const firstGroup = groups[0];
      currGroupId = firstGroup.id;
    }

    const currGroup = groups.find((group) => group.id == currGroupId);
    return currGroup!.data()!.name;
  }, [groupId, loading]);

  // Update the groupIds after groups are done loading
  useEffect(() => {
    if (loading) return;

    if (!groupId) {
      const firstGroup = groups[0];
      setGroupId(firstGroup.id);
    }
  }, [loading]);

  // Local Metods
  const handleDoneClicked = () => {
    addTransaction();
    navigate(returnRoute);
  };

  return (
    <div className="relative flex w-full shrink-0 flex-col gap-8 p-3">
      <main className="flex w-full flex-col">
        <div className="mb-4 flex w-full flex-row justify-between">
          <Link to={returnRoute} className="left-0 cursor-pointer">
            <Panel bgColor="bg-accent-200" className="text-ink-800 flex flex-row" dropOnClick={true}>
              Cancel
            </Panel>
          </Link>
          <div className="right-0 cursor-pointer">
            <Panel
              bgColor="bg-accent-200"
              className="text-ink-800 flex flex-row"
              dropOnClick={true}
              onClick={handleDoneClicked}
            >
              Done
            </Panel>
          </div>
        </div>
        <form className="px-4 outline-none">
          <div className="m-auto max-w-120 border-1 border-black bg-white p-6">
            <div className="border-ink-400 relative flex flex-col border-b-1 border-dashed py-6">
              <input
                id="total"
                type="text"
                autoComplete="off"
                step="off"
                min="0"
                inputMode="decimal"
                className={`peer w-full rounded-md border-0 text-center text-4xl font-bold outline-none`}
                maxLength={32}
                onChange={handleTotalChanged}
                value={total}
                autoFocus
              />
              <div className="flex flex-row justify-center">
                <label htmlFor="total" className="text-ink-400 pr-2 text-sm font-light">
                  Total Amount
                </label>
                <p className="font-bold">(PHP)</p>
              </div>
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
                  inputMode="text"
                  className={`placeholder-ink-400 w-full rounded-md border-0 text-right font-bold outline-none`}
                  maxLength={32}
                  value={description}
                  placeholder="Add a description"
                  onChange={handleDescriptionChanged}
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
                />
              </div>
            </div>
            <div className="border-ink-400 relative flex flex-col gap-1 border-b-1 border-dashed py-6 text-base">
              <div className="flex flex-row justify-between">
                <label htmlFor="description" className="text-ink-400 text-sm font-light">
                  Group:
                </label>
                <button type="button" className="border-ink-400 rounded-md border-1 px-3 py-0.5">
                  {groupName}
                </button>
              </div>
            </div>
            <div className="border-ink-400 relative flex flex-col gap-1 border-b-1 border-dashed py-6 text-base">
              <div className="flex flex-row items-center justify-between">
                <label htmlFor="description" className="text-ink-400 text-sm font-light">
                  Split Type:
                </label>
                <button type="button" className="border-ink-400 rounded-md border-1 px-3 py-0.5">
                  Itemized
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewTransaction;
