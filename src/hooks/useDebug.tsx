import { useAtom } from 'jotai';
import { debugOptionsAtom } from '../store/debugItems';

export const useDebug = () => {
  const [options, setOptions] = useAtom(debugOptionsAtom);

  const addOption = (text: string, action: () => void) => {
    setOptions((prev) => ({ ...prev, [text]: action }));
  };

  const removeOption = (text: string) => {
    setOptions((prev) => {
      const { [text]: _, ...cleaned } = prev;
      return cleaned;
    });
  };

  return { options, addOption, removeOption };
};
