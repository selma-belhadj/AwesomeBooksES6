export const findHight = () => {
    if (window.innerHeight < document.body.scrollHeight) {
      document.querySelector('footer').style.position = 'relative';
    } else {
      document.querySelector('footer').style.position = 'fixed';
    }
  };

  export const returnSufixDate = (digit) => {
    const toArray = digit.toString().split('');
    const toCheck = parseInt(toArray[toArray.length - 1], 10);
    switch (true) {
      case toCheck === 1:
        return 'st';
      case toCheck === 2:
        return 'nd';
      case toCheck === 3:
        return 'rd';
      default:
        return 'th';
    }
  };
  
  export const formatDate = () => {
    const CurrentTime = new Date();
    const currentHour = CurrentTime.getHours();
    let newHour;
    const suffix = (currentHour >= 12 && currentHour !== 0) ? 'pm' : 'am';
    if (currentHour > 12) {
      newHour = currentHour - 12;
    } else if (currentHour === 0) {
      newHour = 12;
    } else {
      newHour = currentHour;
    }
    return `${newHour}:${CurrentTime.getMinutes()}:${CurrentTime.getSeconds()} ${suffix}`;
  };
  