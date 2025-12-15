export type Notification = NotificationInvite;

interface NotificationInvite {
  type: 'invite';
  inviteKey: string;
  seen: boolean;
  groupId: string;
}
