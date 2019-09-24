import { Url } from '../services/url';

export class Image {
    id: number;
    name: string;
    url: Url;
    isBlur: boolean;
    isClosedEye: boolean;
    isDark: boolean;
    isCutFace: boolean;
    isGroom: boolean;
    isLight: boolean;
    isIndoors: boolean;
    isOutdoors: boolean;
    hasChildren: boolean;
    numPerson: number;
    isInRecycleBin: boolean;
}

