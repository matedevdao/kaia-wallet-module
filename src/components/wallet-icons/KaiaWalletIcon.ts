import { DomNode } from "@commonmodule/app";

export default class KaiaWalletIcon extends DomNode {
  constructor() {
    super(".icon.kaia-wallet");
    this.htmlElement.innerHTML =
      `<svg width="40" height="40" version="1.0" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
<path transform="translate(0)" d="m0 0h480v480h-480v-480z" fill="#bff009"/>
<g transform="translate(0 480) scale(.1 -.1)">
<path d="m910 3163c16-49 83-259 150-468s146-454 175-545 99-306 155-477l101-313h85c46 0 84 3 84 7 0 3-22 74-49 157s-88 270-135 416c-182 567-226 705-322 1002l-99 308h-87-87l29-87z"/>
<path d="m1160 3243c0-4 24-82 54-173s107-329 171-530 145-450 179-555c34-104 94-288 132-407l69-218h89c66 0 87 3 83 13s-110 336-277 852c-27 83-101 314-165 515s-127 397-139 435l-23 70-86 3c-48 1-87-1-87-5z"/>
<path d="m1433 3243c3-5 53-159 112-343 119-375 283-881 325-1010 16-47 61-185 100-307l71-223h634 634l106 328c58 180 128 395 155 477 27 83 103 321 170 530s134 419 150 468l29 87-635-2-635-3-43-130c-24-71-74-224-111-340-87-275-88-276-96-267-4 4-52 149-108 322-55 173-108 339-118 368l-17 52h-86-87l144-447c80-247 155-479 167-518l23-70-25-73c-13-40-25-72-27-70-6 7-92 268-200 608-64 201-131 410-149 465l-33 100-87 3c-87 3-88 3-81-20 4-13 68-212 143-443 74-231 157-487 183-570 26-82 68-212 92-287l45-137-21-70c-12-39-24-71-27-71-7 0-69 179-139 400-21 69-113 357-204 640s-168 525-172 538c-6 21-12 22-96 22-50 0-88-3-86-7z"/>
</g>
</svg>`;
  }
}
