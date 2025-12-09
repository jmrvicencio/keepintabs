import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  type KeyboardEvent,
  ForwardedRef,
  FocusEvent,
} from 'react';
import { type DocumentSnapshot } from 'firebase/firestore';
import { auth } from '@/lib/firebase/auth';
import { format } from 'date-fns';
import { buttonHandleKeypress } from '@/util/buttonHandleKeypress';
import { FormRef, SplitData, SplitTotal } from '@/features/transactions/types';
import { capitalize, formattedStrToNum } from '@/util/helpers';
import { formatValue as formatToDigit } from '@/hooks/useDigitField';

// Import Custom Components
import { User as UserIcon, ListFilter, X } from 'lucide-react';
import DatePicker from '@/features/date-picker/DatePicker';

// Import Custom Hooks
import { usePopupOverlay } from '@/features/popup-menu/hooks/usePopupOverlay';
import { Group } from '@/features/groups/types';
import { DigitField } from '@/hooks/useDigitField';
import { InputField } from '@/hooks/useInputField';

const TransactionForm = forwardRef(
  (
    {
      total: { value: total, setValue: setTotal, handleChange: handleTotalChanged },
      description: { value: description, handleChange: handleDescriptionChanged },
      currGroup,
      setShowSplitPage,
      paidBy: [paidById, setPaidById],
      date: [date, setDate],
      splitData,
      splitTotals,
      memberPhotoUrls,
    }: {
      total: DigitField;
      description: InputField;
      currGroup: Group;
      setShowSplitPage: (val: boolean) => any;
      paidBy: [string, (val: string) => any];
      date: [number, (val: number) => any];
      splitData: SplitData;
      splitTotals: SplitTotal;
      memberPhotoUrls: Record<string, string | undefined>;
    },
    ref: ForwardedRef<FormRef>,
  ) => {
    // ------------------------------
    // Hooks
    // ------------------------------

    const { setShowPopup, setPopup, resetPopup } = usePopupOverlay();

    // ------------------------------
    // States
    // ------------------------------

    // Local States
    const totalInputRef = useRef<HTMLInputElement>(null);
    const [showPaidBy, setShowPaidby] = useState(false); // used to prevent paidBy popup when memberPhotoUrls has reloaded

    // ------------------------------
    // Computed Values
    // ------------------------------

    const paidByName =
      currGroup && paidById in currGroup?.members!
        ? currGroup?.members[paidById].displayName
        : auth.currentUser!.displayName;
    const paidByPhotoUrl = paidById in memberPhotoUrls ? memberPhotoUrls[paidById] : undefined;
    const groupName: string = currGroup && currGroup ? currGroup!.name : ' ';
    const dateString = format(date, 'dd/MM/yy');
    const timeString = format(date, 'K:mm aaa');
    const memberIds: Set<string> = currGroup ? new Set(Object.keys(currGroup!.members)) : new Set();

    // Update PaidById to the groupId of user so the uids match.
    // (groupUID might be different from users uid)
    useEffect(() => {
      if (!currGroup) return;

      if (paidById == auth.currentUser!.uid) {
        const member = Object.entries(currGroup!.members).find(([key, val]) => val.linkedUid == auth.currentUser!.uid);
        setPaidById(member && member[0] ? member[0] : Object.keys(currGroup!.members)[0]);
      }
    }, [currGroup]);

    // Update the popup when the currGroup or memberPhotoUrls has finished loading
    useEffect(() => {
      if (!currGroup || !showPaidBy) return;

      handlePaidByClicked();
    }, [currGroup, memberPhotoUrls]);

    // ------------------------------
    // Imperative Handle for Ref
    // ------------------------------

    useImperativeHandle(ref, () => ({
      getData: () => {
        let splits: number = Object.keys(splitTotals).length;

        return {
          paidBy: paidById,
          date,
          description,
          amount: formattedStrToNum(total),
          splits,
          splitData,
        };
      },
    }));

    // ------------------------------
    // Event Handlers
    // ------------------------------

    // Call Paid By Popup
    const handlePaidByClicked = () => {
      const members = currGroup ? (currGroup?.members ? currGroup!.members : {}) : {};

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
          {Object.entries(members).map(([memberId, member]) => (
            <div
              key={memberId}
              role="button"
              tabIndex={0}
              onKeyDown={handlePayerKeyDown(memberId)}
              onClick={handleMemberClicked(memberId)}
              className="relative flex h-8 cursor-pointer flex-row items-center"
            >
              <div
                className="border-ink-400 absolute left-0 flex h-8 w-8 items-center justify-center rounded-lg border bg-cover"
                style={{ backgroundImage: `url('${memberPhotoUrls[memberId]}')` }}
              >
                {!memberPhotoUrls[memberId] && <UserIcon className="text-ink-400" />}
              </div>
              <p className="grow">{member.displayName}</p>
            </div>
          ))}
        </div>
      );

      setPopup((prev) => ({
        type: 'popup-overlay',
        title: 'Paid By',
        body: memberList,
        closeCallback: () => setShowPaidby(false),
      }));

      setShowPaidby(true);
      setShowPopup(true);
    };

    // Call DatePicker Popup
    const handleDateClicked = async () => {
      let _selectedDate: Date | undefined = new Date(date);
      const handleDoneCLicked = () => {
        if (_selectedDate) {
          setDate(_selectedDate.getTime());
        }
        resetPopup();
      };

      // DatePicker Popup JSX
      const PopupElement = () => (
        <>
          <DatePicker
            initialDate={new Date(date)}
            setDateSelected={(date: Date | undefined) => {
              _selectedDate = date;
            }}
          />
          <div className="mt-4 flex w-full flex-row justify-end gap-2">
            <input
              type="button"
              value="Cancel"
              onClick={resetPopup}
              className="border-ink-400 rounded-xl border px-2 py-1"
            />
            <input
              type="button"
              value="Done"
              onClick={handleDoneCLicked}
              className="bg-accent-200 rounded-xl border px-2 py-1"
            />
          </div>
        </>
      );

      setPopup((prev) => ({
        type: 'popup-overlay',
        title: 'Date',
        body: <PopupElement />,
      }));

      setShowPopup(true);
    };

    const handleTotalFocused = (e: FocusEvent<HTMLInputElement>) => {
      const el = totalInputRef.current;
      console.log('item focused', el);
      // const el = e.currentTarget;
      setTimeout(() => {
        if (el) {
          const length = el.value.length;
          el.setSelectionRange(length, length);
        }
      }, 0);
    };

    console.log(splitData.data);

    return (
      <form className="min-w-80 px-2 outline-none">
        <div className="m-auto max-w-120 border border-black bg-white p-6">
          <div className="border-ink-400 relative flex flex-col border-b border-dashed py-6">
            <input
              id="total"
              ref={totalInputRef}
              type="text"
              autoComplete="off"
              step="off"
              min="0"
              inputMode="decimal"
              className={`peer font-cascadia-code w-full rounded-md border-0 text-center text-4xl font-bold outline-none`}
              maxLength={32}
              onChange={handleTotalChanged}
              // onFocus={handleTotalFocused}
              onFocusCapture={handleTotalFocused}
              value={total}
              readOnly={splitData.type == 'itemized'}
              autoFocus
            />
            <div className="flex flex-row items-end justify-center">
              <label htmlFor="total" className="text-ink-400 pr-2 text-sm font-light">
                Total Amount
              </label>
              <p className="font-bold">(PHP)</p>
            </div>
            {splitData.type == 'itemized' && (
              <p className="text-ink-400 text-sm font-light">(Total Amount cannot be edited for itemized split type)</p>
            )}
          </div>
          <div className="border-ink-400 relative flex flex-col gap-2 border-b border-dashed py-6 text-base">
            <p className="text-ink-400 mb-2 font-light">(Tap on items to edit)</p>
            <div className="flex flex-row items-center">
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
                className={`${description == '' && 'empty'} placeholder-ink-400 w-full rounded-md border-0 text-right font-medium outline-none [.empty]:font-normal`}
                maxLength={32}
                value={description}
                placeholder="Add a description"
                onChange={handleDescriptionChanged}
              />
            </div>
            <div className="flex flex-row items-center">
              <label htmlFor="paid_by" className="text-ink-400 text-sm font-light">
                Paid By:
              </label>
              <div className="flex grow flex-row items-center justify-end gap-2">
                <div
                  className="border-ink-400 flex h-5 w-5 items-center justify-center overflow-clip rounded-full border bg-cover"
                  style={{
                    backgroundImage: `url('${paidByPhotoUrl}')`,
                  }}
                >
                  {paidByPhotoUrl == undefined && <UserIcon className="text-ink-400 h-4 w-4" />}
                </div>
                <input
                  id="paid_by"
                  type="button"
                  className={`w-fit cursor-pointer rounded-md border-0 text-right font-medium outline-none`}
                  value={paidByName ?? ''}
                  onClick={handlePaidByClicked}
                />
              </div>
            </div>
            <div className="flex flex-row items-center">
              <label htmlFor="date" className="text-ink-400 text-sm font-light">
                Date:
              </label>
              <div
                id="date"
                role="button"
                tabIndex={0}
                onKeyDown={buttonHandleKeypress(handleDateClicked)}
                className={`flex w-1 grow cursor-pointer flex-col rounded-md border-0 text-right font-medium outline-none`}
                onClick={handleDateClicked}
              >
                {dateString} <span className="text-ink-400 text-sm font-normal">{`(${timeString})`}</span>
              </div>
            </div>
          </div>
          <div className="border-ink-400 relative flex flex-col gap-1 border-b border-dashed py-6 text-base">
            <div className="flex flex-row justify-between">
              <label htmlFor="description" className="text-ink-400 text-sm font-light">
                Group:
              </label>
              <button type="button" className="border-ink-400 rounded-md border px-3 py-0.5">
                {groupName}
              </button>
            </div>
          </div>
          <div className="border-ink-400 relative flex flex-col gap-1 border-b border-dashed py-6 text-base">
            <div className="flex flex-row items-center justify-between">
              <label htmlFor="split-type" className="text-ink-400 text-sm font-light">
                Split Type:
              </label>
              <input
                type="button"
                name="split-type"
                id="split-type"
                className="border-ink-400 cursor-pointer rounded-md border px-3 py-0.5"
                onClick={() => setShowSplitPage(true)}
                value={capitalize(splitData.type)}
              />
            </div>
          </div>
          <div className="relative flex flex-col gap-1 py-6 text-base">
            {splitData.type == 'balanced' ? (
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between">
                  <label htmlFor="balanced-split" className="text-ink-400 text-left text-sm font-light">
                    Per member:
                  </label>
                  <input
                    type="text"
                    name="balanced-split"
                    id="balanced-split"
                    className="field-sizing-content py-0.5 outline-0"
                    readOnly={true}
                    value={(() => {
                      const totalNum = formattedStrToNum(total);
                      const toSplit = splitData.data.payingMembers.size;
                      const splitTotal = formatToDigit(Math.floor(totalNum / toSplit));
                      return `php ${splitTotal}`;
                    })()}
                  />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="user-icons -gap-2 flex">
                    {[...splitData.data.payingMembers].map((memberGroupId) => {
                      const photoUrl = memberPhotoUrls[memberGroupId];
                      return (
                        <div
                          key={memberGroupId}
                          {...(photoUrl && {
                            style: {
                              backgroundImage: `url(${photoUrl})`,
                            },
                          })}
                          data-testid="balanced-member-photo"
                          className="h-6 w-6 rounded-full border border-white bg-gray-200 bg-cover not-first:-ml-1"
                        />
                      );
                    })}
                  </div>
                  <p className="text-ink-400 text-sm">
                    {splitData.data.payingMembers.size} split{splitData.data.payingMembers.size > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {splitData.data.entries.map((entry, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex flex-row justify-between">
                      <p className="text-ink-400 text-left text-sm font-light">
                        {entry.description == '' ? '(No Description)' : entry.description}
                      </p>
                      <p aria-label={`${entry.description} amount`}>{formatToDigit(entry.amount)}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row">
                        {[...entry.payingMembers].map((memberGroupId) => {
                          const photoUrl = memberPhotoUrls[memberGroupId];
                          return (
                            <div
                              key={memberGroupId}
                              {...(photoUrl && {
                                style: {
                                  backgroundImage: `url(${photoUrl})`,
                                },
                              })}
                              data-testid="balanced-member-photo"
                              className="h-6 w-6 rounded-full border border-white bg-gray-200 bg-cover not-first:-ml-1"
                            />
                          );
                        })}
                      </div>
                      <p className="text-ink-400 text-left text-sm font-light">{entry.payingMembers.size} splits</p>
                    </div>
                  </div>
                ))}
                {splitData.data.remainder.amount > 0 && (
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                      <p className="text-ink-400 text-left text-sm font-light">Remainder</p>
                      <p aria-label="remainder amount">{formatToDigit(splitData.data.remainder.amount)}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row">
                        {[...splitData.data.remainder.payingMembers].map((memberGroupId) => {
                          const photoUrl = memberPhotoUrls[memberGroupId];
                          return (
                            <div
                              key={memberGroupId}
                              {...(photoUrl && {
                                style: {
                                  backgroundImage: `url(${photoUrl})`,
                                },
                              })}
                              data-testid="balanced-member-photo"
                              className="h-6 w-6 rounded-full border border-white bg-gray-200 bg-cover not-first:-ml-1"
                            />
                          );
                        })}
                      </div>
                      <p className="text-ink-400 text-left text-sm font-light">{memberIds.size} splits</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </form>
    );
  },
);

export default TransactionForm;
