import { Group } from '../types';
import { getUser } from '../../users/utils/getUsers';

/**
 * Checks if a user record exists for the member and returns the photoUrl of that user
 *
 * @param group - the group to check
 * @param groupUid - uid of the user in the group.
 */
export const getMemberPhotoUrl = async (group: Group, groupUid: string): Promise<string | undefined> => {
  // return undefined;
  if (!(groupUid in group.members)) return undefined;

  const member = group.members[groupUid];
  const memberLinkedUid = member?.linkedUid;

  if (memberLinkedUid) {
    const memberUser = await getUser(memberLinkedUid);
    if (memberUser && memberUser.photoUrl) return memberUser.photoUrl;
  }

  return member.photoUrl;
};
