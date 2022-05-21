import casual from 'casual';
import Category from '../../models/Session/Category';

const getCreateCategoryPromise = (session: string) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        await Category.create({
          name: casual.name,
          description: casual.description,
          session,
        });
        resolve(null);
      } catch (err) {
        reject(err);
      }
    })();
  });

export default getCreateCategoryPromise;
