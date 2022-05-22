import casual from 'casual';
import Category from '../../models/Session/Category';
import Nominee from '../../models/Session/Nominee';
import { generateRandomNumber, generateRandomRegNo, generateArrayOfLength } from '../../utils';

const getCreateCategoryNomineePromise = (category: string) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        await Nominee.create({
          name: casual.name,
          regno: generateRandomRegNo(),
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

const getCreateCategoryPromise = (session: string, name: string) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const createdCategory = await Category.create({
          name,
          description: casual.description,
          session,
        });
        // create nominees
        const nomineeCount = generateRandomNumber(5, 10);
        const createNominees = generateArrayOfLength(nomineeCount).map(
          (_: any) => getCreateCategoryNomineePromise(createdCategory._id)
        );
        await Promise.all(createNominees).then(() => {
          // @ts-ignore
          // eslint-disable-next-line no-console
          console.log(
            `${nomineeCount} NOMINEE(S) CREATED FOR ${createdCategory.name}✨`
          );
        });
        resolve(null);
      } catch (err) {
        reject(err);
      }
    })();
  });

export default getCreateCategoryPromise;
