import casual from 'casual';
import Nominee from '../../models/Session/Nominee';
import { generateRandomNumber, generateRandomRegNo } from '../../utils';

const getCreateNomineePromise = (category: string) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        await Nominee.create({
          name: casual.name,
          regno : generateRandomRegNo(),
          level: generateRandomNumber(1, 5) * 100,
          picture: 'images/coe/nominees/6282d2ada44d9bddf04af9a4/6282d2ada44d9bddf04af9a4.jpg',
          blurPicture: 'images/coe/nominees/6282d2ada44d9bddf04af9a4/blur.jpg',
          category,
        });
        resolve(null);
      } catch (err) {
        reject(err);
      }
    })();
  });

export default getCreateNomineePromise;
