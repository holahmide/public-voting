import casual from 'casual';
import slugify from 'slugify';
import Category from '../../models/Session/Category';
import Nominee from '../../models/Session/Nominee';
import {
  generateRandomNumber,
  generateRandomRegNo,
  generateArrayOfLength,
} from '../../utils';


const departments = [
  'Electrical and Information Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Agric & Biosystems Engineering',
]

const getCreateCategoryNomineePromise = (category: string) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        await Nominee.create({
          name: casual.name,
          regno: generateRandomRegNo(),
          level: generateRandomNumber(1, 5) * 100,
          department: departments[Math.floor(Math.random() * departments.length)],
          picture:
            'images/coe/nominees/6282d2ada44d9bddf04af9a4/6282d2ada44d9bddf04af9a4.jpg',
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
          slug: name,
        });
        // create nominees
        const nomineeCount = generateRandomNumber(5, 10);
        const createNominees = generateArrayOfLength(nomineeCount).map(
          (_: any) => getCreateCategoryNomineePromise(createdCategory._id)
        );

        // Creating category slug
        let unique = false;
        let count = 0;
        while (!unique) {
          const postfix = count ? `-${count}` : '';
          const slug = `${slugify(createdCategory.name, {
            lower: true,
          })}${postfix}`;
          // eslint-disable-next-line no-await-in-loop
          const findSlug = await Category.findOne({ slug });
          if (!findSlug) {
            unique = true;
            createdCategory.slug = slug;
          }
          count += 1;
        }

        await createdCategory.save();

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
