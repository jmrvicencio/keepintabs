import toast from 'react-hot-toast';

export function formattedStrToNum(val: string, useDecimals = false) {
  return useDecimals ? Number(val.replaceAll(',', '')) : Number(val.replaceAll('.', '').replaceAll(',', ''));
}

export function capitalize(val: string) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

export function tryWrap(func: () => any) {
  try {
    func();
  } catch (err) {
    const error = err as Error;
    toast.error(error.message);
    throw err;
  }
}
