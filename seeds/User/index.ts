import casual from 'casual';
import User from '../../models/User';
import { generateRandomRegNo } from '../../utils';

const getCreateUserPromise = () =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const user = await User.create({
          firstName: casual.first_name,
          lastName: casual.last_name,
          regno : generateRandomRegNo(),
          email: casual.email,
          password: casual.password,
        });
        resolve(user);
      } catch (err) {
        reject(err);
      }
    })();
  });

export default getCreateUserPromise;
