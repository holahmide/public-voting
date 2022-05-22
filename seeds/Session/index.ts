import casual from 'casual';
import slugify from 'slugify';
import Session from '../../models/Session';
import {
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
          isActive: true,
          description,
          slug: title
        });

        // Creating session slug
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

        await createdSession.save();

        // create categories
        const categoriesCount = generateRandomNumber(8, 12);
        const createCategories = ["Most Fashionable", "Face of COE (Male)", "Face of COE (Female)", "Most Creative", "Most Inovative", "Sportman Woman (Woman)", "Sportman (Male)"].map((el) =>
          getCreateCategoryPromise(createdSession._id, el)
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
