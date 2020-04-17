const base = {
  boxShadow: 'none',
  color1: '#1a1e21',
  color2: '#242a2f',
  color3: '#293238',
  color4: '#44525c',
  fontFamilyPrimary: '"Lora", serif',
  fontFamilySecondary: '"Lato", sans-serif',
  primary1: '#e5e1De',
  primary2: '#848D91',
  text1: '#e5e1De',
  text2: '#848D91',
  text3: '#777777',
  textAlt1: '#1a1e21',
  textAlt2: '#242a2f',
};

export default {
  ...base,
  actionButton: {
    bgColor: base.color1,
    border: `3px solid ${base.primary1}`,
    boxShadow: 'none',
    color: base.text1,
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
    bgColor: base.color1,
    fontFamily: base.fontFamilySecondary,
  },
  label: {
    color: base.text2,
    fontFamily: base.fontFamilySecondary,
  },
  listItem: {
    bgColor: base.color2,
    border: `1px solid ${base.color2}`,
    borderRadius: '5px',
    boxShadow: 'none',
    btn: {
      bgColor: base.color3,
      border: `1px solid ${base.color3}`,
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
      fontFamily: base.fontFamilySecondary,
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
      bgImage: 'url("./img/bg_pattern.png")',
      boxShadow: base.boxShadow,
      color: base.text1,
      title: {
        color: base.text1,
        fontFamily: base.fontFamilyPrimary,
      },
    },
    logo: {
      fullImage: 'url("./img/logo_full_dark.png")',
      image: 'url("./img/logo_dark.png")',
    },
  },
};