export type Notification = NotificationInvite;

export interface NotificationInvite {
  type: 'invite';
  inviteKey: string;
  seen: boolean;
  groupId: string;
}
