import { useState, useEffect, useMemo, ChangeEvent, KeyboardEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { type DocumentSnapshot } from 'firebase/firestore';
import { auth } from '../../../lib/firebase/auth';
import { format } from 'date-fns';

import { usePopupMenu } from '../../../features/popup-menu/hooks/usePopupMenu';
import { useGroups } from '../../../features/groups/hooks/useGroups';
import { Group } from '../../../features/groups/types';
import { getMemberPhotoUrl } from '../../../features/groups/utils/memberUtil';
import useDigitField from '../../../hooks/useDigitField';
import useInputField from '../../../hooks/useInputField';
import Panel from '../../../components/neubrutalist/Panel';
import useAddTransaction from '../../../features/groups/hooks/useAddTransaction';
import { User as UserIcon } from 'lucide-react';

const NewTransaction = () => {
  // Call Hooks
  const { groups, loading } = useGroups();
  const location = useLocation();
  const navigate = useNavigate();
  // Local States
  const [groupId, setGroupId] = useState(location.state?.groupId);
  const returnRoute = location.state?.groupId ? `${ROUTES.GROUPS}/${groupId}` : ROUTES.APP;
  // Late Hooks
  const addTransaction = useAddTransaction(groupId);

  const currGroup = useMemo(() => {
    let currGroupId: string = groupId;
    if (!groupId || loading) return undefined;

    if (!groupId) {
      const firstGroup = groups[0];
      currGroupId = firstGroup.id;
    }

    const currGroup = groups.find((group) => group.id == currGroupId);
    return currGroup;
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
        <TransactionForm currGroup={currGroup} />
      </main>
    </div>
  );
};

const TransactionForm = ({ currGroup }: { currGroup?: DocumentSnapshot<Group> }) => {
  // Hooks
  const { setShowPopup, setPopup } = usePopupMenu();

  // Local States
  const { value: total, handleChange: handleTotalChanged } = useDigitField();
  const { value: description, handleChange: handleDescriptionChanged } = useInputField('');
  const [date, setDate] = useState(Date.now());
  const [paidById, setPaidById] = useState(auth.currentUser!.uid);
  const [paidByPhotoUrl, setPaidByPhotoUrl] = useState<string | undefined>(undefined);
  const [showPaidBy, setShowPaidby] = useState(false);

  // Computed Values
  const paidByName =
    currGroup && paidById in currGroup.data()?.members!
      ? currGroup.data()?.members[paidById].displayName
      : auth.currentUser!.displayName;
  console.log(paidByPhotoUrl);
  const groupName: string = currGroup && currGroup.data() ? currGroup.data()!.name : ' ';
  const dateString = format(date, 'dd/MM/yy (K:mm bbb)');

  // Update PaidById to the groupId of user so the uids match.
  // (groupUID might be different from users uid)
  useEffect(() => {
    if (!currGroup) return;
    if (paidById == auth.currentUser!.uid) {
      const member = Object.entries(currGroup!.data()!.members).find(
        ([key, val]) => val.linkedUid == auth.currentUser!.uid,
      );
      setPaidById(member && member[0] ? member[0] : Object.keys(currGroup!.data()!.members)[0]);
    }
  }, [currGroup]);

  useEffect(() => {
    const updatePaidByPhotoUrl = async () => {
      setPaidByPhotoUrl(currGroup ? await getMemberPhotoUrl(currGroup!.data()!, paidById) : undefined);
    };

    updatePaidByPhotoUrl();
  }, [currGroup]);

  // Update the popup when the currGroup has finished loading
  useEffect(() => {
    if (!currGroup || !showPaidBy) return;

    handlePaidByClicked();
  }, [currGroup]);

  // Local Methods
  const handlePaidByClicked = async () => {
    const members = currGroup?.data() ? (currGroup.data()?.members ? currGroup.data()!.members : {}) : {};
    let memberPhotoUrls: (string | undefined)[] = [];

    if (currGroup) {
      memberPhotoUrls = await Promise.all(
        Object.entries(members).map(([groupUid, val]) => {
          return getMemberPhotoUrl(currGroup.data()!, groupUid);
        }),
      );
    }

    const handleMemberClicked = (memberId: string) => () => {
      setPaidById(memberId);
      setShowPopup(false);
      setShowPaidby(false);
    };

    const handlePayerKeyDown = (memberId: string) => (e: KeyboardEvent) => {
      if (e.key == 'Enter' || e.key == ' ') {
        handleMemberClicked(memberId)();
      }
    };

    const memberList = (
      <div className="flex flex-col gap-2">
        {Object.entries(members).map(([memberId, member], i) => (
          <div
            key={memberId}
            role="button"
            tabIndex={0}
            onKeyDown={handlePayerKeyDown(memberId)}
            onClick={handleMemberClicked(memberId)}
            className="relative flex h-8 cursor-pointer flex-row items-center"
          >
            <div
              className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-lg border-1 bg-cover"
              style={{ backgroundImage: `url('${memberPhotoUrls[i]}')` }}
            >
              {!memberPhotoUrls[i] && <UserIcon className="text-ink-400" />}
            </div>
            <p className="grow">{member.displayName}</p>
          </div>
        ))}
      </div>
    );

    setPopup((prev) => ({
      title: 'Paid By',
      body: memberList,
      closeCallback: () => setShowPaidby(false),
    }));

    setShowPaidby(true);
    setShowPopup(true);
  };

  return (
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
        <div className="border-ink-400 relative flex flex-col gap-2 border-b-1 border-dashed py-6 text-base">
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
            <div className="flex grow-1 flex-row items-center justify-end gap-2">
              <div
                className="flex h-6 w-6 items-center justify-center overflow-clip rounded-full border-1 bg-cover"
                style={{
                  backgroundImage: `url('${paidByPhotoUrl}')`,
                }}
              >
                {paidByPhotoUrl == undefined && <UserIcon className="text-ink-400 h-5 w-5" />}
              </div>
              <input
                id="paid_by"
                type="button"
                className={`w-fit cursor-pointer rounded-md border-0 text-right font-bold outline-none`}
                value={paidByName ?? ''}
                onClick={handlePaidByClicked}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <label htmlFor="date" className="text-ink-400 text-sm font-light">
              Date:
            </label>
            <input
              id="date"
              type="button"
              className={`w-1 grow-1 cursor-pointer rounded-md border-0 text-right font-bold outline-none`}
              value={dateString}
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
  );
};

export default NewTransaction;
