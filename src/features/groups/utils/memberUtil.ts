import { Group, Member, SerializedGroup } from '../types';
import { getUser } from '../../users/utils/getUsers';
import { deserializeGroup } from './serializer';

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

export const getUserGroupId = (uid: string, group?: Group) => {
  const members = group?.members ?? {};
  const userGroupId = Object.entries(members).find(([userGroupId, member]) => uid == member.linkedUid);

  return userGroupId?.[0];
};

/**
 * Returns a list of only the active members from an array of all members
 */
export const getActiveMembers = (members: Record<string, Member>): Record<string, Member> => {
  return Object.entries(members).reduce((acc, [key, val]) => {
    return val.active ? { ...acc, [key]: val } : acc;
  }, {});
};

/**
 * Returns a group with inactive members filtered out
 */
export const filterActiveMembers = (group: Group | SerializedGroup): Group => {
  return deserializeGroup({
    ...group,
    members: getActiveMembers(group.members),
  })!;
};
