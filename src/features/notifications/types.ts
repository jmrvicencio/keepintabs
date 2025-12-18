export type Notification = NotificationInvite;

export interface NotificationInvite {
  type: 'invite';
  invitedBy: string;
  groupId: string;
  groupName: string;
  memberUid: string;
  inviteKey: string;
  seen: boolean;
}
