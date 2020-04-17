const base = {
  boxShadow: 'none',
  color1: '#ffffff',
  color2: '#f3f3f3',
  color3: '#e7e7e7',
  color4: '#dfdfdf',
  fontFamilyPrimary: '"Ubuntu", sans-serif',
  fontFamilySecondary: '"Ubuntu", sans-serif',
  primary1: '#9949E7',
  primary2: '#ecd448',
  text1: '#333333',
  text2: '#555555',
  text3: '#777777',
  textAlt1: '#ffffff',
};

export default {
  ...base,
  actionButton: {
    bgColor: base.primary1,
    border: `3px solid ${base.color2}`,
    boxShadow: 'none',
    color: base.textAlt1,
    fontFamily: base.fontFamilySecondary,
    _hover: {
      bgColor: base.primary2,
    },
  },
  backButton: {
    color: base.textAlt1,
    fontFamily: base.fontFamilySecondary,
    _hover: {
      bgColor: base.primary2,
    },
  },
  body: {
    bgColor: base.color2,
    fontFamily: base.fontFamilySecondary,
  },
  label: {
    color: base.text2,
    fontFamily: base.fontFamilySecondary,
  },
  listItem: {
    bgColor: base.color1,
    border: `1px solid ${base.color3}`,
    borderRadius: '0',
    boxShadow: 'none',
    btn: {
      bgColor: base.color3,
      border: '1px solid #f1f1f1',
      color: base.text3,
      _hover: {
        bgColor: base.color3,
      },
    },
    color: base.text1,
    title: {
      color: base.text1,
      fontFamily: base.fontFamilyPrimary,
    },
    subTitle: {
      color: base.text2,
      fontFamily: base.fontFamilyPrimary,
    },
  },
  radioGroup: {
    label: {
      color: base.text1,
      fontFamily: base.fontFamilyPrimary,
    },
    radioButton: {
      color: base.text2,
    },
  },
  tag: {
    bgColor: base.color3,
    color: base.text2,
  },
  textField: {
    bgColor: base.color1,
    border: `2px solid ${base.color3}`,
    color: base.text1,
    fontFamily: base.fontFamilySecondary,
    _focus: {
      boxShadow: `0 0 0 2px ${base.color3}`,
    },
    _hover: {
      border: `2px solid ${base.color4}`,
    },
  },
  view: {
    header: {
      bgColor: base.primary1,
      bgImage: 'url("./img/bg_pattern2.png")',
      boxShadow: base.boxShadow,
      color: base.text1,
      title: {
        color: base.text1,
        fontFamily: base.fontFamilyPrimary,
      },
    },
    logo: {
      fullImage: 'url("./img/logo_full.png")',
      image: 'url("./img/logo.png")',
    },
  },
};