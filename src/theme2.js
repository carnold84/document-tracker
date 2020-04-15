const base = {
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.15)',
  color1: '#ffe864',
  color2: '#ffffff',
  color3: '#293238',
  color4: '#44525c',
  colorAlt1: '#ffffff',
  colorAlt2: '#848D91',
  fontFamilyPrimary: '"Ubuntu", sans-serif',
  fontFamilySecondary: '"Ubuntu", sans-serif',
  text1: '#333333',
  text2: '#848D91',
  textAlt1: '#333333',
  textAlt2: '#242a2f',
};

export default {
  ...base,
  actionButton: {
    bgColor: '#f3f3f3',
    fontFamily: base.fontFamilySecondary,
  },
  body: {
    bgColor: '#f3f3f3',
    fontFamily: base.fontFamilySecondary,
  },
  view: {
    header: {
      bgColor: base.color1,
      bgImage: 'url("./img/bg_pattern2.png")',
      boxShadow: base.boxShadow,
      color: base.text1,
      title: {
        color: base.textAlt1,
        fontFamily: base.fontFamilyPrimary,
      },
    },
  },
};