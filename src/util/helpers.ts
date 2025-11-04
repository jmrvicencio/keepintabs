export function formattedStrToNum(val: string, useDecimals = false) {
  return useDecimals ? Number(val.replaceAll(',', '')) : Number(val.replaceAll('.', '').replaceAll(',', ''));
}
