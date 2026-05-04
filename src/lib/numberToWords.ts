export function numberToWords(num: number): string {
  if (num === 0) return 'Zero';
  if (isNaN(num)) return '';

  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

  function convertChunk(n: number): string {
    let str = '';
    if (n >= 100) {
      str += ones[Math.floor(n / 100)] + ' Hundred';
      n %= 100;
      if (n > 0) str += ' and ';
    }
    if (n >= 20) {
      str += tens[Math.floor(n / 10)];
      n %= 10;
      if (n > 0) str += '-' + ones[n];
    } else if (n > 0) {
      str += ones[n];
    }
    return str;
  }

  const parts: string[] = [];
  let scaleIndex = 0;
  let remaining = Math.floor(num);

  while (remaining > 0) {
    const chunk = remaining % 1000;
    if (chunk > 0) {
      const chunkStr = convertChunk(chunk);
      parts.unshift(scales[scaleIndex] ? `${chunkStr} ${scales[scaleIndex]}` : chunkStr);
    }
    remaining = Math.floor(remaining / 1000);
    scaleIndex++;
  }

  // Handle kobo (decimals)
  const decimal = Math.round((num % 1) * 100);
  let result = parts.join(', ') + ' Naira';
  if (decimal > 0) {
    result += ` and ${convertChunk(decimal)} Kobo`;
  }
  return result + ' Only';
}
