import Vote from '../../models/Session/Vote';

const getCreateVotePromise = (category: string, nominee: string, user: string) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        await Vote.create({
          category,
          nominee,
          user
        });
        resolve(null);
      } catch (err) {
        reject(err);
      }
    })();
  });

export default getCreateVotePromise;
