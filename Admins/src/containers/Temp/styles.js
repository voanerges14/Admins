export default {
  component: {
    width: '30%',
    display: 'inline-block',
    verticalAlign: 'top',
    padding: '20px',
    '@media (max-width: 640px)': {
      width: '100%',
      display: 'inline-block'
    }
  },
  component2: {
    width: '60%',
    float: 'right',
    display: 'inline-block',
    // verticalAlign: 'top',
    padding: '20px',
    // '@media (max-width: 640px)': {
    //   width: '100%',
    //   display: 'inline-block'
    // }
  },
  component3: {
    width: '100%',
    // float: 'right',
    display: 'inline-block',
    // verticalAlign: 'top',
    padding: '20px',
    // '@media (max-width: 640px)': {
    //   width: '100%',
    //   display: 'inline-block'
    // }
  },
  searchBox: {
    padding: '20px 20px 0 20px'
  },
  viewer: {
    base: {
      fontSize: '12px',
      whiteSpace: 'pre-wrap',
      backgroundColor: '#fcfcfc',
      border: 'solid 1px black',
      padding: '20px',
      color: '#000000',
      minHeight: '250px'
    }
  }
};
