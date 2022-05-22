const generateArrayOfLength: GenerateArrayOfLength = (num) =>
  Array(num).fill('_');

const generateRandomRegNo: GenerateRandomRegNo = () => {
  const number = Math.floor(1000000 + Math.random() * 8000000);
  return number;
};

const generateRandomNumber: GenerateRandomNumber = (from, to) => {
    const number = Math.floor(Math.random() * to);
    if (number < from) {
      return from;
    }
    return number;
  };

export default {
  generateRandomRegNo,
  generateRandomNumber,
  generateArrayOfLength
};
