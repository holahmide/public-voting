import casual from 'casual';
import slugify from 'slugify';
import Session from '../../models/Session';
import {
    generateArrayOfLength,
    generateRandomNumber,
  } from '../../utils';
  import getCreateCategoryPromise from './Category';

const getCreateSessionPromise = () =>
  new Promise((resolve, reject) => {
    (async () => {
      const title = casual.company_name.split(' ')[0];
      const startDate = casual.date();
      const endDate = casual.date();
      const description = casual.description;
      try {
        const createdSession: any = await Session.create({
          title,
          startDate,
          endDate,
          description,
        });

        // Creating event slug
        let unique = false;
        let count = 0;
        while (!unique) {
          const postfix = count ? `-${count}` : '';
          const slug = `${slugify(createdSession.title, {
            lower: true,
          })}${postfix}`;
          // eslint-disable-next-line no-await-in-loop
          const findSlug = await Session.findOne({ slug });
          if (!findSlug) {
            unique = true;
            createdSession.slug = slug;
          }
          count += 1;
        }

        // create categories
        const categoriesCount = generateRandomNumber(1, 5);
        const createCategories = generateArrayOfLength(categoriesCount).map((_: any) =>
          getCreateCategoryPromise(createdSession._id)
        );
        await Promise.all(createCategories).then(() => {
          // @ts-ignore
          // eslint-disable-next-line no-console
          console.log(
            `${categoriesCount} CATEGOR(IES) CREATED FOR ${createdSession.title}✨`
          );
        });


        resolve(null);
      } catch (err) {
        reject(err);
      }
    })();
  });

export default getCreateSessionPromise;
