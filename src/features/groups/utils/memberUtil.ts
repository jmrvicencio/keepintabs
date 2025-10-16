import { Group } from '../types';
import { getUser } from '../../users/utils/getUsers';

// Checks if a user record exists for the member and returns the photoUrl of that user
export const getMemberPhotoUrl = async (group: Group, memberId: string | undefined): Promise<string | undefined> => {
  if (!memberId || !(memberId in group.members)) return undefined;

  const member = group.members[memberId];
  const memberLinkedUid = member?.linkedUid;

  if (memberLinkedUid) {
    const memberUser = await getUser(memberLinkedUid);
    if (memberUser && memberUser.photoUrl) return memberUser.photoUrl;
  }

  return member.photoUrl;
};
