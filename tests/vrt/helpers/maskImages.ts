/**
 * 指定したセレクタに合致する img 要素をマゼンタ (#ff00ff) の単色画像に
 * 置き換えてマスクするヘルパー。
 *
 * VRT 環境で読み込めない/不安定な画像（外部 URL の画像やアバターなど）を
 * 明示的に塗り潰すことで、スクリーンショット差分の原因を取り除く。
 */
const MAGENTA_PIXEL =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 1 1'><rect width='1' height='1' fill='%23ff00ff'/></svg>";

export const maskImages = (selectors: string | string[]) => {
  const joined = (Array.isArray(selectors) ? selectors : [selectors]).join(", ");
  const style = document.createElement("style");
  style.textContent = `
    ${joined} {
      content: url("${MAGENTA_PIXEL}") !important;
    }
  `;
  document.head.appendChild(style);
};
