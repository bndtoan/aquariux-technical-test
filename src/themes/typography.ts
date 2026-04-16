
export type StyleType = 'bold' | 'semibold' | 'regular' | 'italic';

export type SizeType = 'text6' | 'text14' | 'text16' | 'text18' | 'text20' | 'text22' | 'text24';

export const textStyle: Record<StyleType, string> = {
  bold: 'SourceSans3-Bold',
  semibold: 'SourceSans3-SemiBold',
  regular: 'SourceSans3-Regular',
  italic: 'SourceSans3-Italic',
};

export const textSize: Record<SizeType, number> = {
  'text6': 6,
  'text14': 14,
  'text16': 16,
  'text18': 18,
  'text20': 20,
  'text22': 22,
  'text24': 24,
};

export const textLineHeight: Record<SizeType, number> = {
  'text6': 8,
  'text14': 18,
  'text16': 20,
  'text18': 22,
  'text20': 24,
  'text22': 28,
  'text24': 30,
};
