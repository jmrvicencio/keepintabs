export type Notification = NotificationInvite;

export interface NotificationInvite {
  type: 'invite';
  invitedBy: string;
  groupId: string;
  groupName: string;
  inviteKey: string;
  seen: boolean;
}
