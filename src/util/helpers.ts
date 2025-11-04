export function formattedStrToNum(val: string, ignoreDecimals = false) {
  return !ignoreDecimals ? Number(val.replaceAll(',', '')) : Number(val.replaceAll('.', '').replaceAll(',', ''));
}
