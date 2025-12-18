import { Group, SerializedGroup } from '../types';

export const serializeGroup = (group: Group) => {
  const serializedGroup: SerializedGroup = {
    ...group,
    invitedUids: [...(group?.invitedUids ?? [])],
  };

  return serializedGroup;
};

export const deserializeGroup = (group: SerializedGroup) => {
  if (!group) return;
  const deserializedGroup: Group = {
    ...group,
    invitedUids: new Set(group?.invitedUids ?? []),
  };

  return deserializedGroup;
};
