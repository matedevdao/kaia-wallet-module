import { Dom } from "@commonmodule/app";
import { getAddress } from "viem";
const ELEMENTS = 3;
const SIZE = 80;
function hashCode(name) {
    var hash = 0;
    for (var i = 0; i < name.length; i++) {
        var character = name.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash;
    }
    return Math.abs(hash);
}
function getRandomColor(number, colors, range) {
    return colors[number % range];
}
function getDigit(number, ntn) {
    return Math.floor((number / Math.pow(10, ntn)) % 10);
}
function getUnit(number, range, index) {
    let value = number % range;
    if (index && ((getDigit(number, index) % 2) === 0)) {
        return -value;
    }
    else
        return value;
}
function generateColors(name, colors) {
    const numFromName = hashCode(name);
    const range = colors && colors.length;
    const elementsProperties = Array.from({ length: ELEMENTS }, (_, i) => ({
        color: getRandomColor(numFromName + i, colors, range),
        translateX: getUnit(numFromName * (i + 1), SIZE / 10, 1),
        translateY: getUnit(numFromName * (i + 1), SIZE / 10, 2),
        scale: 1.2 + getUnit(numFromName * (i + 1), SIZE / 20) / 10,
        rotate: getUnit(numFromName * (i + 1), 360, 1),
    }));
    return elementsProperties;
}
export default class KaiaWalletAddressAvatarsAvatar extends Dom {
    constructor(walletAddress, options) {
        super(".kaia-wallet-avatar");
        walletAddress = getAddress(walletAddress);
        const properties = generateColors(walletAddress, [
            "#92A1C6",
            "#146A7C",
            "#F0AB3D",
            "#ADD8E6",
            "#FF6347",
        ]);
        const maskId = `mask_${hashCode(walletAddress)}`;
        this.htmlElement.innerHTML =
            `<svg viewBox="0 0 ${SIZE} ${SIZE}" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="${options.size}" height="${options.size}">
  <mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${SIZE}" height="${SIZE}">
    <rect width="${SIZE}" height="${SIZE}" fill="#FFFFFF" rx="${SIZE * 2}"></rect>
  </mask>
  <g mask="url(#${maskId})">
    <rect width="${SIZE}" height="${SIZE}" fill="${properties[0].color}"></rect>
    <path filter="url(#filter_${maskId})" d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z" fill="${properties[1].color}" transform="${"translate(" +
                properties[1].translateX +
                " " +
                properties[1].translateY +
                ") rotate(" +
                properties[1].rotate +
                " " +
                SIZE / 2 +
                " " +
                SIZE / 2 +
                ") scale(" +
                properties[2].scale +
                ")"}"></path>
    <path filter="url(#filter_${maskId})" d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z" fill="${properties[2].color}" transform="${"translate(" +
                properties[2].translateX +
                " " +
                properties[2].translateY +
                ") rotate(" +
                properties[2].rotate +
                " " +
                SIZE / 2 +
                " " +
                SIZE / 2 +
                ") scale(" +
                properties[2].scale +
                ")"}" style="mix-blend-mode: overlay;"></path>
  </g>
  <defs>
    <filter id="filter_${maskId}" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
      <feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur"></feGaussianBlur>
    </filter>
  </defs>
</svg>`;
    }
}
//# sourceMappingURL=KaiaWalletAddressAvatar.js.map