// Day 25 のモジュール: 税金と金額表示の関数をまとめたファイル
// export を付けたものだけが、他のファイルから import できる

// 税率は 8 か 10 のどちらか (それ以外の数値はコンパイル時にエラーにできる)
export type TaxRate = 8 | 10;

export function withTax(price: number, rate: TaxRate = 10): number {
  return Math.floor((price * (100 + rate)) / 100);
}

export const yen = (n: number): string => `${n.toLocaleString("ja-JP")}円`;
